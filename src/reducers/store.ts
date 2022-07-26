import { tasksReducer } from './tasks-reducer'
import { todolistsReducer } from './todolists-reducer'
import { combineReducers, createStore } from 'redux'

// объедин€€ reducer-ы с помощью combineReducers,
// мы задаЄм структуру нашего единственного объекта-состо€ни€
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// непосредственно создаЄм store
export const store = createStore(rootReducer)
// определить автоматически тип всего объекта состо€ни€
export type AppRootStateType = ReturnType<typeof rootReducer>
// а это, чтобы можно было в консоли браузера обращатьс€ к store в любой момент
// @ts-ignore
window.store = store
