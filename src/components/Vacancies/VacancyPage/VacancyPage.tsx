import React from 'react'
import Vacancy from "../Vacancy/Vacancy"
import {useLocation, useParams} from "react-router-dom"
import CommonContainer from "../../CommonComponents/CommonContainer"
import VacancyInfo from "../VacancyInfo/VacancyInfo"

function VacancyPage() {

    const {name} = useParams()

    return (
        <CommonContainer page={'vacancy'}>
        <div className={"VacancyPage"}>
            <Vacancy variant={'in-page'}/>
            <VacancyInfo />
        </div>
        </CommonContainer>
    )
}

export default VacancyPage