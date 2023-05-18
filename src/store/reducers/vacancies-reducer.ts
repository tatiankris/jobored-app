import {AppRootStateType, AppThunk} from "../store"
import {SearchVacanciesParamsType, vacanciesAPI} from "../../api/search-api"
import {AxiosError} from "axios"

export type CatalogueItemType = {title: string, key: number}
type InitialStateType = {
    currentVacancy: CatalogueItemType | null,
    cataloguesList: Array<CatalogueItemType>,
    vacancies: Array<any>
}

const InitialState = {
    currentVacancy: null,
    cataloguesList: [],
    vacancies: []
} as InitialStateType

export const vacanciesReducer = (state:InitialStateType = InitialState, action: VacanciesActionType) => {
    switch (action.type) {
        case 'GET_CATALOGUES': {
            return {...state, cataloguesList: action.cataloguesList}
        }
        case 'GET_VACANCIES': {
            return {...state, vacancies: action.vacancies}
        }
        case 'GET_CURRENT_VACANCY': {
            return {...state, currentVacancy: action.vacancy}
        }

        default:
            return state
    }
}

const getCataloguesAC = (cataloguesList: Array<CatalogueItemType>) => {
    return {
        type: 'GET_CATALOGUES',
        cataloguesList: cataloguesList
    } as const

}

const getVacanciesAC = (vacancies: any) => {
    return {
        type: 'GET_VACANCIES',
        vacancies: vacancies
    } as const

}
const getCurrentVacancyAC = (vacancy: any) => {
    return {
        type: 'GET_CURRENT_VACANCY',
        vacancy: vacancy
    } as const

}

export const getCataloguesTC = (): AppThunk => (dispatch) => {

    vacanciesAPI.getVacanciesCatalogues()
        .then((res) => {
            const cataloguesList = res.data.map(m => {return {title: m.title, key: m.key}})
            dispatch(getCataloguesAC(cataloguesList))
        })
        .catch((err: AxiosError<{ error: string }>) => {

        })
        .finally(() => {})
}


export const getVacanciesTC = (): AppThunk => (dispatch,
                                                                                 getState: () => AppRootStateType ) =>
{

   const params = getState().searchReducer

    vacanciesAPI.searchVacancies(
        params
        // {
        // catalogues: params.catalogues,
        // payment_from: params.payment_from,
        // payment_to: params.payment_to ? params.payment_to : null,
        // keyword: params?.keyword ? params.keyword : null,
        // published: params.published
    // }
    )
        .then((res) => {

            console.log(res.data)
            const vacancies = res.data.objects
            dispatch(getVacanciesAC(vacancies))

        })
        .catch((err: AxiosError<{ error: string }>) => {

        })
        .finally(() => {})
}

export const getCurrentVacancyTC = (id: string): AppThunk => (dispatch) => {
    console.log('id', id)
    vacanciesAPI.getVacancy(id)
        .then((res) => {

            console.log(res.data)
            const vacancy = res.data
            dispatch(getCurrentVacancyAC(vacancy))

        })
        .catch((err: AxiosError<{ error: string }>) => {

        })
        .finally(() => {})
}

export type VacanciesActionType = ReturnType< typeof getCataloguesAC> | ReturnType< typeof getVacanciesAC> | ReturnType< typeof getCurrentVacancyAC>