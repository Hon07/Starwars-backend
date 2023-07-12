import react from "react";
import { Link } from "react-router-dom";
import { useContext } from "react-router-dom";
import { MyContext } from "../store/appContext";

export const Card = (props) => {
  const { actions, store } = useContext(MyContext);

  function imgError(e) {
    console.log("error" + e.target.src);
    e.target.src =
      "https://cdn.dribbble.com/users/490588/screenshots/3329226/star_wars_404.png";
  }

  return (
    <div className="card" id="card">
      <img
        src={props.image}
        className="card-img-top"
        onError={imgError}
      />
      <div className="card-body">
        <div className="title-card">
          <h5 className="card-title" id="name">
            {props.title}
          </h5>
        </div>
        <div className=" d-flex justify-content-between">
          <Link
            to={`/${props.type}/${props.id}`}
            className="btn btn-primary "
          >
            Details
          </Link>
          <button
            onClick={() =>
              actions.handleFavorites({
                name: props.title,
                link: `/${props.type}/${props.id}`,
              })
            }
            className="btn btn-warning "
          >
            Favorites
          </button>
        </div>
      </div>
    </div>
  );
};
