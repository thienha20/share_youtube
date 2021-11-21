import React from 'react'
import ReactDOM from 'react-dom'
import '../src/assets/scss/style.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {Provider} from 'react-redux'
import redux from './store/index'
import {StyledEngineProvider} from '@mui/material/styles'
import { SnackbarProvider } from 'notistack';
ReactDOM.render(
    <React.StrictMode>
        <Provider store={redux.store}>
            <SnackbarProvider>
                <StyledEngineProvider>
                    <App/>
                </StyledEngineProvider>
            </SnackbarProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
