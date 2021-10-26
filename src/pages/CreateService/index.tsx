import React, { useState, useContext } from 'react';
import {PageContext} from '../../contexts/PageContext';
import { api } from '../../services/api';
import styles from './CreateService.module.scss';

import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';

export default function CreateService(){
    //Contexto para mudar a renderização da página
    const {changePage} = useContext(PageContext);
    //Estados da aplicação, serão os dados utilizados na função addService
    const [title, setTitle] = useState('');
    const [orcamento, setOrcamento] = useState(0);
    const [descricao, setDescricao] = useState('');
    const dataCadastro = format(new Date(), 'dd/MM/y', {locale:ptBR});
    const [dataLimite, setDataLimite] = useState('');

    const situacao = 'aberto';

    //Função para utilizar o axios.post na api e adicionar um serviço
    function addService(){
        api.post('servicos/criar',{
            situacao: situacao,
            orcamento: orcamento,
            dataCadastro: dataCadastro,
            descricao: descricao,
            dataLimite: dataLimite,
            titulo: title
        })

        //Após a adição do serviço, a função changePage é chamada
        changePage();
    }

    return(
        <div className={styles.createContainer}>

            <form onSubmit={(e)=>{e.preventDefault()}} className={styles.formContainer}>

                <input type='text' onChange={(e) => setTitle(e.target.value)} placeholder='Nome' />
                <input type='number' onChange={(e) => setOrcamento(Number(e.target.value))} placeholder='Orcamento' />
                <input type='text' onChange={(e) => setDescricao(e.target.value)} placeholder='Descricao' />
                <input type='text' onChange={(e)=>setDataLimite(e.target.value)} placeholder='Data limite' value={dataLimite} /> 
            
            </form> 

            <button onClick={changePage} className={styles.back}>Voltar</button>
            <button onClick={addService} className={styles.create}>Criar</button>

        </div>
    )
}