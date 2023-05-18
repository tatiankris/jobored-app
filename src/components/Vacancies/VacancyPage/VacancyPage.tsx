import React, {useEffect} from 'react'
import Vacancy from "../Vacancy/Vacancy"
import {useParams} from "react-router-dom"
import CommonContainer from "../../CommonComponents/CommonContainer"
import VacancyInfo from "../VacancyInfo/VacancyInfo"
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks"
import {AppRootStateType} from "../../../store/store"
import {log} from "util"
import {getCurrentVacancyTC} from "../../../store/reducers/vacancies-reducer"

function VacancyPage() {

    const {vacancy_id} = useParams()

    const dispatch = useAppDispatch()

    useEffect(() => {
        vacancy_id && dispatch(getCurrentVacancyTC(vacancy_id))
    }, [])

    const v = useAppSelector((state: AppRootStateType) => state.vacanciesReducer.currentVacancy)
    console.log('v', v)

    return (
        <CommonContainer page={'vacancy'}>

            {
                v
                    ?<div className={"VacancyPage"}>
                        <Vacancy id={v.id} variant={'in-page'} profession={v.profession}
                                 firm={v.firm_name} typeOfWork={v.type_of_work.title} paymentFrom={v.payment_from}
                                 paymentTo={v.payment_to} currency={v.currency} town={v.town.title} />

                        <VacancyInfo text={v.vacancyRichText} />
                    </div>
                    : <div>
                            no vacancy
                    </div>
            }

        </CommonContainer>
    )
}

export default VacancyPage