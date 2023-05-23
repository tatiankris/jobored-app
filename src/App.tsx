import {Box, Container, Header, Loader, LoadingOverlay, Modal} from '@mantine/core'
import React, {useEffect} from 'react'
import './App.css'
import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import MainComponent from './components/MainComponent/MainComponent'
import { useStyles } from './styles/commonStyles'
import CommonContainer from "./components/CommonComponents/CommonContainer"
import PageContainer from "./components/CommonComponents/PageContainer"
import {authTC, deleteToken, initializeTC} from "./store/reducers/auth-reducer"
import {useDispatch} from "react-redux"
import {useAppDispatch, useAppSelector} from './hooks/hooks'
import {getFavoritesTC, getIdsFavoritesTC} from "./store/reducers/favorites-reducer"
import {AppRootStateType} from "./store/store"


function App() {

    const {classes} = useStyles()
    const appStatus = useAppSelector((state: AppRootStateType) => state.appReducer.status)
    const appErr = useAppSelector((state: AppRootStateType) => state.appReducer.errors)
    const isInitialized = useAppSelector((state: AppRootStateType) => state.appReducer.isInitialized)

    console.log('isInitialized', isInitialized)


    const dispatch = useAppDispatch()
    useEffect(() => {
        !isInitialized && dispatch(initializeTC())
        dispatch(getIdsFavoritesTC())
    }, [isInitialized])

    return (

        <div className={classes.app}>
            {appStatus === 'loading' && <LoadingOverlay visible={true} overlayBlur={1}/>}
            <HeaderComponent/>
            <PageContainer>

                    <MainComponent/>

            </PageContainer>
        </div>
    )
}

export default App
