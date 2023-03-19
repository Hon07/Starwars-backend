import React, { useContext } from "react";
import { MyContext, injectContext } from "../store/appContext"; // <-- Imported the renamed context and HOC
import EntityCard from "../component/entitycard.js";

const Favorites = () => {
  const { store, actions } = useContext(MyContext); // <-- Used the renamed context
  const { favorites } = store;

  return (
    <div className="container mt-5">
      <h2>Favorites</h2>
      <div className="row">
        {favorites.map((favorite) => (
          <EntityCard key={favorite.id} entity={favorite} entityType={favorite.entityType} />
        ))}
      </div>
    </div>
  );
};

export default injectContext(Favorites); // <-- Wraped the component with injectContext HOC

