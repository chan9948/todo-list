import React from 'react';
import { ListItemButton, ListItemText, ListItem, IconButton } from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoItem = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <ListItemButton
            onClick={(event) => {
                setIsOpen(!isOpen);
            }}
        >
            <ListItem
                secondaryAction={
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            props.methods.deleteItem(props.item.id);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                }
            >
                {
                    isOpen
                        ? <ListItemText
                            primary={
                                <input
                                    value={props.item.title}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => props.methods.changeItem(props.item.id, "title", e.target.value)}
                                ></input>
                            }
                            secondary={
                                <input
                                    value={props.item.content}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => props.methods.changeItem(props.item.id, "content", e.target.value)}
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
