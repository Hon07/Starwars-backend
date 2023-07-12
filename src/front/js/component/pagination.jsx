import React from "react";
import { Link } from "react-router-dom";

export const Pagination = (props) => {
  /*
    pages
    currentPage
    type
    */
  return (
    <nav>
      <ul className="pagination">
        <li
          className={"page-item " + (props.currentPage == 1 ? " disabled" : "")}
        >
          <Link
            className="page-link paglink"
            to={
              props.currentPage == 1
                ? "#"
                : `/${props.type}?page=${parseInt(props.currentPage) - 1}`
            }
          >
            Previous
          </Link>
        </li>
        {Array(props.pages)
          .fill("")
          .map((val, page) => (
            <li
              key={page}
              className={`page-item ${
                Number(props.currentPage == page + 1) ? "active" : ""
              }`}
            >
              <Link
                className="page-link"
                to={`/${props.type}?page=${page + 1}`}
              >
                {page + 1}
              </Link>
            </li>
          ))}

        <li
          className={
            "page-item" + (props.currentPage == props.pages ? " disabled" : "")
          }
        >
          <Link
            to={
              props.currentPage == props.pages
                ? "#"
                : `/${props.type}?page=${parseInt(props.currentPage) + 1}`
            }
            className="page-link"
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};
