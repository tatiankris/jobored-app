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
import EmptyPage from "../../CommonComponents/EmptyPage"
import {setVacanciesPage} from "../../../store/reducers/search-reducer"
import {useDisclosure, useMediaQuery} from "@mantine/hooks"
import {Button, Group, Modal} from "@mantine/core"

function JobSearchPage() {

    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector((state: AppRootStateType) => state.appReducer.isInitialized)
    const catalogues = useAppSelector((state: AppRootStateType) => state.vacanciesReducer.cataloguesList)
    const vacancies = useAppSelector((state: AppRootStateType) => state.vacanciesReducer.vacancies)
    const searchParams = useAppSelector((state: AppRootStateType) => state.searchReducer)
    const pages = useAppSelector((state: AppRootStateType) => state.vacanciesReducer.pages)
    const page = useAppSelector((state: AppRootStateType) => state.searchReducer.page)

    const iSmallScreen = useMediaQuery('(max-width: 946px)')

    useEffect(() => {
        isInitialized && dispatch(getCataloguesTC())
    }, [isInitialized, dispatch])

    useEffect(() => {
        isInitialized && dispatch(getVacanciesTC())
    }, [isInitialized, searchParams, dispatch])

    const handlePageChange = (value: number) => {
        const page = value - 1
        dispatch(setVacanciesPage(page))
    }

    const [paginationValue, setPaginationValue] = useState(page + 1)

    useEffect(() => {
        setPaginationValue(page + 1)
    }, [page])

    const [opened, {open, close}] = useDisclosure(false)
    return (
        <CommonContainer page={'jobSearch'}>
            <div className={style.jobSearch}>
                {iSmallScreen
                    ? <Modal opened={opened} onClose={close}>
                        <SearchFilters close={close} cataloguesData={catalogues}/>
                    </Modal>
                    : <SearchFilters cataloguesData={catalogues}/>
                }
                {iSmallScreen
                    && <Group position="center">
                        <Button variant={'light'} onClick={open}>Фильтры</Button>
                    </Group>
                }
                <div className={style.group}>
                    <SearchField/>
                    {vacancies.length > 0
                        ? <VacanciesList vacancies={vacancies}/>
                        : <EmptyPage page={'search'}/>
                    }
                    {pages > 1
                        &&
                        <CommonPagination value={paginationValue} pages={pages} handlePageChange={handlePageChange}/>
                    }
                </div>
            </div>
        </CommonContainer>
    )
}

export default JobSearchPage