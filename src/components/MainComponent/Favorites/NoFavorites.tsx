import React from 'react'
import style from './NoFavorites.module.css'
import { ReactComponent as Logo } from '../../../assets/noFavoritesLogo.svg'
import {Button, Title} from "@mantine/core"
import {useNavigate} from "react-router-dom"
import {JOB_SEARCH} from "../MainComponent"

function NoFavorites() {

    const navigate = useNavigate()

    return (

            <div className={style.noFavorites}>

                    <Logo className={style.logo}/>
                    <Title className={style.title}>Упс, здесь еще ничего нет!</Title>
                    <Button onClick={()=>{navigate(JOB_SEARCH)}} variant="light" className={style.button}>Поиск Вакансий</Button>

            </div>

    )
}

export default NoFavorites