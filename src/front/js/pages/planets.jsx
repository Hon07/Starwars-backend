import React, { useContext, useEffect, useState } from "react";
import CardList from "../component/cardlist.jsx"
import { Context } from "../store/appContext";
import Pagination from "../component/pagination.jsx";
import { useLocation } from "react-router-dom";

export const Planets = (props) => {
const { store, actions } = useContext(Context)
const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const [pages, setPages] = useState(0)
const [records, setRecords] = useState(0)
useEffect(() => {
	actions.getStarWars("planets").then((resp) => {
		if (resp) {
			setPages(resp.pages)
			setRecords(resp.records)
		}
	})
	console.log(searchParams)
}, []);

useEffect(() => {
	actions.getStarWars("planets",{page: searchParams.get("page")}).then((resp) => {
		if (resp) {
			setPages(resp.pages)
			setRecords(resp.records)
		}
	})
}, [searchParams.get("page")]);

return (
	<div className="container">
		<h1 className="m-3">Planets</h1>
		<h5>Se han encontrado {records} planetas</h5>
		<div className="container">
			<div className="row">
				{store.planets.map((planet, index) => (
					<div key={planet.uid} className="col col-md-4">
						<CardList
							id={planet.uid}
							type="planets"
							title={planet.name}
							text={planet.description}
							img={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
						/>
					</div>
				))}
			</div>
		</div>
		<div className="row">
			<div className="col">
				<Pagination
					pages={pages}
					currentPage={searchParams.get("page") || "1"}
					type={"planets"}
				/>
			</div>
		</div>
	</div>
)
};