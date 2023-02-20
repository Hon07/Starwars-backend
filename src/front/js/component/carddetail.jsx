import React from "react";
import { Link } from "react-router-dom";

export const CardDetail = (props) => {
    function handleImgError(e) {
        console.error("Error " + e.target.src)
        e.target.src = "https://imgs.search.brave.com/H1LWG9TMMKGo9xvIUPyHx0QeVAACrIO5mxHI4-1OHQw/rs:fit:964:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5P/aU9nTTlaVDBCWXVz/OXVxSTVkRU5HSGFE/cCZwaWQ9QXBp";
    }
    
    return (
        <div className="card mb-3 bg-secondary" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img
                        src={props.img}
                        className="img-fluid rounded-start"
                        alt="..."
                        onError={handleImgError}
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>
                        <p className="card-text">
                            {props.body}
                        </p>
                        <p className="card-text">
                            <Link to={-1} className="btn btn-secondary">Return</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
    }   