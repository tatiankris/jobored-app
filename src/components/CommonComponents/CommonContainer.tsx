import React, {ReactNode} from 'react'
import {Container} from "@mantine/core"
import {useStyles} from "../../styles/commonStyles"

type CommonContainer = {
    children: ReactNode,
    page: string
}


function CommonContainer({children, page}: CommonContainer) {

    const { classes } = useStyles()

    return (
        <Container className={page === 'header' ? classes.containerHeader : classes.container} size={page === 'favorites' || 'vacancy' ? '51rem' : '70rem'} px={20}>
            {children}
        </Container>
    )
}

export default CommonContainer