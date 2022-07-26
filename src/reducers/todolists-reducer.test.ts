import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";
import { addTodoListAC,
    changeTodoListFilterAC,
    ChangeTodoListFilterAT, changeTodoListTitleAC,
    ChangeTodoListTitleAT, removeTodoListAC,
    todolistsReducer
} from "./todolists-reducer";

let todolistId1: string
let todolistId2: string
let startState: Array<TodoListType>

beforeEach(()=>{
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to Bye", filter: 'all'},
        {id: todolistId2, title: "What to Learn", filter: 'all'}
    ]
})

test ('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodoListAC(todolistId2))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})


test ('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(startState, addTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test ('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = 'completed'

    const action: ChangeTodoListFilterAT = changeTodoListFilterAC(todolistId2, newFilter)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

test ('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist'

    const action: ChangeTodoListTitleAT = changeTodoListTitleAC(newTodolistTitle, todolistId2)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})