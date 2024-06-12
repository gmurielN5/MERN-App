import React, { createContext, useState, useReducer } from 'react';

import { dataFetchReducer } from '../Reducers/reducer';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const initialState = {
    Loading: false,
    isError: null,
    user: null,
    users: [],
    articles: [],
    topics: [],
    message: [],
  };

  const [store, dispatch] = useReducer(
    dataFetchReducer,
    initialState
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        dispatch,
        store,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
