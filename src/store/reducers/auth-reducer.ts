import {AppThunk} from "../store"
import {authAPI, vacanciesAPI} from "../../api/search-api"
import {AxiosError} from "axios"

type InitialState = {

}

export const authReducer = (state: InitialState, action: AuthActionType) => {
    switch (action.type) {
        case 'AUTH_STATUS': {
                return {...state}
        }
        default:
            return state

    }

}

const AuthStatusAC = () => {
    return {
        type: 'AUTH_STATUS'
    }

}
export const authTC = (): AppThunk => (dispatch) => {

    authAPI.getAuth()
        .then((res) => {
            console.log(res.data)
            // localStorage.setItem('access_token', res.data.access_token)
        })
        .catch((err: AxiosError<{ error: string }>) => {

        })
        .finally(() => {})

}

export type AuthActionType = ReturnType< typeof AuthStatusAC>