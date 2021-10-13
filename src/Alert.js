import React, { useEffect } from 'react';

const Alert = ({ type, msg, removeAlert, itemList }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [itemList]);

  return <p className={`alert ${type}`}>{msg}</p>;
};

export default Alert;
