import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import {CardDetail} from "../component/carddetail.jsx";

export const PlanetDetail = () => {
const { store, actions } = useContext(Context);
const [planetData, setPlanetData] = useState({});
const { planetid } = useParams();

useEffect(() => {
actions.getStarWarsDetail("planets", planetid)
.then(resp => setPlanetData(resp));
}, []);

return (
<div className="container">
<h2 className="m-3">Planet {planetData.name}</h2>
<CardDetail
    title={data.name}
    img={`https://starwars-visualguide.com/assets/img/planets/${planetid}.jpg`}
    body={
      <ul className="list-group">
        <li className="list-group-item"> diameter: {planetData.diameter}</li>
        <li className="list-group-item"> rotation_period: {planetData.rotation_period}</li>
        <li className="list-group-item"> orbital_period: {planetData.orbital_period}</li>
        <li className="list-group-item"> gravity: {planetData.gravity}</li>
        <li className="list-group-item"> population: {planetData.population}</li>
        <li className="list-group-item"> climate: {planetData.climate}</li>
        <li className="list-group-item"> terrain: {planetData.terrain}</li>
        <li className="list-group-item"> surface_water: {planetData.surface_water}</li>
        <li className="list-group-item"> created: {planetData.created}</li>
        <li className="list-group-item"> edited: {planetData.edited}</li>
        <li className="list-group-item"> name: {planetData.name}</li>
        <li className="list-group-item"> url: {planetData.url}</li>
      </ul>
    }
    type="planet"
  />
</div>
);
}