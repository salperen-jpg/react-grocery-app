import React, { useState, useEffect } from 'react';
import './App.css';
import Alert from './Alert';
import Grocery from './Grocery';

const getLocalStorage = () => {
  let itemList = localStorage.getItem('list');
  if (itemList) {
    return JSON.parse(localStorage.getItem('itemList'));
  } else {
    return [];
  }
};

function App() {
  const [item, setItem] = useState('');
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const [itemList, setItemList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);

  useEffect(() => {
    localStorage.setItem('itemList', JSON.stringify(itemList));
  }, [itemList]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!item) {
      showAlert(true, 'please enter smt', 'danger');
    } else if (isEditing && item) {
      setItemList(
        itemList.map((singleItem) => {
          if (singleItem.id === editID) {
            return { ...singleItem, title: item };
          }
          return singleItem;
        })
      );
      setItem('');
      setIsEditing(false);
      setEditID(null);
      showAlert(true, 'Value changed', 'success');
    } else {
      showAlert(true, 'Item added', 'success');
      const newItem = { id: Math.random(), title: item };
      setItemList([...itemList, newItem]);
      setItem('');
    }
  };
  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, msg, type });
  };

  const clearItemList = () => {
    showAlert(true, 'All items deleted', 'danger');
    setItemList([]);
  };

  const removeItems = (id) => {
    showAlert(true, 'Items deleted', 'danger');
    setItemList(itemList.filter((thing) => id !== thing.id));
  };

  const editItem = (id) => {
    const editingItem = itemList.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setItem(editingItem.title);
  };

  return (
    <>
      <div className='container'>
        <div className='form-section'>
          <form className='my-form' onSubmit={submitHandler}>
            {alert.show && (
              <Alert {...alert} itemList={itemList} removeAlert={showAlert} />
            )}
            <h1>Grocery Store</h1>
            <div className='form-elements'>
              <input
                value={item}
                type='text'
                onChange={(e) => {
                  setItem(e.target.value);
                }}
              />
              <button type='submit' className='primary-btn'>
                {isEditing ? 'Edit' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
        {itemList.length > 0 && (
          <div className='grocery-list'>
            <Grocery
              groceries={itemList}
              removeItems={removeItems}
              editItem={editItem}
            />
            <div className='clear-btn-container'>
              <button onClick={clearItemList} className='clear-btn'>
                Clear items
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
