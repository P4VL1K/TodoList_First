import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodoListTitleAT = {
    type:'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}
export type ActionPropsType = RemoveTodolistAT | AddTodoListAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT

let initialState: Array<TodoListType> = []

export const todolistsReducer = (state= initialState, action: ActionPropsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodoListID = v1()
            const newTodoList: TodoListType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }
            return [...state, newTodoList]
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        default:
            return state
    }
}


export const removeTodoListAC = (id:string): RemoveTodolistAT => ({type: 'REMOVE-TODOLIST', id})
export const changeTodoListFilterAC = (id:string, filter: FilterValuesType): ChangeTodoListFilterAT => ({type: 'CHANGE-TODOLIST-FILTER', id, filter})
export const addTodoListAC = (title: string): AddTodoListAT => ({type: 'ADD-TODOLIST', title, todolistId: v1()})
export const changeTodoListTitleAC = (title: string, id: string): ChangeTodoListTitleAT => ({type: 'CHANGE-TODOLIST-TITLE', title, id})