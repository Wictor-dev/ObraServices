import React from 'react';

import styles from './Header.module.scss';

export default function Header(){
    return (
        <div className={styles.headerContainer}>
            <h1 className={styles.logo}>ObrasServices</h1>
            <h1 className={styles.profissional}>Usuário</h1>
        </div>
    )
}