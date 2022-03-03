import React from 'react';

const UserCartContext = React.createContext({
   userCart: {},
   addToUserCart: (cart) => {}
});

export default UserCartContext;