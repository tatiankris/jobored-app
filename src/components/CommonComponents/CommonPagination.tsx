import { Pagination } from '@mantine/core'
import React from 'react'
import style from './CommonPagination.module.css'

type CommonPagination = {

}

function CommonPagination(props: CommonPagination) {

    return (
        <Pagination className={style.pagination} total={3} />
    )
}

export default CommonPagination