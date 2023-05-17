import React, {ReactNode} from 'react'
import {useStyles} from "../../styles/commonStyles"

type PageContainer = {
    children: ReactNode
}


function PageContainer({children}: PageContainer) {

    const { classes } = useStyles()

    return (
        <div className={classes.pageContainer} >
            {children}
        </div>
    )
}

export default PageContainer