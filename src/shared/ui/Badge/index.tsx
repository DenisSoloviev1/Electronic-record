import { FC, ReactNode } from 'react';
import { Chip, ChipText } from './style';

type IconDirection = 'rtl' | 'ltr';

interface BadgeProps {
  label: string;
  icon?: ReactNode;
  direction?: IconDirection;
  onClick?: () => void;
  isAuth?: boolean;
  disabled?: boolean;
}

export const Badge: FC<BadgeProps> = ({
  label,
  icon,
  direction,
  isAuth = false,
  disabled = false,
  onClick = () => {},
}) => {
  return (
    <Chip
      $disabled={disabled}
      $primary={isAuth}
      color="primary"
      onClick={onClick}
    >
      {icon && direction === 'ltr' && icon}
      <ChipText $primary={isAuth}>{label}</ChipText>
      {icon && direction === 'rtl' && icon}
    </Chip>
  );
};
