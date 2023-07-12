import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../store/appContext";
import { Pagination } from "../component/pagination.jsx";
import { useSearchParams } from "react-router-dom";
import EntityCard from "../component/entitycard";

const Vehicles = () => {
  const { store, actions } = useContext(MyContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pages, setPages] = useState(0);
  const [records, setRecords] = useState(0);

  useEffect(() => {
    actions.getStarwars("vehicles").then((resp) => {
      if (resp) {
        setPages(resp.pages);
        setRecords(resp.records);
      }
    });
  }, []);
  useEffect(() => {
    actions
      .getStarwars("vehicles", { page: searchParams.get("page") })
      .then((resp) => {
        if (resp) {
          setPages(resp.pages);
          setRecords(resp.records);
        }
      });
  }, [searchParams.get("page")]);

  return (
    <div className="container mt-5">
      <h2>{records} Vehicles were found</h2>
      <div className="row">
        {store.vehicles.map((vehicle) => (
          <EntityCard
            key={vehicle.url}
            entity={vehicle}
            entityType="vehicles"
          />
        ))}
      </div>
      <div className="col">
        <Pagination
          pages={pages}
          currentPage={searchParams.get("page" || 1)}
          type={"vehicles"}
        />
      </div>
    </div>
  );
};

export default Vehicles;
