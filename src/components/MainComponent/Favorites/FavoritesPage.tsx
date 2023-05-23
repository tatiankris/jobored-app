import React, {useEffect, useState} from 'react'
import CommonPagination from "../../CommonComponents/CommonPagination"
import CommonContainer from "../../CommonComponents/CommonContainer"
import EmptyPage from "../../CommonComponents/EmptyPage"
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks"
import {AppRootStateType} from "../../../store/store"
import VacanciesList from "../../Vacancies/VacanciesLisl"
import {getFavoritesTC, getIdsFavoritesTC, setFavoritesPageAC} from "../../../store/reducers/favorites-reducer"
import style from './FavoritesPage.module.css'
function FavoritesPage() {



    const isInitialized = useAppSelector((state: AppRootStateType) => state.appReducer.isInitialized)

    const dispatch = useAppDispatch()
    const favorites = useAppSelector((state: AppRootStateType) => state.favoritesReducer.favorites)

    const page = useAppSelector((state: AppRootStateType) => state.favoritesReducer.page)
    const idsFavorites = useAppSelector((state: AppRootStateType) => state.favoritesReducer.idsFavorites)

    useEffect(() => {
        isInitialized && dispatch(getFavoritesTC())
    }, [page, idsFavorites, isInitialized])

    const pages = useAppSelector((state: AppRootStateType) => state.favoritesReducer.pages)


    const handlePageChange = (value: number) => {
        console.log('value', value)

        const page = value - 1
        dispatch(setFavoritesPageAC(page))
    }

    const [value, setValue] = useState(page+1)
    useEffect(() => {
        setValue(page+1)
    }, [page])

    if (favorites.length === 0) {
        return <EmptyPage page={'favorites'}/>
    }
    return (
        <CommonContainer page={'favorites'}>
            <div className={style.favoritesPage}>
                <VacanciesList vacancies={favorites}/>

            <div className={style.pagination}>
                {pages > 1 && <CommonPagination value={value} pages={pages} handlePageChange={handlePageChange}/>}

            </div>
            </div>
        </CommonContainer>
    )
}

export default FavoritesPage