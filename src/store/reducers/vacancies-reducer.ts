import {AppRootStateType, AppThunk} from "../store"
import {CatalogueItemType, VacanciesListType, VacancyType, vacanciesAPI} from "../../api/vacancies-api"
import {AxiosError} from "axios"
import {setAppErrorAC, setAppStatusAC} from "./app-reducer"

type InitialStateType = {
    currentVacancy: VacancyType | null
    cataloguesList: Array<CatalogueItemType>
    vacancies: VacanciesListType
    pages: number
}

const InitialState = {
    currentVacancy: null,
    cataloguesList: [],
    vacancies: [],
    pages: 0
} as InitialStateType

export const vacanciesReducer = (state: InitialStateType = InitialState, action: VacanciesActionType): InitialStateType => {
    switch (action.type) {
        case 'SET_CATALOGUES': {
            return {...state, cataloguesList: action.cataloguesList}
        }
        case 'SET_VACANCIES': {
            return {...state, vacancies: action.vacancies}
        }
        case 'SET_CURRENT_VACANCY': {
            return {...state, currentVacancy: action.vacancy}
        }
        case 'SET_PAGES_COUNT': {
            return {...state, pages: action.pages}
        }
        default:
            return state
    }
}

const setCataloguesAC = (cataloguesList: Array<CatalogueItemType>) => {
    return {
        type: 'SET_CATALOGUES',
        cataloguesList
    } as const
}

const setVacanciesAC = (vacancies: VacanciesListType) => {
    return {
        type: 'SET_VACANCIES',
        vacancies
    } as const
}

export const setCurrentVacancyAC = (vacancy: VacancyType) => {
    return {
        type: 'SET_CURRENT_VACANCY',
        vacancy
    } as const
}

const setPagesCountAC = (pages: number) => {
    return {
        type: 'SET_PAGES_COUNT',
        pages
    } as const
}

export const getCataloguesTC = (): AppThunk => (dispatch,
                                                getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC('loading'))
    const token = getState().authReducer.token
    vacanciesAPI.getVacanciesCatalogues(token)
        .then((res) => {
            const cataloguesList = res.data.map(m => {
                return {title: m.title, key: m.key}
            })
            dispatch(setCataloguesAC(cataloguesList))
        })
        .catch((err: AxiosError<{ message: string }>) => {
            const error = err.message
            dispatch(setAppErrorAC(error ? error : 'Some error occurred'))

        })
        .finally(() => {
            dispatch(setAppStatusAC('prepared'))
        })
}

export const getVacanciesTC = (): AppThunk => (dispatch,
                                                            getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC('loading'))
    const params = getState().searchReducer
    const token = getState().authReducer.token
    vacanciesAPI.searchVacancies(params, token)
        .then((res) => {
            const allPages = res.data.total / 4
            const pages = allPages > 125 ? 125 : allPages
            dispatch(setPagesCountAC(pages))

            const vacancies = res.data.objects
            dispatch(setVacanciesAC(vacancies))

        })
        .catch((err: AxiosError<{ message: string }>) => {
            const error = err.message
            dispatch(setAppErrorAC(error ? error : 'Some error occurred'))

        })
        .finally(() => {
            dispatch(setAppStatusAC('prepared'))
        })
}

export const getCurrentVacancyTC = (id: string): AppThunk => (dispatch,
                                                              getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC('loading'))
    const token = getState().authReducer.token
    vacanciesAPI.getVacancy(id, token)
        .then((res) => {
            const vacancy = res.data
            dispatch(setCurrentVacancyAC(vacancy))
        })
        .catch((err: AxiosError<{ message: string }>) => {
            const error = err.message
            dispatch(setAppErrorAC(error ? error : 'Some error occurred'))
        })
        .finally(() => {
            dispatch(setAppStatusAC('prepared'))
        })
}

export type VacanciesActionType = ReturnType<typeof setCataloguesAC> | ReturnType<typeof setVacanciesAC>
    | ReturnType<typeof setCurrentVacancyAC> | ReturnType<typeof setPagesCountAC>