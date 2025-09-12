import React from 'react';
import ColorUp from '@/assets/common-ui-assets/ColorUp.svg?react';
import ColorDown from '@/assets/common-ui-assets/ColorDown.svg?react';
import NoColorUp from '@/assets/common-ui-assets/NoColorUp.svg?react';
import NoColorDown from '@/assets/common-ui-assets/NoColorDown.svg?react';

interface FolderToggleIconProps {
  isCollapsed: boolean;
  folderId: string;
  isFolderActive: (folderId: string) => boolean;
}

export const FolderToggleIcon: React.FC<FolderToggleIconProps> = ({
  isCollapsed,
  folderId,
  isFolderActive,
}) => {
  const isActive = isFolderActive(folderId);

  if (isActive) {
    return isCollapsed ? (
      <ColorDown width={16} height={16} />
    ) : (
      <ColorUp width={16} height={16} />
    );
  } else {
    return isCollapsed ? (
      <NoColorDown width={16} height={16} />
    ) : (
      <NoColorUp width={16} height={16} />
    );
  }
};
