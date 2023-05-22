import React, {useEffect} from 'react'
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
    const catalogues = useAppSelector((state: AppRootStateType) => state.vacanciesReducer.cataloguesList)
    const vacancies = useAppSelector((state: AppRootStateType) => state.vacanciesReducer.vacancies)
    const searchParams = useAppSelector((state: AppRootStateType) => state.searchReducer)
    const iSmallScreen = useMediaQuery('(max-width: 946px)')

    useEffect(() => {
        dispatch(getCataloguesTC())
    }, [])

    useEffect(() => {
        dispatch(getVacanciesTC())
    }, [searchParams])

    const pages = useAppSelector((state: AppRootStateType) => state.vacanciesReducer.pages)
    const handlePageChange = (value: number) => {
        const page = value - 1
        dispatch(setVacanciesPage(page))
    }

    const [opened, { open, close }] = useDisclosure(false)
    return (
        <CommonContainer page={'jobSearch'}>
            <div className={style.jobSearch}>
                {iSmallScreen ? <Modal opened={opened} onClose={close}>
                        <SearchFilters cataloguesData={catalogues} />
                </Modal>
                : <SearchFilters cataloguesData={catalogues} />
                }
                {iSmallScreen && <Group position="center">
                    <Button onClick={open}>Фильтры</Button>
                </Group>}
                <div className={style.group}>
                    <div>
                        <SearchField/>
                        {
                            vacancies.length > 0
                            ? <VacanciesList vacancies={vacancies}/>
                            : <EmptyPage page={'search'}/>
                        }
                    </div>
                    {pages > 0.9 && <CommonPagination pages={pages} handlePageChange={handlePageChange}/>}
                </div>
            </div>
        </CommonContainer>
    )
}

export default JobSearchPage