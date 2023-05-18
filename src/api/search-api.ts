import {instance} from "./base"

export const authAPI = {

    getAuth() {
        return instance.get<AuthResponseType>("2.0/oauth2/password/", {
            params: {
                login: 'sergei.stralenia@gmail.com',
                password: 'paralect123',
                client_id: 2356,
                client_secret: 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
                hr: 0
            }
        })
    }
}

export const vacanciesAPI = {

    getVacanciesCatalogues() {
        return instance.get<CataloguesResponseType>("/2.0/catalogues/")
    },
    searchVacancies(params: SearchVacanciesParamsType) {
        return instance.get("2.0/vacancies/", {params})
    },
    getVacancy(id: string | number) {
        return instance.get(`2.0/vacancies/${id}`)
    }

}

export type CataloguesResponseType = Array<{
    title_rus: string
    url_rus: string
    title: string
    id_parent: number
    key: number
}>

type AuthResponseType = {
    access_token: string,
    refresh_token: string,
    ttl: number,
    expires_in: number,
    token_type: string
}

export type SearchVacanciesParamsType = {
    catalogues?: number | null
    payment_from?: number | ''
    payment_to?: number | ''
    keyword?: string
    published: 1

}



