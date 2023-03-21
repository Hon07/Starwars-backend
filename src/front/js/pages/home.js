import React, { useEffect, useState } from "react";
import axios from "axios";
import EntityCard from "../component/entitycard.js";


const Home = () => {
  const [entities, setEntities] = useState({ people: [], vehicles: [], planets: [] });

  useEffect(() => {
    const fetchData = async () => {
      const peopleResponse = await axios.get('https://swapi.dev/api/people/');
      const vehiclesResponse = await axios.get('https://swapi.dev/api/vehicles/');
      const planetsResponse = await axios.get('https://swapi.dev/api/planets/');

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
          <EntityCard key={person.url} entity={person} entityType="people" />
        ))}
      </div>
      <h2 className="mt-5">Vehicles</h2>
      <div className="row">
        {entities.vehicles.map((vehicle) => (
          <EntityCard key={vehicle.url} entity={vehicle} entityType="vehicles" />
        ))}
      </div>
      <h2 className="mt-5">Planets</h2>
      <div className="row">
        {entities.planets.map((planet) => (
          <EntityCard key={planet.url} entity={planet} entityType="planets" />
        ))}
      </div>
    </div>
  );
};

export default Home;
