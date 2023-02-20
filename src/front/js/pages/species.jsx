import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CardList from "../component/cardlist.jsx";
import Pagination from "../component/pagination.jsx";
import { Context } from "../store/appContext";

export const Species = () => {
  const { store, actions } = useContext(Context);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pages, setPages] = useState(0);
  const [records, setRecords] = useState(0);

  useEffect(() => {
    actions.getStarWars("species").then((resp) => {
      if (resp) {
        setPages(resp.pages);
        setRecords(resp.records);
      }
    });
  }, []);

  useEffect(() => {
    actions
      .getStarWars("species", { page: searchParams.get("page") })
      .then((resp) => {
        if (resp) {
          setPages(resp.pages);
          setRecords(resp.records);
        }
      });
  }, [searchParams.get("page")]);

  return (
    <div className="container">
      <h1 className="m-3">Species</h1>
      <div className="container">
        <div className="row">
          {store.species.map((species, index) => (
            <div key={species.uid} className="col col-md-4">
              <CardList
                id={species.uid}
                type="species"
                title={species.name}
                text={species.description}
                img={`https://starwars-visualguide.com/assets/img/species/${species.uid}.jpg`}
              />
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col">
            <Pagination
              pages={pages}
              currentPage={searchParams.get("page") || "1"}
              type={"species"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};


