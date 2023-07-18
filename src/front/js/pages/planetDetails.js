import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Details } from "../component/details.jsx";
export const PlanetDetails = () => {
  const { planetid } = useParams();
  const [climate, setClimate] = useState();
  const [name, setName] = useState();
  const [population, setPopulation] = useState();
  const [diameter, setDiameter] = useState();

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/planets/${planetid}`)
      .then((response) => response.json())
      .then((data) => {
        setClimate(data.result.properties.climate);
        setName(data.result.properties.name);
        setPopulation(data.result.properties.population);
        setDiameter(data.result.properties.diameter);
      });
  }, []);

  return (
    <div>
      <div>
        <Details
          characteristic1={"Name ="}
          characteristic2={"Population ="}
          characteristic3={"Climate ="}
          characteristic4={"Diameter ="}
          res1={name}
          res2={population}
          res3={climate}
          res4={diameter}
          img={`https://starwars-visualguide.com/assets/img/planets/${planetid}.jpg`}
        />
      </div>
    </div>
  );
};
