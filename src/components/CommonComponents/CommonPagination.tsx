import { Pagination } from '@mantine/core'
import React from 'react'
import style from './CommonPagination.module.css'
import {useMediaQuery} from "@mantine/hooks"

type CommonPaginationPropsType = {
    pages: number
    handlePageChange: (value: number) => void
    value: number
}

function CommonPagination({value, pages, handlePageChange, ...props }: CommonPaginationPropsType) {

    const iSmallScreen = useMediaQuery('(max-width: 560px)')
    const iSmallerScreen = useMediaQuery('(max-width: 350px)')

    return (
        <Pagination size={iSmallScreen ? 'sm' : 'md'}
                    value={value}
                    onChange={handlePageChange}
                    className={style.pagination}
                    total={Math.ceil(pages)}
                    withControls={iSmallerScreen ? false : true}
        />
    )
}

export default CommonPagination