import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../store/appContext";

const EntityCard = ({ entity, entityType, handleRemoveFavorite }) => {
  const { store, actions } = useContext(MyContext);
  console.log(entity);
  const isFavorite = store.favorites.some(
    (favorite) => favorite.url === entity.url
  );

  const handleAddFavorite = () => {
    if (isFavorite) {
      actions.removeFavorite(entity.url);
    } else {
      actions.addFavorite(entity, entityType);
    }
  };
  const navigate = useNavigate();
  const handleDetailClick = () => {
    actions.setSelected(entityType, entity);
    navigate("/details", {
      state: { entityType, id: entity.url.split("/").reverse()[1], entity },
    });
  };

  function imgError(e) {
    console.log("error" + e.target.src);
    e.target.src =
      "https://cdn.dribbble.com/users/1291613/screenshots/3229838/empire_404_800x600.png";
  }
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

  let imagePath = "";
  if (entityType === "people") {
    imagePath =
      "https://images.squarespace-cdn.com/content/v1/5fbc4a62c2150e62cfcb09aa/a0bf4bf8-f569-422e-a676-13cd3f5e4592/star_wars__skywalker_saga_wallpaper_by_thekingblader995_ddiuxg5.jpg";
  } else if (entityType === "planets") {
    imagePath = "https://rare-gallery.com/thumbs/501131-star-wars-4k.jpg";
  } else if (entityType === "vehicles") {
    imagePath = "https://wallpapercave.com/wp/wp6792288.jpg";
  }

  return (
    <div className="col-md-3 col-sm-6 my-3">
      <div className="card h-100">
        <img
          src={`https://starwars-visualguide.com/assets/img/${entityType}/${entity.uid}.jpg`}
          alt="star wars entity"
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover" }}
          onError={imgError}
        />

        <div className="card-body">
          <h5 className="card-title">{entity.name}</h5>
          {/*renderAdditionalInfo()*/}
          <div className="d-flex justify-content-between align-items-center">
            <button
              className={`btn ${
                isFavorite ? "btn-warning" : "btn-outline-warning"
              }`}
              onClick={handleAddFavorite}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
            {handleRemoveFavorite ? (
              <button className="btn btn-danger" onClick={handleRemoveFavorite}>
                Remove from Favorites
              </button>
            ) : (
              entityType === "people" && (
                <Link
                  to={`/people1`}
                  className="btn btn-primary"
                  onClick={handleDetailClick}
                >
                  More Info
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntityCard;
