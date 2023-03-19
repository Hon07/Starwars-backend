import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext, injectContext } from "../store/appContext.js";

const EntityCard = ({ entity, entityType }) => {
  const { store, actions } = useContext(MyContext);
  const { favorites } = store;
  const { addFavorite, removeFavorite } = actions;
  const isFavorite = favorites.some((fav) => fav.id === entity.id);

  const handleFavorite = () => {
    if (isFavorite) {
      removeFavorite(entity.id);
    } else {
      addFavorite({ ...entity, entityType });
    }
  };

  const imagePath = `https://starwars-visualguide.com/assets/img/${entityType}/${entity.id}.jpg`;

  return (
    <div className="col-md-4">
      <div className="card mb-4">
        <img src={imagePath} className="card-img-top" alt={entity.name} />
        <div className="card-body">
          <h5 className="card-title">{entity.name}</h5>
          <button className={`btn ${isFavorite ? 'btn-danger' : 'btn-primary'}`} onClick={handleFavorite}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
          <Link to={`/${entityType}/${entity.id}`} className="btn btn-secondary ms-2">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default injectContext(EntityCard);
