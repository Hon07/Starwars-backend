import React, { useState, useEffect, useContext } from "react";
import { Pagination } from "../component/pagination.jsx";
import EntityCard from "../component/entitycard";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { MyContext } from "../store/appContext";

const People = () => {
  const { actions, store } = useContext(MyContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pages, setPages] = useState(0);
  const [records, setRecords] = useState(0);

  useEffect(() => {
    actions.getStarwars("people").then((resp) => {
      if (resp) {
        setPages(resp.pages);
        setRecords(resp.records);
      }
    });
  }, []);
  useEffect(() => {
    actions
      .getStarwars("people", { page: searchParams.get("page") })
      .then((resp) => {
        if (resp) {
          setPages(resp.pages);
          setRecords(resp.records);
        }
      });
  }, [searchParams.get("page")]);

  return (
    <div className="container mt-5">
      <h2>{records} Characters were found</h2>
      <div className="row">
        {store.people.map((person) => (
          <EntityCard
            key={person.url}
            entity={person}
            entityType="characters"
            viewDetailsPath={`/people/${person.url.split("/").reverse()[1]}`}
          />
        ))}
      </div>
      <div className="col">
        <Pagination
          pages={pages}
          currentPage={searchParams.get("page" || 1)}
          type={"people"}
        />
      </div>
    </div>
  );
};

export default People;
