
type InitialState = {

}

export const appReducer = (state: InitialState, action: AppActionType) => {
    switch (action.type) {
        case 'APP_STATUS': {
            return {...state}
        }
        default:
            return state

    }

}

const AppStatusAC = () => {
    return {
        type: 'APP_STATUS'
    }

}

export type AppActionType = ReturnType< typeof AppStatusAC>