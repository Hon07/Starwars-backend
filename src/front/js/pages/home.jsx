import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useParams } from "react-router-dom";
import CardList from "../component/cardlist.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    actions.getStarWars("people").then((resp) => {
      if (resp) {
        setPeople(resp.data);
      }
    });
    actions.getStarWars("planets").then((resp) => {
      if (resp) {
        setPlanets(resp.data);
      }
    });
  }, []);

  return (
    <div className="text-center-mt-5">
      <h1 className="m-3">STAR WARS</h1>

      <h5>People</h5>

      <ul className="list-group-horizontal overflow-scroll d-flex" style={{ overflowY: "hidden !important" }}>
        {people.slice(0, 5).map((person) => (
          <li key={person.uid} className="col col-md-4">
            <CardList
              id={person.uid}
              type="people"
              title={person.name}
              text={person.description}
              img={`https://starwars-visualguide.com/assets/img/characters/${person.uid}.jpg`}
            />
          </li>
        ))}
      </ul>

      <h5 className="mt-3">Planets</h5>

      <ul className="list-group-horizontal overflow-scroll d-flex">
        {planets.slice(0, 5).map((planet) => (
          <li key={planet.uid} className="col col-md-4">
            <CardList
              id={planet.uid}
              type="planets"
              title={planet.name}
              text={planet.description}
              img={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};


