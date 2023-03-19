import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { MyContext } from "../store/appContext"; // <-- Used the correct context name
import EntityCard from "../component/entitycard.js";

const Home = () => {
  const [entities, setEntities] = useState({ people: [], vehicles: [], planets: [] });
  const { store, actions } = useContext(MyContext); // <-- Use MyContext instead of Context

  useEffect(() => {
    const fetchData = async () => {
      const peopleResponse = await axios.get('https://swapi.tech/api/people/');
      const vehiclesResponse = await axios.get('https://swapi.tech/api/vehicles/');
      const planetsResponse = await axios.get('https://swapi.tech/api/planets/');

      setEntities({
        people: peopleResponse.data.results,
        vehicles: vehiclesResponse.data.results,
        planets: planetsResponse.data.results,
      });
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h2>People</h2>
      <div className="row">
        {entities.people.map((person) => (
          <EntityCard key={person.uid} entity={person} entityType="people" />
        ))}
      </div>
      <h2 className="mt-5">Vehicles</h2>
      <div className="row">
        {entities.vehicles.map((vehicle) => (
          <EntityCard key={vehicle.uid} entity={vehicle} entityType="vehicles" />
        ))}
      </div>
      <h2 className="mt-5">Planets</h2>
      <div className="row">
        {entities.planets.map((planet) => (
          <EntityCard key={planet.uid} entity={planet} entityType="planets" />
        ))}
      </div>
    </div>
  );
};

export default Home;
