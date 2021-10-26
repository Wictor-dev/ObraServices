import React, { useContext } from 'react';
import { FilterContext } from '../../contexts/FilterContext';

import styles from './Filter.module.scss';

export default function Filter(){
    const {filter, handleFilter, search} = useContext(FilterContext);

    return (
        <div className={styles.filterContainer}>
            <form className={styles.formFilter} onSubmit={(e)=>e.preventDefault()}>
                <input 
                    type='text' 
                    value={filter} 
                    onChange={(e) => handleFilter(e.target.value)}
                    placeholder='Pesquise pelo serviço que você quer' 
                    className={styles.input} 
                />
                <button onClick={()=>search(filter)} className={styles.button} >Pesquisar</button>
            </form>
        </div>
    )
}