import {Container, Header} from '@mantine/core'
import React, {useEffect} from 'react'
import './App.css'
import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import MainComponent from './components/MainComponent/MainComponent'
import { useStyles } from './styles/commonStyles'
import CommonContainer from "./components/CommonComponents/CommonContainer"
import PageContainer from "./components/CommonComponents/PageContainer"
import {authTC} from "./store/reducers/auth-reducer"
import {useDispatch} from "react-redux"
import { useAppDispatch } from './hooks/hooks'


function App() {

    const {classes} = useStyles()

    const dispatch = useAppDispatch()
    useEffect(() => {
        // dispatch(authTC())
    }, [])

    return (

        <div className={classes.app}>
            <HeaderComponent/>
            <PageContainer>

                    <MainComponent/>

            </PageContainer>
        </div>
    )
}

export default App
