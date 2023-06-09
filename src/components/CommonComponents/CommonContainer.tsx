import React, {ReactNode} from 'react'
import {Container} from "@mantine/core"
import {useStyles} from "../../styles/commonStyles"

type CommonContainerPropsType = {
    children: ReactNode,
    page: string
}

function CommonContainer({children, page, ...props}: CommonContainerPropsType) {

    const { classes } = useStyles()

    return (
        <Container className={page === 'header' ? classes.containerHeader : classes.container} size={page === 'favorites' || page === 'vacancy' ? '51rem' : '72rem'} px={20}>
            {children}
        </Container>
    )
}

export default CommonContainer