import React, { useState, useEffect } from "react";
import axios from "axios";
import EntityCard from "../component/entitycard";

const Planets = () => {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://swapi.dev/api/planets/');
        setPlanets(response.data.results);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Planets</h2>
      <div className="row">
        {planets.map((planet) => (
          <EntityCard key={planet.url} entity={planet} entityType="planets" />
        ))}
      </div>
    </div>
  );
};

export default Planets;



