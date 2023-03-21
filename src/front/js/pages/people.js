import React, { useState, useEffect } from "react";
import axios from "axios";
import EntityCard from "../component/entitycard";

const People = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://swapi.dev/api/people/');
        setPeople(response.data.results);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h2>People</h2>
      <div className="row">
        {people.map((person) => (
          <EntityCard key={person.url} entity={person} entityType="people" />
        ))}
      </div>
    </div>
  );
};

export default People;
