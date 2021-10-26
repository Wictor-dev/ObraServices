import { createContext } from 'react';

type filterProps = {
    filter: string;
    handleFilter: (value:string) => void;
    search: (value:string) => void;
    filterExtract: string;
}
export const FilterContext = createContext({} as filterProps);