import React, {useRef} from 'react'
import style from './SearchFilters.module.css'
import {useForm} from "@mantine/form"
import {Button, Card, NumberInput, NumberInputHandlers, Select, Title, UnstyledButton} from "@mantine/core"
import { IconChevronDown, IconChevronUp, IconX } from '@tabler/icons-react'
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks"
import {resetFiltersAC, setFiltersAC} from "../../../store/reducers/search-reducer"
import {AppRootStateType} from "../../../store/store"
import { CatalogueItemType } from '../../../api/vacancies-api'
import { useMediaQuery } from '@mantine/hooks'

export type FilterValuesType = {
    catalogues: null | number,
    payment_from: number | '',
    payment_to: number | ''
}
type SearchFiltersPropsType  = {
    cataloguesData: Array<CatalogueItemType>
}
function SearchFilters({cataloguesData, ...props}: SearchFiltersPropsType) {

    const dispatch = useAppDispatch()
    const iSmallScreen = useMediaQuery('(max-width: 560px)')
    const {catalogues, payment_from, payment_to} = useAppSelector((state: AppRootStateType) => state.searchReducer)

    const form = useForm({
        initialValues: {
            catalogues: catalogues,
            payment_from: payment_from,
            payment_to: payment_to
        } as FilterValuesType,

        validate: {}
    })

    const onSubmitHandler = () => {

        const {catalogues, payment_from, payment_to} = form.values

        dispatch(setFiltersAC({
            catalogues: catalogues ? +catalogues : null,
            payment_from,
            payment_to
        }))
    }

    const onResetHandler = () => {
        form.reset()
        dispatch(resetFiltersAC())
    }

    const salaryToHandler = useRef<NumberInputHandlers>()
    const salaryFromHandler = useRef<NumberInputHandlers>()

    return (
        <Card className={style.searchFilters}  padding="20px" radius="md" withBorder>
            <form onSubmit={form.onSubmit(onSubmitHandler)}>
                <div className={style.group}>
                    <Title className={style.title}>Фильтры</Title>
                    <UnstyledButton className={style.buttonReset} variant="subtle" type="reset" onClick={onResetHandler}
                    >Сбросить все<IconX className={style.iconX} height={16}/></UnstyledButton>
                </div>
                    <Title className={style.inputLabel}>Отрасль</Title>

                <Select
                    size={iSmallScreen ? 'sm' : 'md'}
                    data-elem={"industry-select"}
                    searchable
                    className={`${style.input} ${style.inputLast}`}
                    placeholder="Выберете отрасль"
                    data={cataloguesData.map((m) => {return {value: String(m.key), label: m.title}})}
                    rightSection={<IconChevronDown className={style.icon} size="1.2rem" />}
                    styles={{ rightSection: { pointerEvents: 'none' } }}
                    rightSectionWidth={40}
                    {...form.getInputProps('catalogues')}
                />
                <Title className={style.inputLabel}>Оклад</Title>
                <div className={style.smallScreenGroup}>
                <NumberInput
                    size={iSmallScreen ? 'sm' : 'md'}
                    data-elem={"salary-from-input"}
                    handlersRef={salaryFromHandler}
                    rightSection={<div className={style.numberInputIcons}>
                        <IconChevronUp className={style.icon} size="0.8rem"
                                       onClick={()=>{salaryFromHandler.current?.increment()}} />
                        <IconChevronDown className={style.icon} size="0.8rem"
                                         onClick={()=>{salaryFromHandler.current?.decrement()}}/></div>}
                    className={`${style.input} ${style.inputFirst}`}
                    placeholder="От"
                    max={2000000}
                    min={0}
                    step={100}
                    {...form.getInputProps('payment_from')}
                />
                <NumberInput
                    size={iSmallScreen ? 'sm' : 'md'}
                    data-elem={"salary-to-input"}
                    handlersRef={salaryToHandler}
                    rightSection={<div className={style.numberInputIcons}>
                        <IconChevronUp className={style.icon} size="0.8rem"
                                       onClick={()=>{salaryToHandler.current?.increment()}} />
                        <IconChevronDown className={style.icon} size="0.8rem"
                                         onClick={()=>{salaryToHandler.current?.decrement()}}/></div>}
                    className={`${style.input} ${style.inputLast}`}
                    placeholder="До"
                    max={2000000}
                    min={0}
                    step={100}
                    {...form.getInputProps('payment_to')}
                />
                <Button data-elem={"search-button"} className={style.buttonSubmit} type="submit">Применить</Button>

                   </div>
            </form>
        </Card>
    )
}

export default SearchFilters