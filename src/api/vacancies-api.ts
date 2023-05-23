import {instance} from "./request-instances"
import {AccessTokenType} from "../store/reducers/auth-reducer";



export const vacanciesAPI = {

    getVacanciesCatalogues(token: AccessTokenType) {
        return instance.get<CataloguesResponseType>("catalogues/", {headers: {Authorization: `${token?.token_type} ${token?.access_token}`}})
    },
    searchVacancies(params: SearchVacanciesParamsType, token: AccessTokenType) {
        return instance.get("vacancies/", {params, headers: {Authorization: `${token?.token_type} ${token?.access_token}`}})
    },
    getFavorites(params: GetFavoritesParamsType, token: AccessTokenType) {
        return instance.get("vacancies/", {params, headers: {Authorization: `${token?.token_type} ${token?.access_token}`}})
    },
    getVacancy(id: string | number, token: AccessTokenType) {
        return instance.get(`vacancies/${id}/`, {headers: {Authorization: `${token?.token_type} ${token?.access_token}`}})
    }

}

export type CataloguesResponseType = Array<CatalogueItemType>

export type CatalogueItemType = {
    title: string
    key: number
}

export type VacanciesListType = Array<VacancyType>

export type VacancyType = {
    currency: string
    firm_name: string
    id: number
    payment_from: number
    payment_to: number
    profession: string
    town: {title: string}
    type_of_work: {title: string}
    vacancyRichText: string
}

export type SearchVacanciesParamsType = {
    catalogues?: number | null
    payment_from?: number | ''
    payment_to?: number | ''
    keyword?: string
    published: 1
    page: number
    count: 4
}

export type GetFavoritesParamsType = {
    ids: Array<number>
    page: number
    count: 4
}



