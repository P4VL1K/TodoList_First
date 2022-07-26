import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from "./reducers/todolists-reducer";
import {AppRootStateType} from "./reducers/store";
import {useDispatch, useSelector} from "react-redux";


export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}

function AppWithRedux() {

    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)

    let dispatch = useDispatch()

    const removeTask = (tasksID: string, todoListID: string) => {
        let action = removeTaskAC(tasksID, todoListID)
        dispatch(action)
    }
    const addTask = (title: string, todoListID: string) => {
        let action = addTaskAC(todoListID, title)
        dispatch(action)
    }
    const changeTaskStatus = (tasksID: string, isDone: boolean, todoListID: string) => {
        let action = changeTaskStatusAC(tasksID, isDone, todoListID)
        dispatch(action)
    }

    const changeTaskTitle = (tasksID: string, title: string, todoListID: string) => {
        let action = changeTaskTitleAC(tasksID, title, todoListID)
        dispatch(action)
    }


    const removeTodoList = (todoListId: string) => {
        let action = removeTodoListAC(todoListId)
        dispatch(action)
    }
    const addTodoList = (title: string) => {
        let action = addTodoListAC(title)
        dispatch(action)
    }
    const changeTodoListFilter = (newFilterValue: FilterValuesType, todoListID: string) => {
        let action = changeTodoListFilterAC(todoListID, newFilterValue)
        dispatch(action)

    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        let action = changeTodoListTitleAC(title, todoListID)
        dispatch(action)
    }


    const todoListComponents = todolists.length ?
        todolists.map(tl => {
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

export default AppWithRedux;
