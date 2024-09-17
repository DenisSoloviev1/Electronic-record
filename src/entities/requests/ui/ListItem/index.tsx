import { RequestListItem } from './style';

interface ListItemProps {
  itemName: string;
  onClick: (val: string) => void;
}

export const ListItem = ({ itemName, onClick }: ListItemProps) => {
  const handleClick = () => onClick(itemName);

  return <RequestListItem onClick={handleClick}>{itemName}</RequestListItem>;
};
