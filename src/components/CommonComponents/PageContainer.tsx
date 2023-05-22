import React, {ReactNode} from 'react'
import {useStyles} from "../../styles/commonStyles"

type PageContainerPropsType = {
    children: ReactNode
}

function PageContainer({children, ...props}: PageContainerPropsType) {

    const { classes } = useStyles()

    return (
        <div className={classes.pageContainer} >
            {children}
        </div>
    )
}

export default PageContainer