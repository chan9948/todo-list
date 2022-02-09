import React from 'react';
import { ListItemButton, ListItemText, ListItem, IconButton } from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import ReplayIcon from '@mui/icons-material/Replay';

const TodoItem = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const onInputEnterKey = (event) => {
        if (event.code === "Enter") {
            setIsOpen(!isOpen);
        }
    }
    return (
        <ListItemButton
            onClick={(event) => {
                setIsOpen(!isOpen);
            }}
        >
            <ListItem
                sx={{
                    backGroundColor: "red"
                }}
                secondaryAction={
                    props.currentPanel === "todo"
                        ? <>
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    props.methods.changeItem(props.item.id, "doneDate", Date().toLocaleString());
                                }}
                            >
                                <DoneIcon />
                            </IconButton>
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    props.methods.changeItem(props.item.id, "deleteDate", Date().toLocaleString());
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </>
                        : <>
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    props.methods.redoItem(props.item.id);
                                }}
                            >
                                <ReplayIcon />
                            </IconButton>
                        </>
                }
            >
                {
                    isOpen
                        ? <ListItemText
                            primary={
                                <input
                                    value={props.item.title}
                                    onClick={e => e.stopPropagation()}
                                    onChange={e => props.methods.changeItem(props.item.id, "title", e.target.value)}
                                    onKeyPress={e => onInputEnterKey(e)}
                                ></input>
                            }
                            secondary={
                                <input
                                    value={props.item.content}
                                    onClick={e => e.stopPropagation()}
                                    onChange={e => props.methods.changeItem(props.item.id, "content", e.target.value)}
                                    onKeyPress={e => onInputEnterKey(e)}
                                ></input>}
                        >
                        </ListItemText>
                        : <ListItemText
                            primary={props.item.title}
                            secondary={props.item.content}
                        ></ListItemText>
                }
            </ListItem>
        </ListItemButton>
    );
};

export default TodoItem;
