import React from 'react';

const UserCartContext = React.createContext({
  userCart: {},
  totalProducts: 0,
  updateUserCart: (cart) => {},
});

export default UserCartContext;
