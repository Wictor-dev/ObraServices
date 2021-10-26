import React, { useContext } from 'react'

import styles from './Services.module.scss'
import { Link } from 'react-router-dom'
import { PageContext } from '../../contexts/PageContext'
import { FilterContext } from '../../contexts/FilterContext'

type Service = {
    id: string;
    titulo: string;
    comentario: string;
    dataLimite: string;
    orcamento: number;
    situacao: string;
    descricao: string;
    dataCadastro: string;
}
type ServicesProps = {
    services: Service[];
}

export default function Scripts({ services }:ServicesProps){
    const {changePage} = useContext(PageContext);
    const {filterExtract, filter} = useContext(FilterContext);
    console.log((filter == '') ? 'tá vazio' : filterExtract)
    const servicos =  (filterExtract != '') ? services?.filter(servico => 
        servico.titulo.includes(filterExtract) ||
        servico.situacao.includes(filterExtract) ||
        servico.orcamento == Number(filterExtract) ||
        servico.descricao.includes(filterExtract) ||
        servico.dataLimite.includes(filterExtract) ||
        servico.dataCadastro.includes(filterExtract) 
        )
    .map((servico:Service) => {
        const {id, titulo, descricao, orcamento, dataCadastro, dataLimite, situacao} = servico;
        
        return(
            <div className={styles.dataService}>
                <div className={styles.item}>
                    <p>{titulo}</p>
                </div>
                <div className={styles.item}>
                    <p>{descricao}</p>       
                </div>
                <div className={styles.item}>
                    <p>R$ {orcamento}</p>                        
                </div>
                <div className={styles.item}>
                    <p>{dataCadastro}</p>                   
                </div>
                <div className={styles.item}>
                    <p>{dataLimite}</p>   
                </div>
                <div className={styles.item}>
                    <p className={ (situacao === 'aberto') ? styles.open : styles.closed}>{situacao}</p>                     
                </div>
                <div className={styles.item}>
                    <a><Link to={`/servicos/${id}`} style={{textDecoration:'none', backgroundColor:'#EEE9E9'}}>Ver...</Link></a>                      
                </div>
            </div>  
        )
    }): services?.map((servico:Service) => {
            const {id, titulo, descricao, orcamento, dataCadastro, dataLimite, situacao} = servico;
            return(
                // <tr>
                //     <td>{titulo}</td>
                //     <td>{descricao}</td>
                //     <td>R$ {orcamento}</td>
                //     <td>{dataCadastro}</td>
                //     <td>{dataLimite}</td>
                //     <td><p className={ (situacao === 'aberto') ? styles.open : styles.closed}>{situacao}</p></td>
                //     <td><Link to={`/servicos/${id}`} style={{textDecoration:'none', backgroundColor:'#EEE9E9'}}>Ver...</Link></td>
                // </tr>
                <div className={styles.dataService}>
                    <Link className={styles.item}  to={`/servicos/${id}`} style={{textDecoration:'none', color: '#000'}}>

                    <div >
                        <p>{titulo}</p>
                    </div>
                    </Link>
                    <div className={styles.item}>
                        <p>{descricao}</p>       
                    </div>
                    <div className={styles.item}>
                        <p>R$ {orcamento}</p>                        
                    </div>
                    <div className={styles.item}>
                        <p>{dataCadastro}</p>                   
                    </div>
                    <div className={styles.item}>
                        <p>{dataLimite}</p>   
                    </div>
                    <div className={styles.item}>
                        <p className={ (situacao === 'aberto') ? styles.open : styles.closed}>{situacao}</p>                     
                    </div>
                {/* <div className={styles.item}>
                    <a><Link to={`/servicos/${id}`} style={{textDecoration:'none', backgroundColor:'#EEE9E9'}}>Ver...</Link></a>                      
                </div> */}
            </div>   
                
            )
        }) 
        
    return (
        <div className={styles.servicesContainer}>
            <div className={styles.tableContainer} >
                {/* <tr>
                    <th>Título</th>
                    <th>Descrição</th>
                    <th>Orçamento</th>
                    <th>Data Cadastro</th>
                    <th>Data Limite</th>
                    <th>Status</th>
                    <th></th>
                </tr> */}
                <div className={styles.infoService}>
                    <p>Título</p>
                    <p>Descrição</p>
                    <p>Orçamento</p>
                    <p>Data Cadastro</p>
                    <p>Data Limite</p>
                    <p>Status</p>
                    
                </div>
               
            {servicos}
                
            </div>
            <button onClick={changePage} className={styles.buttonAdd}>Criar</button>
        </div>
    )
}