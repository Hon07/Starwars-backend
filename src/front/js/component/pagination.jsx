import React from "react";
import { Link } from "react-router-dom";

const Pagination = (props) => {

    const page = {}

    return (
        <nav>
            <ul className="pagination pagination-sm m-3">
                <li className={"page-item" + (props.currentPage === 1 ? " disabled" : "")}>
                    <Link
                        className="page-link"
                        to={props.currentPage === 1 ? "#" : `/${props.type}?page=${props.currentPage - 1}`}
                    >
                        Previous
                    </Link>
                </li>
                {Array(props.pages)
                    .fill("")
                    .map((val, page) => (
                        <li key={page}
                            className={`page-item${props.currentPage === page + 1 ? " active" : ""}`}>
                            <Link
                                className="page-link"
                                to={`/${props.type}?page=${page + 1}`}>
                                {page + 1}
                            </Link>
                        </li>
                    ))}
                <li
                    className={"page-item" + (props.currentPage === props.pages ? " disabled" : "")}>
                    <Link
                        className="page-link"
                        to={props.currentPage === props.pages ? "#" : `/${props.type}?page=${parseInt(props.currentPage) + 1}`}
                    >
                        Next
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination
