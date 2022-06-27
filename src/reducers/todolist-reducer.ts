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


export const todolistsReducer = (todolists: Array<TodoListType>, action: ActionPropsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodoListID = v1()
            const newTodoList: TodoListType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }
            return [...todolists, newTodoList]
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        default:
            return todolists
    }
}


export const RemoveTodoListAC = (id:string): RemoveTodolistAT => ({type: 'REMOVE-TODOLIST', id})
export const ChangeTodoListFilterAC = (id:string, filter: FilterValuesType): ChangeTodoListFilterAT => ({type: 'CHANGE-TODOLIST-FILTER', id, filter})
export const AddTodoListAC = (title: string): AddTodoListAT => ({type: 'ADD-TODOLIST', title, todolistId: v1()})
export const ChangeTodoListTitleAC = (title: string, id: string): ChangeTodoListTitleAT => ({type: 'CHANGE-TODOLIST-TITLE', title, id})