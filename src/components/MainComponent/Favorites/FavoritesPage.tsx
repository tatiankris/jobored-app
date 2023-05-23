import React, {useEffect, useState} from 'react'
import CommonPagination from "../../CommonComponents/CommonPagination"
import CommonContainer from "../../CommonComponents/CommonContainer"
import EmptyPage from "../../CommonComponents/EmptyPage"
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks"
import {AppRootStateType} from "../../../store/store"
import VacanciesList from "../../Vacancies/VacanciesLisl"
import {getFavoritesTC, setFavoritesPageAC} from "../../../store/reducers/favorites-reducer"
import style from './FavoritesPage.module.css'

function FavoritesPage() {

    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector((state: AppRootStateType) => state.appReducer.isInitialized)

    const idsFavorites = useAppSelector((state: AppRootStateType) => state.favoritesReducer.idsFavorites)
    const favorites = useAppSelector((state: AppRootStateType) => state.favoritesReducer.favorites)
    const pages = useAppSelector((state: AppRootStateType) => state.favoritesReducer.pages)
    const page = useAppSelector((state: AppRootStateType) => state.favoritesReducer.page)

    useEffect(() => {
        isInitialized && dispatch(getFavoritesTC())
    }, [page, idsFavorites, isInitialized, dispatch])

    const handlePageChange = (value: number) => {
        dispatch(setFavoritesPageAC(value - 1))
    }

    const [paginationValue, setPaginationValue] = useState(page + 1)
    useEffect(() => {
        setPaginationValue(page + 1)
    }, [page])

    if (idsFavorites.length === 0) {
        return <EmptyPage page={'favorites'}/>
    }
    return (
        <CommonContainer page={'favorites'}>
            <div className={style.favoritesPage}>
                <VacanciesList vacancies={favorites}/>
                <div className={style.pagination}>
                    {pages > 1 && <CommonPagination value={paginationValue} pages={pages} handlePageChange={handlePageChange}/>}
                </div>
            </div>
        </CommonContainer>
    )
}

export default FavoritesPage