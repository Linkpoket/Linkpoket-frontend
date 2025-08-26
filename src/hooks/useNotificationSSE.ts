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
      console.log('🧹 SSE 연결 종료');
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
    console.log(
      '🔍 SSE useEffect 실행 - isLoggedIn:',
      isLoggedIn,
      'sseToken:',
      sseToken
    );

    let timeoutId: ReturnType<typeof setTimeout>;

    const connectSSE = async () => {
      console.log('🔍 connectSSE 함수 실행');
      console.log('🔍 현재 연결 상태:', eventSourceRef.current?.readyState);
      console.log('🔍 연결 중 상태:', isConnectingRef.current);

      // 이미 연결되어 있고 정상 상태라면 새 연결하지 않음
      if (eventSourceRef.current?.readyState === EventSource.OPEN) {
        console.log('🔗 이미 SSE 연결되어 있음, 새 연결 생략');
        return;
      }

      // 이미 연결 시도 중이라면 중복 실행 방지
      if (isConnectingRef.current) {
        console.log('🔗 이미 SSE 연결 시도 중, 중복 실행 방지');
        return;
      }

      if (!isLoggedIn || !sseToken) {
        console.log(
          '🔍 연결 조건 미충족 - isLoggedIn:',
          isLoggedIn,
          'sseToken:',
          sseToken
        );
        return;
      }

      isConnectingRef.current = true;
      console.log('🔍 새로운 SSE 연결 시도');

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
        console.log('✅ SSE 연결 성공');
        isConnectingRef.current = false;
        if (isDevelopment) console.log('✅ SSE 연결 성공 상세:', event);
      };

      eventSource.onmessage = (event) => {
        console.log('🔔 SSE 메시지 받음!', event.data);

        try {
          const data = JSON.parse(event.data);
          console.log('🔔 SSE 파싱된 데이터:', data);
          setUnreadCount(data.countUnreadNotifications);
        } catch (e) {
          console.error('🔍 알림 데이터 파싱 실패:', e, event.data);
        }
      };

      eventSource.onerror = (event) => {
        console.error('❌ SSE 연결 오류 발생:', event);
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
            console.log('🔄 SSE 재연결 시도');
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
      console.log('🔍 useEffect cleanup 실행');
      clearTimeout(timeoutId);
      // cleanup 시에도 약간의 지연을 두어 연결이 완료될 시간 확보
      setTimeout(() => {
        closeConnection();
      }, 100);
    };
  }, [isLoggedIn, sseToken, API_BASE_URL]);

  useEffect(() => {
    if (isLoggedIn && !sseToken) {
      console.log('🔍 로그인됨, 토큰 재확인 예약');

      let attempts = 0;
      const maxAttempts = 10;

      const checkToken = () => {
        const token = localStorage.getItem('sse_token');
        console.log('🔍 토큰 확인 시도', attempts + 1, ':', token);

        if (token) {
          console.log('🔍 로그인 후 토큰 발견:', token);
          setSseToken(token);
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(checkToken, 200);
        } else {
          console.log('🔍 토큰 대기 시간 초과');
        }
      };

      checkToken();
    }
  }, [isLoggedIn, sseToken]);

  // 외부에서 토큰 업데이트 호출 시 사용
  const updateToken = () => {
    const newToken = localStorage.getItem('sse_token');
    console.log('🔍 토큰 업데이트:', newToken);
    if (newToken !== sseToken) {
      setSseToken(newToken);
    }
  };

  // 연결 강제 재시작
  const reconnect = () => {
    console.log('🔍 강제 재연결 요청');
    if (isConnectingRef.current) {
      console.log('🔍 이미 연결 시도 중이므로 재연결 요청 무시');
      return;
    }

    closeConnection();
    setTimeout(() => {
      const currentToken = localStorage.getItem('sse_token');
      console.log('🔍 재연결용 토큰 가져오기:', currentToken);
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
