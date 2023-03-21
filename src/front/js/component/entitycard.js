import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../store/appContext";

const EntityCard = ({ entity, entityType }) => {
  const { store, actions } = useContext(MyContext);

  const isFavorite = store.favorites.some((favorite) => favorite.url === entity.url);

  const handleAddFavorite = () => {
    if (isFavorite) {
      actions.removeFavorite(entity.url);
    } else {
      actions.addFavorite(entity, entityType);
    }
  };

  const handleDetailClick = () => {
    actions.setSelected(entityType, entity);
  };

  const renderAdditionalInfo = () => {
    if (entityType === "planets") {
      return (
        <div>
          <p>Climate: {entity.climate}</p>
          <p>Terrain: {entity.terrain}</p>
          <p>Population: {entity.population}</p>
        </div>
      );
    } else if (entityType === "vehicles") {
      return (
        <div>
          <p>Model: {entity.model}</p>
          <p>Manufacturer: {entity.manufacturer}</p>
          <p>Class: {entity.vehicle_class}</p>
        </div>
      );
    } else if (entityType === "people") {
      return (
        <div>
          <p>Height: {entity.height}</p>
          <p>Mass: {entity.mass}</p>
          <p>Birth Year: {entity.birth_year}</p>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="col-md-3 col-sm-6 my-3">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{entity.name}</h5>
          {renderAdditionalInfo()}
          <div className="d-flex justify-content-between align-items-center">
            <button className={`btn ${isFavorite ? "btn-warning" : "btn-outline-warning"}`} onClick={handleAddFavorite}>
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
            <Link to={`/${entityType}/${entity.url.split("/").reverse()[1]}`} className="btn btn-primary" onClick={handleDetailClick}>
              View Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntityCard;

