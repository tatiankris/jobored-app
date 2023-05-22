import {FilterValuesType} from "../../components/MainComponent/JobSearch/SearchFilters"

type InitialStateType = {
    keyword: string,

        catalogues: number | null,
        payment_from: number | "",
        payment_to: number | ""

    page: number
    count: 4,
    published: 1
}
const InitialState = {
    keyword: "",
        catalogues: null,
        payment_from: '',
        payment_to: '',
    page: 0,
    count: 4,
    published: 1
} as InitialStateType


export const searchReducer = (state: InitialStateType = InitialState, action: SearchActionType):InitialStateType => {
    switch (action.type) {
        case 'SET_FILTER_VALUES': {
            const {catalogues, payment_from, payment_to} = action.values
            return {...state, catalogues, payment_from, payment_to} as InitialStateType
        }
        case 'RESET_FILTERS_VALUES': {
            return {...state, catalogues: null, payment_from: '', payment_to: ''}
        }
        case 'RESET_ALL_SEARCH': {
            return {...state, catalogues: null, payment_from: '', payment_to: '', keyword: ''}
        }
        case 'SET_KEYWORD': {
            return {...state, keyword: action.keyword}
        }
        case 'SET_VACANCIES_PAGE': {
            return {...state, page: action.page}
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
export const resetFiltersAC = () => {
    return {
        type: 'RESET_FILTERS_VALUES'
    } as const
}
export const setKeywordAC = (keyword: string) => {
    return {
        type: 'SET_KEYWORD',
        keyword
    } as const
}
export const resetAllSearchAC = () => {
    return {
        type: 'RESET_ALL_SEARCH'
    } as const
}
export const setVacanciesPage = (page: number) => {
    return {
        type: 'SET_VACANCIES_PAGE',
        page
    } as const
}

type SearchActionType = ReturnType<typeof setFiltersAC> | ReturnType<typeof setKeywordAC>
    | ReturnType<typeof resetFiltersAC> | ReturnType<typeof resetAllSearchAC> | ReturnType< typeof setVacanciesPage>