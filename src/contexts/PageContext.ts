import { createContext } from 'react';

type PlayerContextData = {
    page: boolean;
    changePage: () => void;
}
export const PageContext = createContext({} as PlayerContextData);