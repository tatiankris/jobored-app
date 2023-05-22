import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux"
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk"
import {appReducer} from "./reducers/app-reducer"
import {authReducer} from "./reducers/auth-reducer"
import {vacanciesReducer} from "./reducers/vacancies-reducer"
import {searchReducer} from "./reducers/search-reducer"
import {favoritesReducer} from "./reducers/favorites-reducer"

const rootReducer = combineReducers({
    appReducer: appReducer,
    authReducer: authReducer,
    vacanciesReducer: vacanciesReducer,
    searchReducer: searchReducer,
    favoritesReducer: favoritesReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>;