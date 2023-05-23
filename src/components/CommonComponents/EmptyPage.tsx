import React from 'react'
import style from './EmptyPage.module.css'
import {ReactComponent as Logo} from '../../assets/emptyLogo.svg'
import {Button, Title} from "@mantine/core"
import {useNavigate} from "react-router-dom"
import {JOB_SEARCH} from "../MainComponent/MainComponent"
import {useAppDispatch} from "../../hooks/hooks"
import {resetAllSearchAC} from "../../store/reducers/search-reducer"

type EmptyPagePropsType = {
    page: 'search' | 'favorites'
}

function EmptyPage({page, ...props}: EmptyPagePropsType) {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const navigateHandler = () => {
        dispatch(resetAllSearchAC())
        navigate(JOB_SEARCH)
    }

    return (
        <div className={style.noFavorites}>
            <Logo className={style.logo}/>
            <Title className={style.title}>Упс, здесь еще ничего нет!</Title>
            {page === 'favorites' &&
                <Button onClick={navigateHandler} variant="light" className={style.button}>
                    Поиск Вакансий
                </Button>}
        </div>
    )
}

export default EmptyPage