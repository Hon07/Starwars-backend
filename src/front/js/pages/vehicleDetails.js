import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../store/appContext";
import { Details } from "../component/details.jsx";
export const VehicleDetails = () => {
  const { store, actions } = useContext(MyContext);
  const { vehicleid } = useParams();
  const [passengers, setPassengers] = useState();
  const [name, setName] = useState();
  const [model, setModel] = useState();
  const [manufacturer, setManufacturer] = useState();

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/vehicles/${vehicleid}`)
      .then((response) => response.json())

      .then((data) => {
        setPassengers(data.result.properties.passengers);
        setName(data.result.properties.name);
        setModel(data.result.properties.model);
        setManufacturer(data.result.properties.manufacturer);
      });
  }, []);

  return (
    <div>
      <div>
        <Details
          characteristic1={"Name ="}
          res1={name}
          characteristic2={"Model ="}
          res2={model}
          characteristic3={"Passengers ="}
          res3={passengers}
          characteristic4={"Manufacturer ="}
          res4={manufacturer}
          img={`https://starwars-visualguide.com/assets/img/vehicles/${vehicleid}.jpg`}
        />
      </div>
    </div>
  );
};
