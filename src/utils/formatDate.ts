/**
 * 날짜 문자열을 상대 시간 형식으로 변환 (예: "방금 전", "5분 전", "2일 전")
 * 백엔드 형식: "yyyy-MM-dd HH:mm"
 *
 * @param dateString - 포맷팅할 날짜 문자열 (예: "2024-01-15 14:30")
 * @returns 상대 시간 문자열 또는 날짜 문자열
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  try {
    // "yyyy-MM-dd HH:mm" 형식을 파싱 (예: "2024-01-15 14:30")
    const dateMatch = dateString.match(
      /^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})/
    );
    if (!dateMatch) {
      // 다른 형식이면 그대로 반환
      return dateString;
    }

    const [, year, month, day, hour, minute] = dateMatch;
    const date = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hour),
      parseInt(minute)
    );

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return '방금 전';
    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    if (diffDays < 7) return `${diffDays}일 전`;

    // 7일 이상이면 날짜 표시 (yyyy-MM-dd 형식)
    return `${year}-${month}-${day}`;
  } catch (error) {
    return dateString;
  }
};
