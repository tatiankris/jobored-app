import {AppThunk} from "../store"
import {AxiosError} from "axios"
import {setAppErrorAC, setAppStatusAC} from "./app-reducer"
import { authAPI } from "../../api/auth-api"

type InitialStateType = {
    token: string | null
}
const InitialState = {
    token: null
}

export const authReducer = (state: InitialStateType = InitialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case 'SET_AUTH_STATUS': {
                return {...state, token: action.token}
        }
        default:
            return state
    }
}

const setAuthStatusAC = (token: string) => {
    return {
        type: 'SET_AUTH_STATUS',
        token
    }
}

export const authTC = (): AppThunk => (dispatch) => {

    dispatch(setAppStatusAC('loading'))
    const access_token = localStorage.getItem('access_token')
    !access_token && authAPI.getAuth()
        .then((res) => {
            console.log(res.data)

            localStorage.setItem('access_token', res.data.access_token)
            dispatch(setAuthStatusAC(res.data.access_token))

        })
        .catch((err: AxiosError<{ message: string }>) => {

            const error = err.message
            dispatch(setAppErrorAC(error ?error : 'Some error occurred'))

        })
        .finally(() => {
            dispatch(setAppStatusAC('prepared'))
        })
}

export type AuthActionType = ReturnType< typeof setAuthStatusAC>