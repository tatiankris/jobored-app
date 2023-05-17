import React, {useRef} from 'react'
import style from './SearchFilters.module.css'
import {useForm} from "@mantine/form"
import {Button, Card, NumberInput, NumberInputHandlers, Select, Title} from "@mantine/core"

import { IconChevronDown, IconChevronUp, IconX } from '@tabler/icons-react'

export type FilterValuesType = {
    industry: string | null,
    salaryFrom: number | '',
    salaryTo: number | ''
}

function SearchFilters() {


        const form = useForm({
            initialValues: {
                industry: null,
                salaryFrom: '',
                salaryTo: ''
            } as FilterValuesType,

            validate: {

            }
        })
    const salaryToHandler = useRef<NumberInputHandlers>()
    const salaryFromHandler = useRef<NumberInputHandlers>()

    return (
        <Card className={style.searchFilters}  padding="20px" radius="md" withBorder>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <div className={style.group}>
                    <Title className={style.title}>Фильтры</Title>
                    <Button className={style.buttonReset} variant="subtle" type="reset" onClick={() => form.reset()}
                    >Сбросить все<IconX height={16}/></Button>
                </div>
                <Title className={style.inputLabel}>Отрасль</Title>

                <Select
                    searchable
                    className={`${style.input} ${style.inputLast}`}
                    placeholder="Выберете отрасль"
                    data={[
                        { value: 'react', label: 'React' },
                        { value: 'ng', label: 'Angular' },
                        { value: 'svelte', label: 'Svelte' },
                        { value: 'vue', label: 'Vue' }
                    ]}
                    rightSection={<IconChevronDown className={style.icon} size="1.2rem" />}
                    styles={{ rightSection: { pointerEvents: 'none' } }}
                    rightSectionWidth={40}
                    {...form.getInputProps('industry')}
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
                    {...form.getInputProps('salaryFrom')}
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
                    {...form.getInputProps('salaryTo')}
                />
                <Button className={style.buttonSubmit} type="submit">Применить</Button>

            </form>
        </Card>
    )
}

export default SearchFilters