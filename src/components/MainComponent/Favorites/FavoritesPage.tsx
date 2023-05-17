import React from 'react'
import VacanciesList from "../../Vacancies/VacanciesLisl"
import CommonPagination from "../../CommonComponents/CommonPagination"
import CommonContainer from "../../CommonComponents/CommonContainer"
import NoFavorites from "./NoFavorites"

function FavoritesPage() {


    if (true) {
        return <NoFavorites/>
    }
    return (
        <CommonContainer page={'favorites'}>
            <div className={'FavoritesPage'}>
                <VacanciesList/>
                <CommonPagination/>
            </div>
        </CommonContainer>
    )
}

export default FavoritesPage