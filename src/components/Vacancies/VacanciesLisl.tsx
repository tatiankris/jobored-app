import React from 'react'
import Vacancy from "./Vacancy/Vacancy"

function VacanciesList() {

    return (
        <div className={"VacanciesList"}>

            <Vacancy variant={'in-list'} />


            <Vacancy variant={'in-list'} />
        </div>
    )
}

export default VacanciesList