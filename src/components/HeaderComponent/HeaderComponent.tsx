import {Header, Menu, UnstyledButton} from "@mantine/core"
import React, {useState} from "react"
import { ReactComponent as Logo } from '../../assets/jobored-logo.svg'
import {Link, useLocation, useNavigate} from "react-router-dom"
import CommonContainer from "../CommonComponents/CommonContainer"
import styles from './Header.module.css'
import {FAVORITES, JOB_SEARCH} from "../MainComponent/MainComponent"
import {useMediaQuery} from "@mantine/hooks"
import { IconMenu } from "@tabler/icons-react"
import {useAppDispatch} from "../../hooks/hooks";
import {deleteToken} from "../../store/reducers/auth-reducer";

function HeaderComponent() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation().pathname
    const iSmallScreen = useMediaQuery('(max-width: 512px)')

    const [opened, setOpened] = useState(false)

    const inClickHandler = () => {
        navigate('/')
    }

    return <Header height={84} p={0} >
        <CommonContainer page={'header'}>
            <div className={styles.headerBlock}>
                <Logo className={styles.logo} onClick={inClickHandler}/>
                <button onClick={() => {dispatch(deleteToken())}}>delete</button>
                   {iSmallScreen
                       ? <Menu opened={opened} onChange={setOpened} shadow="md" width={200}>
                           <Menu.Target>
                               <UnstyledButton className={opened ? `${styles.burgerIcon}` : ''}><IconMenu size={'2.5rem'} /></UnstyledButton>
                           </Menu.Target>
                           <Menu.Dropdown>
                               <Menu.Item >
                       <Link
                           className={location.includes(JOB_SEARCH) ? ` ${styles.currentLink} ${styles.link}` : styles.link}
                           to={JOB_SEARCH}>Поиск Вакансий
                       </Link></Menu.Item>
                               <Menu.Item>
                       <Link className={location === FAVORITES ? `${styles.currentLink} ${styles.link} ` : styles.link}
                       to={FAVORITES}>Избранное
                       </Link></Menu.Item>
                           </Menu.Dropdown>
                       </Menu>
                       : <div className={styles.links}>
                           <Link
                           className={location.includes(JOB_SEARCH) ? ` ${styles.currentLink} ${styles.link}` : styles.link}
                           to={JOB_SEARCH}>Поиск вакансий
                       </Link>
                       <Link className={location === FAVORITES ? `${styles.currentLink} ${styles.link} ` : styles.link}
                       to={FAVORITES}>Избранное
                       </Link>
                       </div>}
            </div>
        </CommonContainer>
    </Header>
}

export default HeaderComponent