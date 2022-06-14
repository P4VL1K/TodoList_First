import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {uptime} from "os";
import {Button, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {AddCircleOutline, CheckBox, DeleteOutline, HighlightOff} from "@material-ui/icons";

type TodoListPropsType = {
    todoListID: string
    title: string,
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string,todoListID: string) => void
    removeTask: (taskID: string,todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListFilter: (filter: FilterValuesType,todoListID: string) => void
    changeTaskStatus: (tasksID: string, isDone: boolean, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
    changeTaskTitle: (tasksID: string, title: string, todoListID: string) => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {

    const tasksJSXElement = props.tasks.length ?
        props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.todoListID)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
            const changeTaskTitle = (title: string) => {
                props.changeTaskTitle(t.id, title, props.todoListID)
            }
        const taskClasses = t.isDone? 'is-done' : '';
        return (
            <ListItem
                style={{padding: "0px"}}
                key={t.id}>
                <Checkbox
                    color={'primary'}
                    size={'small'}
                    onChange={changeStatus}
                    checked={t.isDone}/>
                <EditableSpan classes={taskClasses} title={t.title} updateTitle={changeTaskTitle}/>

                {/*<span className={taskClasses}>{t.title}</span>*/}
                <IconButton
                    color={'secondary'}
                    onClick={removeTask}
                    size={"small"}>
                    <HighlightOff/>
                </IconButton>
                {/*<button onClick={removeTask}>x</button>*/}
            </ListItem>
        )
    })
        : <span>List is empty</span>

    const changeFilter = (filter: FilterValuesType) => {
        props.changeTodoListFilter(filter, props.todoListID)
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListID)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.todoListID)
    }
    const removeTodolist = () => {props.removeTodoList(props.todoListID)}

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} updateTitle={changeTodoListTitle}/>
                <IconButton
                    color={'secondary'}
                    size={'small'}
                    onClick={removeTodolist}>
                    <HighlightOff/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <List>
                {tasksJSXElement}
            </List>
            <div>
                <Button
                    size={'small'}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    disableElevation
                    variant={'contained'}
                    onClick={() => changeFilter("all")}>All</Button>
                <Button
                    size={'small'}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    disableElevation
                    variant={'contained'}
                    onClick={() => changeFilter("active")}>Active</Button>
                <Button
                    size={'small'}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    disableElevation
                    variant={'contained'}
                    onClick={() => changeFilter("completed")}>Completed</Button>
            </div>
        </div>
    )
}

export default TodoList;