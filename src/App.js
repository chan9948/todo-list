import './App.css';
import { List, ListSubheader } from '@mui/material';
import { useState, useEffect } from 'react';
import TodoItem from './TodoItem'

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

  return (
    <div className="App">
      <button onClick={() => { addItem() }}>add new item</button>
      <List>
        <ListSubheader>to-do list</ListSubheader>
        {
          items.map(item => (
            <TodoItem
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
          ))
        }
      </List>
    </div>
  );
}

export default App;
