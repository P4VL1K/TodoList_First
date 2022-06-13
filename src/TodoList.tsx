import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {uptime} from "os";

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
            <li key={t.id}>
                <input
                    onChange={changeStatus}
                    type="checkbox"
                    checked={t.isDone}/>
                <EditableSpan classes={taskClasses} title={t.title} updateTitle={changeTaskTitle}/>
                {/*<span className={taskClasses}>{t.title}</span>*/}
                <button onClick={removeTask}>x</button>
            </li>
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
    const allBtnClasses = props.filter === "all" ? "active-filter" : "";
    const activeBtnClasses = props.filter === "active" ? "active-filter" : "";
    const completedBtnClasses = props.filter === "completed" ? "active-filter" : "";
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} updateTitle={changeTodoListTitle}/>
                <button onClick={() => {props.removeTodoList(props.todoListID)}}>x</button>
            </h3>
            <AddItemForm addItem={addTask} />
            <ul>
                {tasksJSXElement}
            </ul>
            <div>
                <button className={allBtnClasses}
                    onClick={() => changeFilter("all")}>All</button>
                <button className={activeBtnClasses}
                    onClick={() => changeFilter("active")}>Active</button>
                <button className={completedBtnClasses}
                    onClick={() => changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;