import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddCircleOutline} from "@material-ui/icons";



type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const addItem = () => {
        const itemTitle = title.trim()
        if (itemTitle) {
            props.addItem(itemTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const itemTitle = e.currentTarget.value.trim()
        setTitle(e.currentTarget.value)
        if(error && itemTitle)setError(false)
        if(!error && !itemTitle)setError(true)
    }
    const errorInputStyle = error ? {border: "2px solid red", outline: "none"} : undefined
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addItem()
    return (
        <div>
            <TextField
                // style={errorInputStyle}
                variant={'outlined'}
                label={'title'}
                size={'small'}
                color={'primary'}
                value={title}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddTask}
                error={error}
                helperText={error && "Title is required!"}
            />
            <IconButton
                onClick={addItem}
                color={'primary'}>
                <AddCircleOutline/>
            </IconButton>
            {/*{error && <div style={{color: "red", fontWeight: "bold"}}>Title is required!</div>}*/}
        </div>
    );
};

export default AddItemForm;