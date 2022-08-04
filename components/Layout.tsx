import React from 'react'
import styles from '../styles/Layout.module.css'

export interface Props {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({children}) => {
  return (
    <div className={styles.container}>
        <main className={styles.main}>{children}</main>
    </div>
  )
}

export default Layout