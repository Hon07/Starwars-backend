import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../store/appContext";

import { Details } from "../component/details.jsx";
export const PeopleDetail = () => {
  const { store, actions } = useContext(MyContext);
  const { characterid } = useParams();
  const [mass, setMass] = useState();
  const [name, setName] = useState();
  const [birth_year, setBirth_year] = useState();
  const [height, setHeight] = useState();

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/people/${characterid}`)
      .then((response) => response.json())
      .then((data) => {
        setMass(data.result.properties.mass);
        setName(data.result.properties.name);
        setBirth_year(data.result.properties.birth_year);
        setHeight(data.result.properties.height);
      });
  }, []);

  return (
    <div>
      <div>
        <Details
          characteristic1={"Name ="}
          characteristic2={"Birth Year ="}
          characteristic3={"Mass ="}
          characteristic4={"Height ="}
          res1={name}
          res2={birth_year}
          res3={mass}
          res4={height}
          img={`https://starwars-visualguide.com/assets/img/characters/${characterid}.jpg`}
        />
      </div>
    </div>
  );
};
