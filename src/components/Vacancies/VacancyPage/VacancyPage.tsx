import React, {useEffect} from 'react'
import Vacancy from "../Vacancy/Vacancy"
import {useParams} from "react-router-dom"
import CommonContainer from "../../CommonComponents/CommonContainer"
import VacancyInfo from "../VacancyInfo/VacancyInfo"
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks"
import {AppRootStateType} from "../../../store/store"
import {getCurrentVacancyTC} from "../../../store/reducers/vacancies-reducer"

function VacancyPage() {

    const dispatch = useAppDispatch()
    const {vacancy_id} = useParams()

    useEffect(() => {
        vacancy_id && dispatch(getCurrentVacancyTC(vacancy_id))
    }, [dispatch, vacancy_id])

    const vacancy = useAppSelector((state: AppRootStateType) => state.vacanciesReducer.currentVacancy)

    return (
        <CommonContainer page={'vacancy'}>

            {vacancy && <div className={"VacancyPage"}>
                <Vacancy vacancyObject={vacancy} id={vacancy.id} variant={'in-page'}
                         profession={vacancy.profession} firm={vacancy.firm_name}
                         typeOfWork={vacancy.type_of_work.title} paymentFrom={vacancy.payment_from}
                         paymentTo={vacancy.payment_to} currency={vacancy.currency}
                         town={vacancy.town.title}/>
                <VacancyInfo text={vacancy.vacancyRichText}/>
            </div>
            }

        </CommonContainer>
    )
}

export default VacancyPage