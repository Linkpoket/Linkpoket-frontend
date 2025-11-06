import React, { useState } from 'react';

interface LinkLogoProps {
  title: string;
  size?: number;
  className?: string;
}

const LinkLogo: React.FC<LinkLogoProps> = ({
  title,
  size = 40,
  className = '',
}) => {
  const [hovered, setHovered] = useState(false);

  const swiftUIColorPalette = [
    '#FF3B30',
    '#FF9500',
    '#FFCC00',
    '#34C759',
    '#007AFF',
    '#5856D6',
    '#AF52DE',
    '#00C7BE',
    '#5AC8FA',
    '#FF2D92',
    '#32D74B',
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEAA7',
    '#DDA0DD',
    '#98D8C8',
  ];

  const getFirstLetter = (text: string): string => {
    if (!text || text.length === 0) return '?';
    const firstChar = text.trim().charAt(0).toUpperCase();
    return /[가-힣a-zA-Z0-9]/.test(firstChar) ? firstChar : '?';
  };

  const firstLetter = getFirstLetter(title);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl font-bold select-none ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: '#f8f8f8',
        fontSize: Math.floor(size * 0.45),
        lineHeight: 1,
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 글자 */}
      <span
        style={{
          fontWeight: 800,
          color: '#000000',
          transform: hovered ? 'scale(1.12)' : 'scale(1)',
          transition: 'transform 0.2s ease',
          zIndex: 1,
        }}
      >
        {firstLetter}
      </span>
    </div>
  );
};

export default LinkLogo;
