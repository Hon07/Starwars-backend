import React, { useState, useEffect } from "react";
import getState from "./flux.js";

export const MyContext = React.createContext(null); // Rename Context to MyContext

export const injectContext = (PassedComponent) => {
  const StoreWrapper = (props) => {
    const [state, setState] = useState(
      getState({
        getStore: () => state.store,
        getActions: () => state.actions,
        setStore: (updatedStore) =>
          setState({
            store: Object.assign(state.store, updatedStore),
            actions: { ...state.actions },
          }),
      })
    );

    useEffect(() => {}, []);

    return (
      <MyContext.Provider value={state}> 
        <PassedComponent {...props} />
      </MyContext.Provider>
    );
  };
  return StoreWrapper;
};

