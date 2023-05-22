
export type AppStatusType = 'loading' | 'prepared'

type InitialStateType = {
    status: AppStatusType,
    errors: Array<string>
}

const InitialState = {
    status: 'prepared',
    errors: []
} as InitialStateType

export const appReducer = (state: InitialStateType = InitialState, action: AppActionType):InitialStateType => {
    switch (action.type) {
        case 'APP_STATUS': {
            return {...state, status: action.status}
        }
        case 'APP_ERROR': {
            return {...state, errors: [...state.errors, action.error]}
        }
        case 'APP_DELETE_ERROR': {
            const errors = [...state.errors]
            errors.shift()
            return {...state, errors: errors}
        }
        default:
            return state

    }

}

export const setAppStatusAC = (status: AppStatusType) => {
    return {
        type: 'APP_STATUS',
        status
    } as const
}
export const setAppErrorAC = (error: string) => {
    return {
        type: 'APP_ERROR',
        error
    } as const
}
export const deleteAppErrorAC = () => {
    return {
        type: 'APP_DELETE_ERROR'
    } as const
}

export type AppActionType = ReturnType< typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC> | ReturnType<typeof deleteAppErrorAC>