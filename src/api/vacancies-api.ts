import {instance} from "./request-instances"



export const vacanciesAPI = {

    getVacanciesCatalogues() {
        return instance.get<CataloguesResponseType>("catalogues/")
    },
    searchVacancies(params: SearchVacanciesParamsType) {
        return instance.get("vacancies/", {params})
    },
    getFavorites(params: GetFavoritesParamsType) {
        return instance.get("vacancies/", {params})
    },
    getVacancy(id: string | number) {
        return instance.get(`vacancies/${id}/`)
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



