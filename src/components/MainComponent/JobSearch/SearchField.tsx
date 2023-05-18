import {Button, Input } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import React, {useState} from 'react'
import style from './SearchField.module.css'
import {useAppDispatch} from "../../../hooks/hooks"
import {getVacanciesTC} from "../../../store/reducers/vacancies-reducer"
import {setKeywordAC} from "../../../store/reducers/search-reducer"

function SearchField() {

    const dispatch = useAppDispatch()
    const [value, setValue] = useState('')

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value.trim())
    }
    const onSearchHandler = () => {
        dispatch(setKeywordAC(value))
        dispatch(getVacanciesTC())
    }
    const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && onSearchHandler()
    }

    return (
            <Input className={style.searchField} size={'md'} radius={8}
                   placeholder={'Введите название вакансии'}
                   icon={<IconSearch size={'1rem'}/>}
                   rightSection={<Button onClick={onSearchHandler} className={style.buttonSearch}>Поиск</Button>}
                   rightSectionWidth={'100px'}
                   value={value}
                   onChange={onChangeHandler}
                   onKeyPress={keyPressHandler}
            />

    )
}

export default SearchField