import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasks-reducer";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistsReducer
} from "./reducers/todolists-reducer";


export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}

function AppWithReducer() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Cake", isDone: true},
            {id: v1(), title: "Ice-cream", isDone: true},
            {id: v1(), title: "Chocolate", isDone: false},
        ]
    })

    const [todoLists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todoListID_1, title: "What to Bye", filter: 'all'},
        {id: todoListID_2, title: "What to Learn", filter: 'all'}
    ])

    const removeTask = (tasksID: string, todoListID: string) => {
        let action = removeTaskAC(tasksID, todoListID)
        dispatchToTasks(action)
    }
    const addTask = (title: string, todoListID: string) => {
        let action = addTaskAC(todoListID, title)
        dispatchToTasks(action)
    }
    const changeTaskStatus = (tasksID: string, isDone: boolean, todoListID: string) => {
        let action = changeTaskStatusAC(tasksID, isDone, todoListID)
        dispatchToTasks(action)
    }

    const changeTaskTitle = (tasksID: string, title: string, todoListID: string) => {
        let action = changeTaskTitleAC(tasksID, title, todoListID)
        dispatchToTasks(action)
    }


    const removeTodoList = (todoListId: string) => {
        let action = removeTodoListAC(todoListId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    const addTodoList = (title: string) => {
        let action = addTodoListAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    const changeTodoListFilter = (newFilterValue: FilterValuesType, todoListID: string) => {
        let action = changeTodoListFilterAC(todoListID, newFilterValue)
        dispatchToTodolists(action)

    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        let action = changeTodoListTitleAC(title, todoListID)
        dispatchToTodolists(action)
    }


    const todoListComponents = todoLists.length ?
        todoLists.map(tl => {
            let tasksForRender = tasks[tl.id]
            if (tl.filter === "active") {
                tasksForRender = tasks[tl.id].filter(t => !t.isDone)
            }
            if (tl.filter === "completed") {
                tasksForRender = tasks[tl.id].filter(t => t.isDone)
            }
            return (
                <Grid item key={tl.id}>
                    <Paper

                        elevation={21}
                        style={{padding: "15px"}}>
                        <TodoList
                            todoListID={tl.id}
                            tasks={tasksForRender}
                            filter={tl.filter}
                            title={tl.title}
                            addTask={addTask}
                            removeTask={removeTask}
                            changeTodoListFilter={changeTodoListFilter}
                            changeTaskStatus={changeTaskStatus}
                            removeTodoList={removeTodoList}
                            changeTodoListTitle={changeTodoListTitle}
                            changeTaskTitle={changeTaskTitle}
                        />
                    </Paper>
                </Grid>
            )
        })
        : <span>Create your first TodoList!</span>


    return (
        <div className="App">
            <AppBar position='static'>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "15px 0px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListComponents}
                </Grid>


            </Container>

            {/*<TodoList title={todoListTitle_2}/>*/}
            {/*<TodoList title={todoListTitle_3}/>*/}

        </div>
    );
}

export default AppWithReducer;
