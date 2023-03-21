import React, { useState, useEffect } from "react";
import axios from "axios";
import EntityCard from "../component/entitycard";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://swapi.dev/api/vehicles/');
        setVehicles(response.data.results);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Vehicles</h2>
      <div className="row">
        {vehicles.map((vehicle) => (
          <EntityCard key={vehicle.url} entity={vehicle} entityType="vehicles" />
        ))}
      </div>
    </div>
  );
};

export default Vehicles;
