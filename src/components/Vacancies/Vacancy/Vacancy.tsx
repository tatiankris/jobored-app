import {Card, Group, Text, createStyles, em} from '@mantine/core'
import { IconMapPin, IconPointFilled, IconStar } from '@tabler/icons-react'
import React from 'react'
import style from './Vacancy.module.css'
import {useNavigate} from "react-router-dom"
import {JOB_SEARCH} from "../../MainComponent/MainComponent"

type VacancyType = {
    id: number
    variant: 'in-list' | 'in-page'
    profession: string
    firm: string
    typeOfWork: string
    paymentFrom: number
    paymentTo: number
    currency: string
    town: string
}
function Vacancy({ id,variant, profession, town, typeOfWork, paymentFrom, paymentTo, currency}: VacancyType) {

    const useStyles = createStyles((theme) => ({
            vacancy: {
                height: variant === 'in-list' ? '137px' : '157px',
                margin: variant === 'in-list' ? '16px 0' : '0 0 20px 0'
            },
            name: {
                fontSize: '20px',
                fontWeight: variant === 'in-list' ? 'bold' : 'bolder',
                color: variant === 'in-list' ? 'rgba(94, 150, 252, 1)' : 'rgba(35, 33, 52, 1)',
                lineHeight: variant === 'in-list' ? '24px' : '34px',
                marginBottom: variant === 'in-list' ? '12.5px' : '16.5px'
            },
            iconStar: {
                float: 'right',
                width: '22px'
            },
            iconPoint: {
                color: '#7B7C88FF'
            },

            salary: {
                fontSize: variant === 'in-list' ? '16px' : '20px',
                fontWeight: variant === 'in-list' ? 'bold' : 'bolder',
                lineHeight: '20px'

            },
            day: {
                fontSize: variant === 'in-list' ? '16px' : '20px',
                fontWeight: 'normal',
                lineHeight: '20px'
            },
            groupInfo: {
                marginBottom: variant === 'in-list' ? '13px' : '16.5px'
            },
            iconMap: {
                color: 'rgba(172, 173, 185, 1)',
                float: 'left',
                marginRight: '11.33px'
            },
            location: {
                fontSize:  '16px',
                fontWeight: 'normal',
                lineHeight: '20px'
            }


        }
    ))
    const styles = useStyles().classes

    const navigate = useNavigate()

    return (
        <Card onClick={() => {
          navigate(JOB_SEARCH + `/${id}`)}} padding={'24px'} radius={'12px'} className={styles.vacancy}>
        <Text className={styles.name}>{profession}<IconStar className={styles.iconStar}/></Text>
           {
               (paymentFrom + paymentTo) > 0
                   ? <Group className={styles.groupInfo} spacing={12}>
                       <Text className={styles.salary}>{`з/п ${paymentFrom > 0 ? 'от ' + paymentFrom : ''} ${paymentTo > 0 ? 'до ' + paymentTo : ''} ${currency}`}</Text>
                       <IconPointFilled className={styles.iconPoint} size={'1rem'} />
                       <Text className={styles.day}>{typeOfWork}</Text>
                   </Group>
                   : <Group className={styles.groupInfo} spacing={12}>
                       <Text className={styles.day}>{typeOfWork}</Text>
                   </Group>
           }
            <Text className={styles.location}><IconMapPin className={styles.iconMap} size={'1.4rem'} />{town}</Text>
        </Card>
    )
}

export default Vacancy