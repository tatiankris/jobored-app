import {Button, Input } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import React from 'react'
import style from './SearchField.module.css'

function SearchField() {

    return (
            <Input className={style.searchField} size={'md'} radius={8}
                   placeholder={'Введите название вакансии'}
                   icon={<IconSearch size={'1rem'}/>}
                   rightSection={<Button className={style.buttonSearch}>Поиск</Button>}
                   rightSectionWidth={'100px'}
            />

    )
}

export default SearchField