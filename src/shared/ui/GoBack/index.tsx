import { IconChevronLeft } from '@tabler/icons-react';

import { useNavigate } from 'react-router-dom';

import { isMobile } from '@/shared/lib';

import { GoBack } from './style';

export const GoBackBtn = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate(-1);

  return (
    <GoBack onClick={handleClick}>
      <IconChevronLeft
        width={isMobile ? 22 : 45}
        height={isMobile ? 22 : 45}
        color="#11519C"
      />
    </GoBack>
  );
};
