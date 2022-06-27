import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}

function App() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [tasks, setTasks] = useState<TasksStateType>({
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

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to Bye", filter: 'all'},
        {id: todoListID_2, title: "What to Learn", filter: 'all'}
    ])

    const removeTask = (tasksID: string, todoListID: string) => {
        // const currentTodoListTasks = tasks[todoListID]
        //  const updatedTasks = currentTodoListTasks.filter( t => t.id !== tasksID)
        //  tasks[todoListID] = updatedTasks
        //  setTasks({...tasks})
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== tasksID)})
    }
    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {
            id: v1(), title: title, isDone: false
        }
        // const currentTodoListTasks = tasks[todoListID]
        // const updatedTasks = [newTask,...currentTodoListTasks]
        // setTasks({...tasks, [todoListID]: updatedTasks})
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }
    const changeTaskStatus = (tasksID: string, isDone: boolean, todoListID: string) => {
        // const currentTodoListTasks: Array<TaskType> = tasks[todoListID]
        //  const updatedTasks: Array<TaskType> = currentTodoListTasks.map(t => t.id === tasksID ? {...t, isDone} : t)
        //  setTasks({...tasks})
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === tasksID ? {...t, isDone: isDone} : t)})
    }
    const changeTaskTitle = (tasksID: string, title: string, todoListID: string) => {
        setTasks({
            ...tasks, [todoListID]: tasks[todoListID].map(t => t.id === tasksID ? {
                ...t,
                title: title
            } : t)
        })
    }


    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(t => t.id !== todoListId))
        delete tasks[todoListId]
    }
    const addTodoList = (title: string) => {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }
    const changeTodoListFilter = (newFilterValue: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: newFilterValue} : tl))
    }
    const changeTodoListTitle = (title: string, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title: title} : tl))
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

export default App;
