import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';
import styles from './Service.module.scss';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

type Service = {
    id: string;
    titulo: string;
    comentario: string;
    dataLimite: string;
    orcamento: number;
    situacao: string;
    descricao: string;
    dataCadastro: string;
    comentarios: string[];
}


export default function Service(props:any){
    const id = props.match.params.id;
    const [servico, setServico] = useState<Service>();

    const [titulo, setTitulo] = useState('');
    const [orcamento, setOrcamento] = useState(0);
    const [descricao, setDescricao] = useState('');
    const [comentario, setComentario] = useState('');
    const [comment, setComment] = useState('');
    // const dataCadastro = format(new Date(), 'dd/MM/y', {locale:ptBR});
    const [dataLimite, setDataLimite] = useState('');

    const situacao = 'Aberto';

    useEffect(()=>{
        async function fetchMyApi(){
           const {data} = await api.get(`servicos/${id}`);

           setServico(data);
           setTitulo(data.titulo);
           setOrcamento(data.orcamento);
           setDescricao(data.descricao);
           setDataLimite(data.dataLimite);
        }

        fetchMyApi();
    },[])

    function removeService(){
        api.delete(`servicos/deletar/${id}`);
    }

    function alterService(){
        const article = { 
            titulo: titulo,
            orcamento: orcamento,
            descricao: descricao,
            dataLimite: dataLimite
        }
        api.put(`servicos/alterar/${id}`, article);
    }

    async function comentar(){
        const article = {mensagem: comment};
       await api.post(`servicos/comentar/${id}`, article).then(res => console.log(res.data));
       setComment('');
    }

    const comentariosRender = servico?.comentarios.map((comentario:any) => {
        return (
            <p className={styles.mensagem}>{comentario.mensagem}</p>
        )
    })

    function concluir(){
        const article = {situacao:'concluído'}
        api.put(`servicos/marcar/${id}`, article);
    }

    function cancelar(){
        const article = {situacao:'cancelado'}
        api.put(`servicos/marcar/${id}`, article);
    }
    return (
        <div className={styles.serviceContainer}>
            <form className={styles.formContainer} >
                <div className={styles.inputs}>
                    <div className={styles.areaInputs}>
                        <label>Nome</label>
                        <input type='text' value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                    </div>
                    <div className={styles.areaInputs}>
                        <label>Orçamento</label>
                        <input type='number' value={orcamento} onChange={(e) => setOrcamento(Number(e.target.value))} />
                    </div>
                    <div className={styles.areaInputs}>
                        <label>Descrição</label>
                        <input type='text' value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                    </div>
                    <div className={styles.areaInputs}>
                        <label htmlFor="dataLimite">Data Limite</label>
                        <input type="text" value={dataLimite} onChange={(e)=>setDataLimite(e.target.value)} />
                    </div>
                </div>
                <div className={styles.buttonsForm}>
                    <button onClick={removeService} className={styles.button}><Link to={'/'} className={styles.link}>Excluir</Link></button>
                    <button onClick={alterService} className={styles.button}><Link to={'/'} className={styles.link}>Editar</Link></button>
                    <button onClick={concluir} className={styles.button}><Link to={'/'} className={styles.link}>Concluir</Link></button>
                    <button onClick={cancelar} className={styles.button}><Link to={'/'} className={styles.link}>Cancelar</Link></button>

                </div>
                <div className={styles.commentsForm}>
                    <h1>Comentários</h1>
                    <div>
                        <textarea rows={10} cols={130} value={comment} onChange={(e) => setComment(e.target.value)} />
                        <button onClick={comentar}>Comentar</button>
                    </div>
                    <div className={styles.comments}>
                        {comentariosRender}
                    </div>
                </div>
                <button className={styles.button}><Link to={'/'} className={styles.link} >Voltar</Link></button>
            </form>
        </div>


    )
}