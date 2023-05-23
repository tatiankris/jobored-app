import {AppThunk} from "../store"
import {AxiosError} from "axios"
import {isInitializedAC, setAppErrorAC, setAppStatusAC} from "./app-reducer"
import { authAPI } from "../../api/auth-api"

type InitialStateType = {
    token: AccessTokenType
}
export type AccessTokenType = {
    access_token: string
    expires_in: number
    refresh_token: string
    reg_user_resumes_count: number
    token_type: string
    ttl: number
} | null

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

export const authTC = (): AppThunk => (dispatch) => {


    dispatch(setAppStatusAC('loading'))

    const token = localStorage.getItem('access_token')

    const access_token = token  ? JSON.parse(token) : null

    const ttlFail = access_token && access_token.ttl < Date.now()/1000
    const authorize = !access_token || ttlFail
    access_token && console.log('ttl', access_token.ttl, Date.now()/1000)

    !authorize && dispatch(setAccessTokenAC(access_token)) && dispatch(isInitializedAC())

    authorize && authAPI.getAuth()
        .then((res) => {
            console.log('ОБЪЕКТ ТОКЕНА', res.data)

            localStorage.setItem('access_token', JSON.stringify(res.data))
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