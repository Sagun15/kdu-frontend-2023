export interface ISearch {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export interface IItems {
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface ItemProps {
  item: string;
}
