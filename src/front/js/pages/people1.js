import React, { useState, useEffect } from "react";
import axios from "axios";

const Card = ({ character }) => {
  return (
    <div className="card mx-2 my-3" style={{ width: "18rem" }}>
      <img
        src="https://i.pinimg.com/736x/d7/a4/76/d7a476b8d41d9d9a484e906640db1479--christmas-photos-skysolo-fanart.jpg" // Add your personalized photo URL here
        className="card-img-top"
        alt="character"
      />
      <div className="card-body">
        <h5 className="card-title">{character.name}</h5>
        <ul>
          <li>
            <strong>Birth Year:</strong> {character.birth_year}
          </li>
          <li>
            <strong>Gender:</strong> {character.gender}
          </li>
          <li>
            <strong>Height:</strong> {character.height}
          </li>
          <li>
            <strong>Mass:</strong> {character.mass}
          </li>
          <li>
            <strong>Films:</strong> {character.films.join(", ")}
          </li>
          {/* Add more properties here */}
        </ul>
      </div>
    </div>
  );
};

const People1 = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://swapi.dev/api/people/");
        const allCharacters = response.data.results.slice(0, 10);
        setCharacters(allCharacters);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h2>People More Information</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {characters.length > 0 &&
          characters.map((character) => (
            <Card key={character.url} character={character} />
          ))}
      </div>
    </div>
  );
};

export default People1;
