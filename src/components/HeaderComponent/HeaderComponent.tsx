import {Header} from "@mantine/core"
import React from "react"
import { ReactComponent as Logo } from '../../assets/jobored-logo.svg'
import {Link, useLocation, useNavigate} from "react-router-dom"
import CommonContainer from "../CommonComponents/CommonContainer"
import styles from './Header.module.css'
import {FAVORITES, JOB_SEARCH} from "../MainComponent/MainComponent"



function HeaderComponent() {

    const navigate = useNavigate()
    const inClickHandler = () => {
        navigate('/')
    }

    const location = useLocation().pathname


    return <Header height={84} p={0} >
        <CommonContainer page={'header'}>
            <div className={styles.headerBlock}>
                <Logo className={styles.logo} onClick={inClickHandler}/>
               <div className={styles.links}>
                       <Link className={location.includes(JOB_SEARCH) ? ` ${styles.currentLink} ${styles.link}` : styles.link}
                             to={JOB_SEARCH}>Поиск вакансий
                       </Link>
                       <Link className={location === FAVORITES ? `${styles.currentLink} ${styles.link} ` : styles.link}
                             to={FAVORITES}>Избранное
                       </Link>
               </div>


            </div>
        </CommonContainer>
    </Header>
}

export default HeaderComponent