import './App.css';
import { Card, List, ListSubheader, CardHeader, Avatar, IconButton } from '@mui/material';
import { useState, useEffect } from 'react';
import TodoItem from './TodoItem'
import AddIcon from '@mui/icons-material/Add';

function App() {
  const lsItemsName = "todo-list_items";
  const [items, setItems] = useState(
    () => {
      const ls = localStorage.getItem(lsItemsName);
      let lsItems = ls ? JSON.parse(ls) : [];
      return lsItems;
    }
  );

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

  const addItem = () => {
    let id = items.length;
    while (items.some(item => { return item.id === id })) {
      id++;
    }
    const editedItems = [
      ...items,
      {
        id: id,
        title: "TITLE",
        content: "CONTENT",
        deleted: false,
        completed: false,
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

  const getTodoCount = () => {
    return items.filter((item) => {
      return !(item.deleted || item.completed)
    }).length
  }

  const getDoneCount = () => {
    return items.filter((item) => {
      return item.completed
    }).length
  }

  const getDeletedCount = () => {
    return items.filter((item) => {
      return item.deleted
    }).length
  }

  return (
    <Card style={{ textAlign: "center" }}>
      <CardHeader

        title={
          <>
            TODO LIST
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                addItem();
              }}
            >
              <AddIcon />
            </IconButton>
          </>
        }
        subheader=""
      />
      <List>
        <ListSubheader>todo: {getTodoCount()} | done: {getDoneCount()} | deleted: {getDeletedCount()}</ListSubheader>
        {
          items.map(item => (
            !(item.deleted || item.completed)
              ? <TodoItem
                key={item.id}
                item={item}
                methods={
                  {
                    changeItem: changeItem,
                    addItem: addItem,
                    deleteItem: deleteItem,
                  }
                }
              >
              </TodoItem>
              : <></>
          ))
        }
      </List>
    </Card>
  );
}

export default App;
