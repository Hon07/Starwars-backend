import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css"

const Card=( props) => {
const {store, actions}=useContext(Context)
const imgUrl= props.imagen
const imgId= props.item.uid
return( 
<div>
<div className="card p-2" style= {{minWidth:"300px"}}>
<img src={imgUrl+imgId+".jpg"} className= "card-img-top" alt="No Image available"
<div className="card-body">
    <h5 className="card-title">{props.item.name}</h5>
    <p className="card-text">
    “Strike me down and I will become more powerful than you could possibly imagine.” — Obi-Wan Kenobi.
    </p>
<div className="d-flex justify-content-between">
    <Link to={`/${props.endpoint}/ ${props.item.uid}`} className="btn btn-outlinedark boton">
        Details
    </Link>
    <button type= "button" onClick={(e)=>{
if(store&& store.favorites.find((favorite,index)=>{return favorite.url==`/${props.endpoint}/${props.item.uid}`})? (<i className="fas fa-heart"></i>): (<i className="far fa-heart"></i>)

)}}>

</button>


</div>

</div>



</div>


</div>


)

}