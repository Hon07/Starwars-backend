import React, { useState, useEffect } from "react";
import getState from "./flux.js";

export const MyContext = React.createContext(null);

export const injectContext = (PassedComponent) => {
  const StoreWrapper = (props) => {
    const [state, setState] = useState(
      getState({
        getStore: () => state.store,
        getActions: () => actions,
        setStore: (updatedStore) =>
          setState({
            ...state,
            store: {
              ...state.store,
              ...updatedStore
            }
          })
      })
    );

    const actions = {
      addFavorite: (entity, entityType) => {
        const { favorites } = state.store;
        const existingFavorite = favorites.find((f) => f.id === entity.id && f.entityType === entityType);
        if (!existingFavorite) {
          setState({
            ...state,
            store: {
              ...state.store,
              favorites: [...favorites, { id: entity.id, name: entity.name, entityType }]
            }
          });
        }
      },
      removeFavorite: (id) => {
        const { favorites } = state.store;
        setState({
          ...state,
          store: {
            ...state.store,
            favorites: favorites.filter((f) => f.id !== id)
          }
        });
      },
      setSelected: (entityType, entity) => {
        setState({
          ...state,
          store: {
            ...state.store,
            selected: { entityType, entity }
          }
        });
      }
    };

    useEffect(() => {}, []);

    return (
      <MyContext.Provider value={{ store: state.store, actions }}>
        <PassedComponent {...props} />
      </MyContext.Provider>
    );
  };
  return StoreWrapper;
};

