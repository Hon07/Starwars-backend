import React, { useEffect, useState, useContext } from "react";

import EntityCard from "../component/entitycard.js";
import { MyContext } from "../store/appContext.js";
const Home = () => {
  const { actions, store } = useContext(MyContext);

  useEffect(() => {
    actions.getStarwars("people");
    actions.getStarwars("planets");
    actions.getStarwars("vehicles");
  }, []);
  return (
    <div className="container mt-5">
      <h2>People</h2>
      <div
        className="list-group-horizontal d-flex overflow-scroll "
        style={{ maxHeight: "400px" }}
      >
        {store.people.map((person) => (
          <EntityCard
            key={person.url}
            entity={person}
            entityType="characters"
          />
        ))}
      </div>
      <h2 className=" mt-5">Vehicles</h2>
      <div
        className="list-group-horizontal d-flex overflow-scroll"
        style={{ maxHeight: "400px" }}
      >
        {store.vehicles.map((vehicle) => (
          <EntityCard
            key={vehicle.url}
            entity={vehicle}
            entityType="vehicles"
          />
        ))}
      </div>
      <h2 className="mt-5">Planets</h2>
      <div
        className="list-group-horizontal d-flex overflow-scroll"
        style={{ maxHeight: "400px" }}
      >
        {store.planets.map((planet) => (
          <EntityCard key={planet.url} entity={planet} entityType="planets" />
        ))}
      </div>
    </div>
  );
};

export default Home;
