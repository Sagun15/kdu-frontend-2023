import { createContext } from "react";
import { ISearch, IItems } from "../interfaces/Interface";

export const SearchContext = createContext<ISearch>({
  search: "",
  setSearch: () => {},
});

export const ItemContext = createContext<IItems>({
  items: [],
  setItems: () => {},
});
