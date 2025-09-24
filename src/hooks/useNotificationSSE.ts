import { useEffect, useState, useRef } from 'react';
import { useNotificationStore } from '@/stores/notification';

export function useNotificationSSE(isLoggedIn: boolean) {
  const [sseToken, setSseToken] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sse_token');
    }
    return null;
  });

  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const isConnectingRef = useRef(false); // 연결 중인지 확인하는 플래그
  const setUnreadCount = useNotificationStore((s) => s.setUnreadCount);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const SSE_CONFIG = {
    HEALTH_CHECK_TIMEOUT: 3000,
    RECONNECT_DELAY: 5000,
    TOKEN_UPDATE_DELAY: 100,
    CONNECTION_TIMEOUT: 500, // 연결 시도 후 대기 시간
  } as const;

  // SSE 연결 해제 함수
  const closeConnection = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    isConnectingRef.current = false;
  };

  // 다른 탭에서 localStorage 변경 시 자동 감지
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'sse_token') {
        setSseToken(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // SSE 연결 관리
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const connectSSE = async () => {
      // 이미 연결되어 있고 정상 상태라면 새 연결하지 않음
      if (eventSourceRef.current?.readyState === EventSource.OPEN) {
        return;
      }

      // 이미 연결 시도 중이라면 중복 실행 방지
      if (isConnectingRef.current) {
        return;
      }

      if (!isLoggedIn || !sseToken) {
        return;
      }

      isConnectingRef.current = true;

      // 기존 연결이 있다면 정리 (연결 플래그 설정 후)
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }

      const eventSource = new EventSource(
        `${API_BASE_URL}/api/notification/subscribe?token=${encodeURIComponent(sseToken)}`,
        {
          withCredentials: true,
        }
      );

      eventSourceRef.current = eventSource;
      const isDevelopment = import.meta.env.DEV;

      eventSource.onopen = (event) => {
        isConnectingRef.current = false;
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setUnreadCount(data.countUnreadNotifications);
        } catch (e) {}
      };

      eventSource.onerror = (event) => {
        isConnectingRef.current = false;

        // 즉시 정리하지 않고 약간의 지연 후 정리
        setTimeout(() => {
          if (eventSourceRef.current === eventSource) {
            closeConnection();
          }
        }, 100);

        // 로그인 상태이고 토큰이 있을 때만 재연결 시도
        if (isLoggedIn && sseToken) {
          reconnectTimeoutRef.current = setTimeout(() => {
            connectSSE();
          }, SSE_CONFIG.RECONNECT_DELAY);
        }
      };
    };

    // 연결 시도를 약간 지연시켜 cleanup과 충돌 방지
    timeoutId = setTimeout(() => {
      connectSSE();
    }, SSE_CONFIG.CONNECTION_TIMEOUT);

    // cleanup 함수
    return () => {
      clearTimeout(timeoutId);
      // cleanup 시에도 약간의 지연을 두어 연결이 완료될 시간 확보
      setTimeout(() => {
        closeConnection();
      }, 100);
    };
  }, [isLoggedIn, sseToken, API_BASE_URL]);

  useEffect(() => {
    if (isLoggedIn && !sseToken) {
      let attempts = 0;
      const maxAttempts = 10;

      const checkToken = () => {
        const token = localStorage.getItem('sse_token');

        if (token) {
          setSseToken(token);
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(checkToken, 200);
        } else {
        }
      };

      checkToken();
    }
  }, [isLoggedIn, sseToken]);

  // 외부에서 토큰 업데이트 호출 시 사용
  const updateToken = () => {
    const newToken = localStorage.getItem('sse_token');
    if (newToken !== sseToken) {
      setSseToken(newToken);
    }
  };

  // 연결 강제 재시작
  const reconnect = () => {
    if (isConnectingRef.current) {
      return;
    }

    closeConnection();
    setTimeout(() => {
      const currentToken = localStorage.getItem('sse_token');
      setSseToken(currentToken);
    }, SSE_CONFIG.TOKEN_UPDATE_DELAY);
  };

  return {
    updateToken,
    reconnect,
    isConnected: !!(
      isLoggedIn &&
      sseToken &&
      eventSourceRef.current?.readyState === EventSource.OPEN
    ),
  };
}
