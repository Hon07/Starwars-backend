import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {CardDetail} from "../component/carddetail.jsx";
import { Context } from "../store/appContext";


export const PeopleDetail = () => {
    const { store, actions } = useContext(Context);
    const [data, setData] = useState({})
    const { peopleid } = useParams();

    useEffect(() => {
        actions.getStarWarsDetail("people", peopleid)
            .then(resp => setData(resp))
            .catch(error => console.log(error))
    }, [])

    return (
        <div className="container">
            <h2 className="m-3">People {data.name}</h2>
            <CardDetail
                title={data.name}
                img={`https://starwars-visualguide.com/assets/img/planets/${peopleid}.jpg`}
                body={
                    <ul className="list-group">
                        <li className="list-group-item">Height: {data.height}</li>
                        <li className="list-group-item">Mass: {data.mass}</li>
                        <li className="list-group-item">Hair Color: {data.hair_color}</li>
                        <li className="list-group-item">Skin Color: {data.skin_color}</li>
                        <li className="list-group-item">Eye Color: {data.eye_color}</li>
                        <li className="list-group-item">Birth Year: {data.birth_year}</li>
                        <li className="list-group-item">Gender: {data.gender}</li>
                        <li className="list-group-item">Created: {data.created}</li>
                        <li className="list-group-item">Edited: {data.edited}</li>
                        <li className="list-group-item">Name: {data.name}</li>
                        <li className="list-group-item">Homeworld: {data.homeworld}</li>
                        <li className="list-group-item">URL: {data.url}</li>
                    </ul>
                }
                type="people"
            />
        </div>
    )
};


