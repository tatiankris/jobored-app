import React, {useRef} from 'react'
import style from './SearchFilters.module.css'
import {useForm} from "@mantine/form"
import {Button, Card, NumberInput, NumberInputHandlers, Select, Title} from "@mantine/core"

import { IconChevronDown, IconChevronUp, IconX } from '@tabler/icons-react'
import {CatalogueItemType, getVacanciesTC} from "../../../store/reducers/vacancies-reducer"
import {useAppDispatch} from "../../../hooks/hooks"
import {setFiltersAC} from "../../../store/reducers/search-reducer"

export type FilterValuesType = {
    catalogues: string | null | number,
    payment_from: number | '',
    payment_to: number | ''
}
type SearchFilters  = {
    catalogues: Array<CatalogueItemType>
}
function SearchFilters({catalogues}: SearchFilters) {

        const dispatch = useAppDispatch()

        const form = useForm({
            initialValues: {
                catalogues: null,
                payment_from: '',
                payment_to: ''
            } as FilterValuesType,

            validate: {

            }
        })

    const onSubmitHandler = () => {

            const {catalogues, payment_from, payment_to} = form.values

            dispatch(setFiltersAC({
                catalogues: catalogues ? +catalogues : null,
                payment_from,
                payment_to
            }))
            // dispatch(getVacanciesTC())

    }

    const onResetHandler = () => {
        form.reset()
        const {catalogues, payment_from, payment_to} = form.values
        dispatch(setFiltersAC({
            catalogues,
            payment_from,
            payment_to
        }))
    }


        const salaryToHandler = useRef<NumberInputHandlers>()
    const salaryFromHandler = useRef<NumberInputHandlers>()

    return (
        <Card className={style.searchFilters}  padding="20px" radius="md" withBorder>
            <form onSubmit={form.onSubmit(onSubmitHandler)}>
                <div className={style.group}>
                    <Title className={style.title}>Фильтры</Title>
                    <Button className={style.buttonReset} variant="subtle" type="reset" onClick={onResetHandler}
                    >Сбросить все<IconX height={16}/></Button>
                </div>
                <Title className={style.inputLabel}>Отрасль</Title>

                <Select
                    searchable
                    className={`${style.input} ${style.inputLast}`}
                    placeholder="Выберете отрасль"
                    data={catalogues.map((m) => {return {value: String(m.key), label: m.title}})}
                    rightSection={<IconChevronDown className={style.icon} size="1.2rem" />}
                    styles={{ rightSection: { pointerEvents: 'none' } }}
                    rightSectionWidth={40}
                    {...form.getInputProps('catalogues')}
                />
                <Title className={style.inputLabel}>Оклад</Title>
                <NumberInput
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
                <Button className={style.buttonSubmit} type="submit">Применить</Button>

            </form>
        </Card>
    )
}

export default SearchFilters