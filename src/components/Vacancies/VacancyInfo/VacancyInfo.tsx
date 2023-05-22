import {Card, TypographyStylesProvider} from '@mantine/core'
import React from 'react'
import style from './VacancyInfo.module.css'

type VacancyInfoPropsType = {
    text: string
}
function VacancyInfo({text, ...props}: VacancyInfoPropsType) {

    return (
        <Card padding={'24px'} radius={'12px'} className={style.vacancyInfo}>
            <TypographyStylesProvider className={style.typographyStyles}>
                <div dangerouslySetInnerHTML={{__html: text}}/>
            </TypographyStylesProvider>
        </Card>
    )
}

export default VacancyInfo