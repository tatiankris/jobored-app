import {FilterValuesType} from "../../components/MainComponent/JobSearch/SearchFilters"

type InitialStateType = {
    catalogues: number | null,
    payment_from: number | '',
    payment_to: number | '',
    keyword: string,
    published: 1
}
const InitialState = {
    catalogues: null,
    payment_from: '',
    payment_to: '',
    keyword: '',
    published: 1
} as InitialStateType


export const searchReducer = (state:InitialStateType = InitialState, action: SearchActionType) => {
    switch (action.type) {
        case 'SET_FILTER_VALUES': {
            const {catalogues, payment_from, payment_to} = action.values
            return {...state, catalogues, payment_from, payment_to}
        }
        case 'SET_KEYWORD': {
            return {...state, keyword: action.keyword}
        }
        default:
            return state
    }
}

export const setFiltersAC = (values: FilterValuesType) => {
    return {
        type: 'SET_FILTER_VALUES',
        values
    } as const
}
export const setKeywordAC = (keyword: string) => {
    return {
        type: 'SET_KEYWORD',
        keyword
    } as const
}


type SearchActionType = ReturnType<typeof setFiltersAC> | ReturnType<typeof setKeywordAC>