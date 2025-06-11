import { useEffect } from 'react';
import { useNotificationStore } from '@/stores/notification';

export function useNotificationSSE(isLoggedIn: boolean) {
  const setUnreadCount = useNotificationStore((s) => s.setUnreadCount);

  useEffect(() => {
    if (!isLoggedIn) return;

    const sseToken = localStorage.getItem('sse_token');
    if (!sseToken) return;

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const eventSource = new EventSource(
      `${API_BASE_URL}/api/notification/subscribe?token=${sseToken}`,
      {
        withCredentials: true,
      }
    );

    eventSource.onopen = (event) => {
      console.log('✅ SSE 연결 성공', event);
    };

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('🔔 알림 수신:', data);
      setUnreadCount(data.countUnreadNotifications);
    };

    eventSource.onerror = async (event) => {
      console.error('❌ SSE 연결 오류 발생:', event);
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/notification/subscribe?token=${sseToken}`
        );
        const text = await res.text();
        console.log('🔍 직접 fetch한 응답 상태:', res.status);
        console.log('🔍 응답 본문:', text);
      } catch (err) {
        console.error('🔍 fetch 자체 에러:', err);
      }
    };

    return () => {
      console.log('🧹 SSE 연결 종료');
      eventSource.close();
    };
  }, [isLoggedIn]);
}
