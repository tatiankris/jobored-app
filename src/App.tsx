import {LoadingOverlay} from '@mantine/core'
import React, {useEffect} from 'react'
import './App.css'
import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import MainComponent from './components/MainComponent/MainComponent'
import {useStyles} from './styles/commonStyles'
import PageContainer from "./components/CommonComponents/PageContainer"
import {initializeTC} from "./store/reducers/auth-reducer"
import {useAppDispatch, useAppSelector} from './hooks/hooks'
import {getIdsFavoritesTC} from "./store/reducers/favorites-reducer"
import {AppRootStateType} from "./store/store"

function App() {

    const {classes} = useStyles()
    const appStatus = useAppSelector((state: AppRootStateType) => state.appReducer.status)
    const isInitialized = useAppSelector((state: AppRootStateType) => state.appReducer.isInitialized)

    const dispatch = useAppDispatch()
    useEffect(() => {
        // localStorage.removeItem('access_token')
        // localStorage.setItem('access_token', JSON.stringify({access_token: 'ljlkjlkj'}))
        !isInitialized && dispatch(initializeTC())
        dispatch(getIdsFavoritesTC())
    }, [isInitialized, dispatch])

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
