import './App.css';
import { Card, List, ListSubheader, CardHeader, Avatar, IconButton, Button, CardMedia, CardContent, Collapse, ListItem } from '@mui/material';
import { useState, useEffect } from 'react';
import TodoItem from './TodoItem'
import AddIcon from '@mui/icons-material/Add';

function TodoList() {
  //const
  const lsItemsName = "todo-list_items";

  //state
  const [items, setItems] = useState(
    () => {
      const ls = localStorage.getItem(lsItemsName);
      let lsItems = ls ? JSON.parse(ls) : [];
      return lsItems;
    }
  );
  const [currentPanel, setCurrentPanel] = useState("todo");
  const [isHiddenPanelOpen, setIsHiddenPanelOpen] = useState(false);

  //effect
  useEffect(() => {
    localStorage.setItem(lsItemsName, JSON.stringify(items));
  }, [items]);

  const changeItem = (id, key, value) => {
    const editedItems = items.map(item => {
      if (id === item.id) {
        return { ...item, [key]: value }
      }
      return item;
    });
    setItems(editedItems);
  }

  //methods
  const addItem = () => {
    let id = items.length;
    while (items.some(item => { return item.id === id })) {
      id++;
    }
    const editedItems = [
      ...items,
      {
        id: id,
        title: "ITEM " + (++id),
        content: "DETAILS",
        doneDate: undefined,
        deleteDate: undefined,
        createdDate: Date().toLocaleString(),
      }
    ];
    setItems(editedItems);
  }

  const deleteItem = (id) => {
    const editedItems = items.filter(item => {
      return id !== item.id;
    });
    setItems(editedItems);
  }

  const redoItem = (id) => {
    const editedItems = items.map(item => {
      if (id === item.id) {
        return { ...item, doneDate: undefined, deleteDate: undefined }
      }
      return item;
    });
    setItems(editedItems);
  }

  const reset = () => {
    localStorage.clear(lsItemsName);
    setItems([]);
  }

  const getValidItems = (key) => {
    let newItems = JSON.parse(JSON.stringify(items));
    switch (key) {
      case "todo":
        newItems = newItems.filter((item) => {
          return !(item.doneDate || item.deleteDate);
        });
        break;
      case "done":
        newItems = newItems.filter((item) => {
          return (item.doneDate && !item.deleteDate) || (item.deleteDate && new Date(item.doneDate) > new Date(item.deleteDate));
        });
        newItems.sort((a, b) => {
          return new Date(b.doneDate) - new Date(a.doneDate);
        });
        break;
      case "deleted":
        newItems = newItems.filter((item) => {
          return (item.deleteDate && !item.doneDate) || (item.doneDate && new Date(item.deleteDate) > new Date(item.doneDate));
        });
        newItems.sort((a, b) => {
          return new Date(b.deleteDate) - new Date(a.deleteDate);
        });
        break;

      default:
        newItems = [];
        break;
    }
    return newItems;
  }

  return (
    <Card style={{ textAlign: "center" }}>
      <CardHeader
        title={
          <>
            <span
              onContextMenu={
                (e) => {
                  setIsHiddenPanelOpen(!isHiddenPanelOpen);
                  e.preventDefault();
                }
              }
            >
              <Collapse in={currentPanel === "todo"}>TODO LIST</Collapse>
              <Collapse in={currentPanel === "done"}>DONE LIST</Collapse>
              <Collapse in={currentPanel === "deleted"}>DELETED LIST</Collapse>
            </span>
          </>
        }
        subheader=""
      />
      <Collapse in={isHiddenPanelOpen}>
        <CardContent>
          <div><code>all data is stored in localstorage</code></div>
          <div><code>reset data might help when encountering bug</code></div>
          <button onClick={
            (e) => {
              if (window.confirm("Are you sure about it?")) {
                reset();
                setIsHiddenPanelOpen(!isHiddenPanelOpen);
              }
            }
          }
          >
            reset data
          </button>
        </CardContent>
      </Collapse >
      <CardContent>
        <List>
          <ListSubheader>
            <Button
              sx={{ m: "0 10px" }}
              variant={currentPanel === "todo" ? "contained" : "outlined"}
              onClick={() => { setCurrentPanel("todo") }}
            >
              todo: {getValidItems("todo").length}
            </Button>
            <Button
              sx={{ m: "0 10px" }}
              variant={currentPanel === "done" ? "contained" : "outlined"}
              onClick={() => { setCurrentPanel("done") }}
            >
              done: {getValidItems("done").length}
            </Button>
            <Button
              sx={{ m: "0 10px" }}
              variant={currentPanel === "deleted" ? "contained" : "outlined"}
              onClick={() => { setCurrentPanel("deleted") }}
            >
              deleted: {getValidItems("deleted").length}
            </Button>
          </ListSubheader>
          <Collapse in={currentPanel === "todo"}>
            <ListItem sx={{ justifyContent: 'center' }}>
              <IconButton
                onClick={
                  (e) => {
                    e.stopPropagation();
                    addItem();
                  }
                }
              >
                <AddIcon />
              </IconButton>
            </ListItem>
          </Collapse>
          {
            getValidItems(currentPanel).map(item => (
              <TodoItem
                key={item.id}
                item={item}
                methods={
                  {
                    changeItem: changeItem,
                    addItem: addItem,
                    deleteItem: deleteItem,
                    redoItem: redoItem,
                  }
                }
                currentPanel={currentPanel}
              >
              </TodoItem>
            ))
          }
        </List>
      </CardContent>
    </Card>
  );
}

export default TodoList;
