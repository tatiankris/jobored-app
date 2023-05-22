import {AppRootStateType, AppThunk} from "../store"
import {VacanciesListType, VacancyType, vacanciesAPI } from "../../api/vacancies-api"
import {setAppErrorAC, setAppStatusAC} from "./app-reducer"
import {AxiosError} from "axios/index"


type InitialStateType = {
    idsFavorites: Array<number>
    favorites: VacanciesListType
    pages: number
    page: number
    count: 4

}

const InitialState = {
    idsFavorites: [],
    favorites: [],
    pages: 0,
    page: 0,
    count: 4


} as InitialStateType

export const favoritesReducer = (state:InitialStateType = InitialState, action: FavoritesActionType):InitialStateType => {
    switch (action.type) {
        case 'SET_FAVORITES': {
            return {...state, favorites: action.favorites}
        }
        case 'SET_IDS_FAVORITES': {
            return {...state, idsFavorites: action.idsFavorites}
        }
        case 'SET_PAGES_COUNT': {
            return {...state, pages: action.pages}
        }
        case 'SET_FAVORITE_PAGE': {
            return {...state, page: action.page }
        }
        case 'SET_FAVORITE': {
            return {...state, idsFavorites : [...state.idsFavorites, action.id]}
        }
        case 'DELETE_FAVORITE': {
            return {...state, idsFavorites: state.idsFavorites.filter(s => s !== action.id)}
        }

        default:
            return state
    }
}

export const setPagesCountFavoritesAC = (pages: number) => {
    return {
        type: 'SET_PAGES_COUNT',
        pages
    } as const
}
export const setFavoritesPageAC = (page: number) => {
    return {
        type: 'SET_FAVORITE_PAGE',
        page
    } as const
}
const setFavoritesAC = (favorites: VacanciesListType) => {
    return {
        type: 'SET_FAVORITES',
        favorites
    } as const
}
const setIdsFavoritesAC = (idsFavorites: Array<number>) => {
    return {
        type: 'SET_IDS_FAVORITES',
        idsFavorites
    } as const
}

const setFavoriteAC = (id: number) => {
    return {
        type: 'SET_FAVORITE',
        id
    } as const
}

const deleteFavoriteAC = (id: number) => {
    return {
        type: 'DELETE_FAVORITE',
        id
    } as const
}

// export const getFavoritesTC = (): AppThunk => (dispatch) => {
//
//     const favorites = localStorage.getItem('favorites_vacancies')
//     dispatch(setFavoritesAC(favorites ? JSON.parse(favorites) : null))
// }

export const getIdsFavoritesTC = (): AppThunk => (dispatch,
                                                  getState: () => AppRootStateType) => {

    const local = localStorage.getItem('favorites_vacancies')
    const idsFavorites = local ? JSON.parse(local) : []
    dispatch(setIdsFavoritesAC(idsFavorites))

}
export const getFavoritesTC = (): AppThunk => (dispatch,
                                               getState: () => AppRootStateType ) => {
    dispatch(setAppStatusAC('loading'))

    // const local = localStorage.getItem('favorites_vacancies')
    // const idsFavorites = local ? JSON.parse(local) : []

    const {page, count, idsFavorites} = getState().favoritesReducer

    vacanciesAPI.getFavorites({ page, count, 'ids': idsFavorites })
        .then((res) => {

            const allPages = res.data.total / 4
            const pages = allPages > 125 ? 125 : allPages
            dispatch(setPagesCountFavoritesAC(pages))
            console.log('data-favorites',res.data)

            const favorites = res.data.objects
            dispatch(setFavoritesAC(favorites))

        })
        .catch((err: AxiosError<{message: string}>) => {
            const error = err.message
            dispatch(setAppErrorAC(error ? error : 'Some error occurred'))

        })
        .finally(() => {
            dispatch(setAppStatusAC('prepared'))
        })
}


export const setFavoriteTC = (favorite: VacancyType): AppThunk => (dispatch) => {
    const local = localStorage.getItem('favorites_vacancies')
    const favorites = local ? JSON.parse(local) : []
    const newFavorites = [...favorites, favorite.id]
    localStorage.setItem('favorites_vacancies', JSON.stringify(newFavorites))
    dispatch(setFavoriteAC(favorite.id))
    // dispatch(getFavoritesTC())
}

export const deleteFavoriteTC = (id: number): AppThunk => (dispatch) => {
    console.log(id)
    const local = localStorage.getItem('favorites_vacancies')

    const favorites = local ? JSON.parse(local) : []
    console.log(favorites)
    const newFavorites = favorites.filter((e: number) => e !== id)
    console.log(newFavorites)
    localStorage.setItem('favorites_vacancies', JSON.stringify(newFavorites))
    dispatch(deleteFavoriteAC(id))
    // dispatch(getFavoritesTC())
}


type FavoritesActionType = ReturnType<typeof setFavoritesAC> | ReturnType<typeof setPagesCountFavoritesAC>
    | ReturnType<typeof setFavoritesPageAC> | ReturnType<typeof setIdsFavoritesAC>
    | ReturnType<typeof setFavoriteAC> | ReturnType<typeof deleteFavoriteAC>
