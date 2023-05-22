import {Button, Input } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import React, {useState} from 'react'
import style from './SearchField.module.css'
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks"
import {setKeywordAC} from "../../../store/reducers/search-reducer"
import {AppRootStateType} from "../../../store/store"
import {useMediaQuery} from "@mantine/hooks"

function SearchField() {

    const dispatch = useAppDispatch()
    const keyword = useAppSelector((state: AppRootStateType) => state.searchReducer.keyword)
    const iSmallScreen = useMediaQuery('(max-width: 560px)')
    const iSmallerScreen = useMediaQuery('(max-width: 402px)')

    const [value, setValue] = useState(keyword)

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.trim()
        setValue(value)
        if (value === '') {
            dispatch(setKeywordAC(value))
        }
    }
    const onSearchHandler = () => {
        dispatch(setKeywordAC(value))
    }
    const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && onSearchHandler()
    }

    return (
            <Input size={iSmallScreen ? 'md' : 'lg'} data-elem={"search-input"}
                   className={style.searchField}  radius={'md'}
                   placeholder={'Введите название вакансии'}
                   icon={<IconSearch size={iSmallScreen ? '1rem' : '1.5rem'} />}
                   rightSection={!iSmallerScreen && <Button data-elem={"search-button"} onClick={onSearchHandler} className={style.buttonSearch}>Поиск</Button>}
                   rightSectionWidth={'100px'}
                   value={value}
                   onChange={onChangeHandler}
                   onKeyPress={keyPressHandler}
            />

    )
}

export default SearchField