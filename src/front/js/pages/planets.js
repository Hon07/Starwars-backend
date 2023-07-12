import React, { useState, useEffect, useContext } from "react";
import { Pagination } from "../component/pagination.jsx";
import { useSearchParams, Link } from "react-router-dom";
import EntityCard from "../component/entitycard";
import { MyContext } from "../store/appContext.js";
const Planets = () => {
  const { store, actions } = useContext(MyContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pages, setPages] = useState(0);
  const [records, setRecords] = useState(0);

  useEffect(() => {
    actions.getStarwars("planets").then((resp) => {
      if (resp) {
        setPages(resp.pages);
        setRecords(resp.records);
      }
    });
  }, []);
  useEffect(() => {
    actions
      .getStarwars("planets", { page: searchParams.get("page") })
      .then((resp) => {
        if (resp) {
          setPages(resp.pages);
          setRecords(resp.records);
        }
      });
  }, [searchParams.get("page")]);
  return (
    <div className="container mt-5">
      <h2>{records} Planets were found</h2>
      <div className="row">
        {store.planets.map((planet) => (
          <EntityCard key={planet.url} entity={planet} entityType="planets" />
        ))}
      </div>
      <div className="col">
        <Pagination
          pages={pages}
          currentPage={searchParams.get("page" || 1)}
          type={"planets"}
        />
      </div>
    </div>
  );
};

export default Planets;
