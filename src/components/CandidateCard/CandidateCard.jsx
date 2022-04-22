import React from "react";
import "./style.scss";



const CandidateCard = (props) => {

    return (
        <div className="candidateCard">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg" alt="" />
            <h3 >{props.candidates.name}</h3>
            <h5 >{props.candidates.email}</h5>
        </div>
    );
}

export default CandidateCard;