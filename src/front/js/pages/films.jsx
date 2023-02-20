import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import CardList from "../component/cardlist.jsx";

const Films = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getStarWars("films");
  }, []);

  return (
    <div className="container">
      <h1 className="m-3">Films</h1>
      <div className="container">
        <div className="row">
          {store.films.map((film) => (
            <div key={film.uid} className="col col-md-4">
              <CardList
                id={film.uid}
                type="films"
                title={film.properties.title}
                text={film.description}
                img={`https://starwars-visualguide.com/assets/img/films/${film.uid}.jpg`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Films;
