import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../store/appContext";
export const Details = (props) => {
  function imgError(e) {
    console.log("error" + e.target.src);
    e.target.src =
      "https://cdn.dribbble.com/users/1291613/screenshots/3229838/empire_404_800x600.png";
  }
  const navigate = useNavigate();
  const { actions, store } = useContext(MyContext);
  return (
    <div
      className="container-fluid  justify-content-center"
      style={{ maxWidth: "500px" }}
    >
      <div className="card row ">
        <div className="col-6">
          <img
            style={{ maxWidth: "450px" }}
            src={props.img}
            onError={imgError}
          />
        </div>
        <div className="col-12">
          <h1>Characteristics</h1>
          <p>
            <span>
              {props.characteristic1} {props.res1}
            </span>
            <br />
            <span>
              {props.characteristic2} {props.res2}
            </span>
            <br />
            <span>
              {props.characteristic3} {props.res3}
            </span>
            <br />
            <span>
              {props.characteristic4} {props.res4}
            </span>
            <br />
          </p>
        </div>
      </div>

      <div>
        <Link to={-1}>
          <button className="btn btn-secondary me-2">Go Back</button>
        </Link>
        <button
          onClick={() =>
            actions.handleFavorites({
              name: props.title,
              link: `/${props.type}/${props.id}`,
            })
          }
          className="btn btn-warning"
        >
          Favorite
        </button>
      </div>
    </div>
  );
};
