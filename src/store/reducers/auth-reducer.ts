import {AppThunk} from "../store"
import {AxiosError} from "axios"
import {isInitializedAC, setAppErrorAC, setAppStatusAC} from "./app-reducer"
import { authAPI } from "../../api/auth-api"
import {Debugger} from "inspector";

type InitialStateType = {
    token: AccessTokenType | null
}
export type AccessTokenType = {
    access_token: string
    expires_in: number
    refresh_token: string
    reg_user_resumes_count: number
    token_type: string
    ttl: number
}

const InitialState = {
    token: null
}

export const authReducer = (state: InitialStateType = InitialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case 'SET_ACCESS_TOKEN': {
                return {...state, token: action.token}
        }
        default:
            return state
    }
}

const setAccessTokenAC = (token: any) => {
    return {
        type: 'SET_ACCESS_TOKEN',
        token
    }
}

export const deleteToken = (): AppThunk => (dispatch) => {
    localStorage.removeItem('access_token')
}

export const initializeTC =  (): AppThunk  => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
// debugger
    const token = await localStorage.getItem('access_token')
    console.log('ТОКЕН С AWAIT', token)

    let parsed = false

    try {
        token && JSON.parse(token)
        parsed = true
    } catch {
        parsed = false
    }

    const tokenObj = parsed && token ? JSON.parse(token) : null

    const tokenFail = !tokenObj || !tokenObj.token_type || !tokenObj.access_token || !tokenObj.ttl
    const ttlFail = tokenObj && tokenObj.ttl && tokenObj.ttl < Date.now()/1000

    const authorize = tokenFail || ttlFail

    !authorize && dispatch(setAccessTokenAC(tokenObj))
    && dispatch(isInitializedAC()) &&  dispatch(setAppStatusAC('prepared'))

    authorize && dispatch(authTC())
}

export const authTC = (): AppThunk => (dispatch) => {

    dispatch(setAppStatusAC('loading'))
        authAPI.getAuth()
        .then((res) => {


            localStorage.getItem('access_token') !== null && localStorage.removeItem('access_token')
            localStorage.setItem('access_token', JSON.stringify(res.data))
            console.log('ОБЪЕКТ ТОКЕНА', localStorage.getItem('access_token') )
            dispatch(setAccessTokenAC(res.data))

        }).then(() => {
            dispatch(isInitializedAC())

        })
        .catch((err: AxiosError<{ message: string }>) => {

            const error = err.message
            dispatch(setAppErrorAC(error ?error : 'Some error occurred'))

        })
        .finally(() => {

            dispatch(setAppStatusAC('prepared'))
        })
}

export type AuthActionType = ReturnType< typeof setAccessTokenAC>