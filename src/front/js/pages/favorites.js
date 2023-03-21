import React, { useContext } from "react";
import { MyContext } from "../store/appContext";
import EntityCard from "../component/entitycard.js";

const Favorites = () => {
  const { store, actions } = useContext(MyContext);
  const { favorites } = store;

  return (
    <div className="container mt-5">
      <h2>Favorites</h2>
      <div className="row">
        {favorites.map((favorite) => (
          <EntityCard
            key={favorite.uid}
            entity={favorite}
            entityType={favorite.entityType}
            handleRemoveFavorite={() => actions.removeFavorite(favorite.uid)}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;

