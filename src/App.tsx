import {Container, Header} from '@mantine/core'
import React from 'react'
import './App.css'
import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import MainComponent from './components/MainComponent/MainComponent'
import { useStyles } from './styles/commonStyles'
import CommonContainer from "./components/CommonComponents/CommonContainer"
import PageContainer from "./components/CommonComponents/PageContainer"


function App() {

    const {classes} = useStyles()

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
