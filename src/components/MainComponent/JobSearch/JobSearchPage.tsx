import React from 'react'
import SearchFilters from './SearchFilters'
import VacanciesList from "../../Vacancies/VacanciesLisl"
import SearchField from "./SearchField"
import CommonPagination from "../../CommonComponents/CommonPagination"
import style from './JobSearchPage.module.css'
import CommonContainer from "../../CommonComponents/CommonContainer"

function JobSearchPage() {

    return (
        <CommonContainer page={'jobSearch'}>
            <div className={style.jobSearch}>
                <SearchFilters/>
                <div className={style.group}>
                    <div>
                        <SearchField/>
                        <VacanciesList/>
                    </div>
                    <CommonPagination/>
                </div>
            </div>
        </CommonContainer>
    )
}

export default JobSearchPage