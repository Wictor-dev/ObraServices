import React, {useEffect, useState} from 'react';
import './App.css';
import Services from './components/Services'
import { api } from './services/api'
import { PageContext } from './contexts/PageContext'
import CreateService from './pages/CreateService';
import Header from './components/Header';
import Filter from './components/Filter';
import { FilterContext } from './contexts/FilterContext';


function App() {
  const [page, setPage] = useState(true);
  const [servicos, setServicos] = useState<any>();
  const [filter, setFilter] = useState('');
  const [filterExtract, setFilterExtract] = useState('');

  const handleFilter = (value:string) => {
    setFilter(value)
  }

  const search = (value : string) => {
    setFilterExtract(value)
  }

  function changePage(){
    setPage(!page)
  }

  useEffect(()=>{
    api.get("servicos").then(res => setServicos(res.data));
  }, [page])

  return (
    <PageContext.Provider value={{page, changePage}}>
      <div className="App">
        <Header />
        <FilterContext.Provider value={{filter,handleFilter,search,filterExtract}}>

        {
          (page === true) ? (
            <>
            <Filter />
            <Services services={servicos}/>
            </>
            ) : (
              <CreateService />
              )
            }
        </FilterContext.Provider>
      </div>

    </PageContext.Provider>
  );
}

export default App;
