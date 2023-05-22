import React, {useEffect} from 'react'
import CommonPagination from "../../CommonComponents/CommonPagination"
import CommonContainer from "../../CommonComponents/CommonContainer"
import EmptyPage from "../../CommonComponents/EmptyPage"
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks"
import {AppRootStateType} from "../../../store/store"
import VacanciesList from "../../Vacancies/VacanciesLisl"
import {getFavoritesTC, getIdsFavoritesTC, setFavoritesPageAC} from "../../../store/reducers/favorites-reducer"
import style from './FavoritesPage.module.css'
function FavoritesPage() {

    useEffect(() => {
        dispatch(getFavoritesTC())
        dispatch(getIdsFavoritesTC())
    }, [])

    const dispatch = useAppDispatch()
    const favorites = useAppSelector((state: AppRootStateType) => state.favoritesReducer.favorites)

    const pages = useAppSelector((state: AppRootStateType) => state.favoritesReducer.pages)
    const handlePageChange = (value: number) => {
        const page = value - 1
        dispatch(setFavoritesPageAC(page))
    }

    if (favorites.length === 0) {
        return <EmptyPage page={'favorites'}/>
    }
    return (
        <CommonContainer page={'favorites'}>
            <div className={style.favoritesPage}>
                <VacanciesList vacancies={favorites}/>
                <CommonPagination pages={pages} handlePageChange={handlePageChange}/>
            </div>
        </CommonContainer>
    )
}

export default FavoritesPage