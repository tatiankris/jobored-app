import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import App from './App'
import './index.css'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from "react-redux"
import {store} from "./store/store"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <MantineProvider withGlobalStyles withNormalizeCSS>
                <App/>
            </MantineProvider>
        </Provider>
    </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
