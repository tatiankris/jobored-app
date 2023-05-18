import React, {useEffect, useState} from 'react'
import SearchFilters from './SearchFilters'
import VacanciesList from "../../Vacancies/VacanciesLisl"
import SearchField from "./SearchField"
import CommonPagination from "../../CommonComponents/CommonPagination"
import style from './JobSearchPage.module.css'
import CommonContainer from "../../CommonComponents/CommonContainer"
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks"
import {getCataloguesTC, getVacanciesTC} from "../../../store/reducers/vacancies-reducer"
import {AppRootStateType} from "../../../store/store"

function JobSearchPage() {

    const dispatch = useAppDispatch()
    const catalogues = useAppSelector((state: AppRootStateType) => state.vacanciesReducer.cataloguesList)
    const vacancies = useAppSelector((state: AppRootStateType) => state.vacanciesReducer.vacancies)
    const searchParams = useAppSelector((state: AppRootStateType) => state.searchReducer)

    useEffect(() => {
        dispatch(getCataloguesTC())
    }, [])

    useEffect(() => {
        dispatch(getVacanciesTC())
    }, [searchParams])



    const [itemOffset, setItemOffset] = useState(0)
    const endOffset = itemOffset + 4
    const currentItems = vacancies.slice(itemOffset, endOffset)
    const pageCount = Math.ceil(vacancies.length / 4)
    const handlePageChange = (value: number) => {
        const newOffset = (value * 4) % vacancies.length
        setItemOffset(newOffset)
    }

    return (
        <CommonContainer page={'jobSearch'}>
            <div className={style.jobSearch}>
                <SearchFilters catalogues={catalogues} />
                <div className={style.group}>
                    <div>
                        <SearchField/>
                        <VacanciesList vacancies={currentItems}/>
                    </div>
                    <CommonPagination pages={pageCount} handlePageChange={handlePageChange}/>
                </div>
            </div>
        </CommonContainer>
    )
}

export default JobSearchPage