import { Pagination } from '@mantine/core'
import React, { useState } from 'react'
import style from './CommonPagination.module.css'
import vacanciesLisl from "../Vacancies/VacanciesLisl"

type CommonPagination = {
    handlePageChange: (value: number) => void
    pages: number
}

function CommonPagination({handlePageChange}: CommonPagination) {


    return (
        <Pagination onChange={handlePageChange}
                    className={style.pagination} total={3} />
    )
}

export default CommonPagination