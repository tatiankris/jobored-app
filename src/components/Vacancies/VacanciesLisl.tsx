import React from 'react'
import Vacancy from "./Vacancy/Vacancy"
import {useAppSelector} from "../../hooks/hooks"

type VacanciesList = {
    vacancies: Array<any>
}

function VacanciesList({vacancies}: VacanciesList) {

    return (
        <div className={"VacanciesList"}>
            {
                vacancies && vacancies.map((m: any) => {
                    return <Vacancy key={m.id} id={m.id} profession={m.profession}
                                    firm={m.firm_name} typeOfWork={m.type_of_work.title}
                                    paymentFrom={m.payment_from} paymentTo={m.payment_to}
                                    currency={m.currency} town={m.town.title}  variant={'in-list'} />
                })
            }
        </div>
    )
}

export default VacanciesList