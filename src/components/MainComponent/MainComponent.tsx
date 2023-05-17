import React from 'react'
import {Navigate, Route, Routes} from "react-router-dom"
import FavoritesPage from './Favorites/FavoritesPage'
import JobSearchPage from './JobSearch/JobSearchPage'
import VacancyPage from "../Vacancies/VacancyPage/VacancyPage"

export const JOB_SEARCH = "/search-vacancies"
export const FAVORITES = '/favorites'

function MainComponent() {

    return (
        <Routes>
            <Route path="/" element={<Navigate to={JOB_SEARCH}/> } />
            <Route path={JOB_SEARCH} element={<JobSearchPage/>}/>
            <Route path={FAVORITES} element={<FavoritesPage/>}/>
            <Route path={JOB_SEARCH + '/:name'} element={<VacancyPage/>}/>
        </Routes>
    )
}

export default MainComponent