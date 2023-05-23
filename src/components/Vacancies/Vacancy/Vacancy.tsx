import {Card, Group, Text, UnstyledButton, createStyles} from '@mantine/core'
import {IconMapPin, IconPointFilled} from '@tabler/icons-react'
import React from 'react'
import {ReactComponent as IconStar} from '../../../assets/no_favorite_star.svg'
import {ReactComponent as IconStarFavourite} from '../../../assets/favorite_star.svg'
import {useNavigate} from "react-router-dom"
import {JOB_SEARCH} from "../../MainComponent/MainComponent"
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks"
import {AppRootStateType} from "../../../store/store"
import {deleteFavoriteTC, setFavoriteTC} from "../../../store/reducers/favorites-reducer"
import {VacancyType} from "../../../api/vacancies-api"
import {useMediaQuery} from "@mantine/hooks"

type VacancyPropsType = {
    vacancyObject: VacancyType
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

function Vacancy({ id,variant, profession, town, typeOfWork, paymentFrom, paymentTo, currency, ...props}: VacancyPropsType) {

    const iSmallScreen = useMediaQuery('(max-width: 560px)')

    const adaptiveFontInList = iSmallScreen ? '14px' : '16px'
    const adaptiveFontInPage = iSmallScreen ? '16px' : '20px'
    const adaptiveLineHeightPage = iSmallScreen ? '20px' : '34px'

    const useStyles = createStyles(() => ({
            vacancy: {
                minHeight: variant === 'in-list' ? '137px' : '157px',
                margin: variant === 'in-list' ? '0 0 16px 0' : '0 0 20px 0',
                ":hover": {cursor: 'pointer'}
            },
            name: {
                fontSize: iSmallScreen ? '16px' : '20px',
                fontWeight: variant === 'in-list' ? 'bold' : 'bolder',
                color: variant === 'in-list' ? 'rgba(94, 150, 252, 1)' : 'rgba(35, 33, 52, 1)',
                lineHeight: variant === 'in-list' ? '24px' : adaptiveLineHeightPage,
                marginBottom: variant === 'in-list' ? '12.5px' : '16.5px'

            },
            nameGroup: {
                display: "flex",
                justifyContent: 'space-between',
                alignItems: 'flex-start '
            },
            iconStar: {
                width: '22px'
            },
            iconPoint: {
                color: '#7B7C88FF'
            },
            salary: {
                fontSize: variant === 'in-list' ? adaptiveFontInList : adaptiveFontInPage,
                fontWeight: variant === 'in-list' ? 'bold' : 'bolder',
                lineHeight: '20px'
            },
            day: {
                fontSize: variant === 'in-list' ? adaptiveFontInList : adaptiveFontInPage,
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
                fontSize: adaptiveFontInList,
                fontWeight: 'normal',
                lineHeight: '20px'
            }
        }
    ))
    const styles = useStyles().classes

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const idsFavorites = useAppSelector((state: AppRootStateType) => state.favoritesReducer.idsFavorites)
    const isFavourite = idsFavorites ? idsFavorites.find((m) => m === id) : null

    const handleNavigate = () => {
        navigate(JOB_SEARCH + `/${id}`)
    }

    const handleDeleteFavorite = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        dispatch(deleteFavoriteTC(id))
    }

    const handleSetFavorite = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        dispatch(setFavoriteTC(props.vacancyObject))
    }

    const getPayment = () => {
        if (paymentFrom > 0 && paymentTo > 0 && paymentTo !== paymentFrom) {
            return `${paymentFrom + ' - ' + paymentTo}`
        } else if (paymentFrom < 0 && paymentTo < 0) {
            return ''
        } else if (paymentTo === paymentFrom) {
            return `${paymentFrom}`
        } else {
            return `${paymentFrom > 0 ? 'от ' + paymentFrom : ''} ${paymentTo > 0 ? 'до ' + paymentTo : ''}`
        }
    }

    return (
        <Card data-elem={`vacancy-${id}`} padding={'24px'} radius={'12px'} className={styles.vacancy}
              onClick={handleNavigate}>
            <div className={styles.nameGroup}>
                <Text className={styles.name}>
                    {profession}
                </Text>
                <UnstyledButton data-elem={`${id}-shortlist-button`}
                                onClick={isFavourite ? handleDeleteFavorite : handleSetFavorite}
                                className={styles.iconStar}>
                    {isFavourite ? <IconStarFavourite/> : <IconStar/>}
                </UnstyledButton>
            </div>
            {(paymentFrom + paymentTo) > 0
                ? <Group className={styles.groupInfo} spacing={12}>
                    <Text className={styles.salary}>{`з/п ${getPayment()} ${currency}`}</Text>
                    <IconPointFilled className={styles.iconPoint} size={'1rem'}/>
                    <Text className={styles.day}>{typeOfWork}</Text>
                </Group>
                : <Group className={styles.groupInfo} spacing={12}>
                    <Text className={styles.day}>{typeOfWork}</Text>
                </Group>
            }
            <Text className={styles.location}><IconMapPin className={styles.iconMap} size={'1.4rem'}/>{town}</Text>
        </Card>
    )
}

export default Vacancy