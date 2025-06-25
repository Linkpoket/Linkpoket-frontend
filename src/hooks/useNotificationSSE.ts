import { useEffect, useState } from 'react';
import { useNotificationStore } from '@/stores/notification';

export function useNotificationSSE(isLoggedIn: boolean) {
  const [sseToken, setSseToken] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sse_token');
    }
    return null;
  });

  const setUnreadCount = useNotificationStore((s) => s.setUnreadCount);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // 👉 SSE 토큰 유효성 검사 함수
  async function checkSseTokenValid(token: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/notification/subscribe?token=${encodeURIComponent(token)}`,
        {
          method: 'GET',
          headers: {
            Accept: 'text/event-stream',
          },
          credentials: 'include',
        }
      );
      if (response.status === 200) return true;
      if (response.status === 401) {
        console.log('SSE토큰 만료됨 (401응답)');
        return false;
      }

      console.log(`예상치 못한 응답 상태: ${response.status}`);
      return false;
    } catch (err) {
      console.error('🔍 SSE 토큰 유효성 확인 실패:', err);
      return false;
    }
  }

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
    const connectSSE = async () => {
      if (!isLoggedIn || !sseToken) return;

      // 👉 SSE 토큰 유효한지 확인
      const isValid = await checkSseTokenValid(sseToken);
      if (!isValid) {
        console.warn('❌ SSE 토큰이 유효하지 않음');
        return;
      }

      const eventSource = new EventSource(
        `${API_BASE_URL}/api/notification/subscribe?token=${encodeURIComponent(
          sseToken
        )}`,
        {
          withCredentials: true,
        }
      );

      const isDevelopment = import.meta.env.DEV;

      eventSource.onopen = (event) => {
        if (isDevelopment) console.log('✅ SSE 연결 성공', event);
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (isDevelopment) console.log('🔔 알림 수신:', data);
          setUnreadCount(data.countUnreadNotifications);
        } catch (e) {
          console.error('🔍 알림 데이터 파싱 실패:', e, event.data);
        }
      };

      const SSE_CONFIG = {
        HEALTH_CHECK_TIMEOUT: 3000,
        RECONNECT_DELAY: 5000,
        TOKEN_UPDATE_DELAY: 100,
      } as const;

      eventSource.onerror = async (event) => {
        console.error('❌ SSE 연결 오류 발생:', event);
        eventSource.close();

        // 간단한 재연결 로직
        setTimeout(() => {
          console.log('🔄 SSE 재연결 시도');
          updateToken();
        }, SSE_CONFIG.RECONNECT_DELAY);
      };

      return () => {
        console.log('🧹 SSE 연결 종료');
        eventSource.close();
      };
    };

    connectSSE();
  }, [isLoggedIn, sseToken, setUnreadCount]);

  // 외부에서 토큰 업데이트 호출 시 사용
  const updateToken = () => {
    const newToken = localStorage.getItem('sse_token');
    setSseToken(newToken);
  };

  // 연결 강제 재시작
  const reconnect = () => {
    setSseToken(null);
    setTimeout(() => {
      setSseToken(localStorage.getItem('sse_token'));
    }, 100);
  };

  return {
    updateToken,
    reconnect,
    isConnected: !!(isLoggedIn && sseToken),
  };
}
