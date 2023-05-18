import React from 'react'
import CommonPagination from "../../CommonComponents/CommonPagination"
import CommonContainer from "../../CommonComponents/CommonContainer"
import NoFavorites from "./NoFavorites"

function FavoritesPage() {

    const handlePageChange = (value: number) => {

    }

    if (true) {
        return <NoFavorites/>
    }
    return (
        <CommonContainer page={'favorites'}>
            <div className={'FavoritesPage'}>
                {/*<VacanciesList/>*/}
                <CommonPagination pages={3} handlePageChange={handlePageChange}/>
            </div>
        </CommonContainer>
    )
}

export default FavoritesPage