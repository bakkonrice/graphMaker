import React from 'react'
import styles from '../styles/Home.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '../components/store'

const more = () => {
  return (
    <div className={styles.main}>
      <h2>
        Check out some other apps made by Cash Grab Studios
      </h2>
    </div>
  )
}

export default more