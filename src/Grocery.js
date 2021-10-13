import React from 'react';

const Grocery = ({ groceries, removeItems, editItem }) => {
  return (
    <div>
      {groceries.map((grocery) => {
        const { id, title } = grocery;
        return (
          <div key={id} className='grocery-item'>
            <p>{title}</p>
            <div className='buttons'>
              <button
                type='button'
                className='edit-btn'
                onClick={() => editItem(id)}
              >
                <i class='fas fa-edit'></i>
              </button>
              <button
                type='button'
                className='delete-btn'
                onClick={() => removeItems(id)}
              >
                <i class='fas fa-trash-alt'></i>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Grocery;
