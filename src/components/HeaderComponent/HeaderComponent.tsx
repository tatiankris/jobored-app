import {Header, Menu, UnstyledButton} from "@mantine/core"
import React, {useState} from "react"
import {ReactComponent as Logo} from '../../assets/jobored-logo.svg'
import {Link, useLocation, useNavigate} from "react-router-dom"
import CommonContainer from "../CommonComponents/CommonContainer"
import style from './Header.module.css'
import {FAVORITES, JOB_SEARCH} from "../MainComponent/MainComponent"
import {useMediaQuery} from "@mantine/hooks"
import {IconMenu} from "@tabler/icons-react"
import {useAppDispatch} from "../../hooks/hooks"
import {resetAllSearchAC} from "../../store/reducers/search-reducer"

function HeaderComponent() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation().pathname
    const iSmallScreen = useMediaQuery('(max-width: 512px)')

    const [opened, setOpened] = useState(false)

    const inClickHandler = () => {
        navigate('/')
        dispatch(resetAllSearchAC())
    }

    return <Header height={84} p={0}>
        <CommonContainer page={'header'}>
            <div className={style.headerBlock}>
                <Logo className={style.logo} onClick={inClickHandler}/>
                {iSmallScreen
                    ? <Menu opened={opened} onChange={setOpened} shadow="md" width={200}>
                        <Menu.Target>
                            <UnstyledButton className={opened ? `${style.burgerIcon}` : ''}>
                                <IconMenu size={'2.5rem'}/>
                            </UnstyledButton>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item>
                                <Link
                                    className={location.includes(JOB_SEARCH) ? ` ${style.currentLink} ${style.link}` : style.link}
                                    to={JOB_SEARCH}>Поиск Вакансий
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link
                                    className={location === FAVORITES ? `${style.currentLink} ${style.link} ` : style.link}
                                    to={FAVORITES}>Избранное
                                </Link>
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                    : <div className={style.links}>
                        <Link
                            className={location.includes(JOB_SEARCH) ? ` ${style.currentLink} ${style.link}` : style.link}
                            to={JOB_SEARCH}>Поиск вакансий
                        </Link>
                        <Link className={location === FAVORITES ? `${style.currentLink} ${style.link} ` : style.link}
                              to={FAVORITES}>Избранное
                        </Link>
                    </div>}
            </div>
        </CommonContainer>
    </Header>
}

export default HeaderComponent