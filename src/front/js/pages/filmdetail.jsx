import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import {CardDetail} from "../component/carddetail.jsx";

export const FilmDetail = () => {
const { store, actions } = useContext(Context);
const [data, setData] = useState({});
const { filmid } = useParams();
useEffect(() => {
    actions.getStarWarsDetail("films", filmid)
        .then(resp => setData(resp));
}, []);

return (
    <div className="container">
        <h2 className="m-3">Film #{filmid}</h2>
        <CardDetail
            title={data.title}
            img={`https://starwars-visualguide.com/assets/img/films/${filmid}.jpg`}
            body={
                <ul className="list-group">
                    <li className="list-group-item"> Title: {data.title}</li>
                    <li className="list-group-item"> Episode: {data.episode_id}</li>
                    <li className="list-group-item"> Opening crawl: {data.opening_crawl}</li>
                    <li className="list-group-item"> Director: {data.director}</li>
                    <li className="list-group-item"> Producer: {data.producer}</li>
                    <li className="list-group-item"> Release_date: {data.release_date}</li>
                    <li className="list-group-item"> Created: {data.created}</li> 
                    <li className="list-group-item"> Edited: {data.edited}</li> 
                    <li className="list-group-item"> Url: {data.url}</li> 
                </ul>
            }
            type="film"
        />
    </div>
);
};