import { React, useState} from "react";
import "./style.scss";

const ModalInterview = (props) => {

  return (
    <div className="modalInterview">
      <div className="modal-wrapper">
        <div className="modal-content">

          <p className="maintitle">View interview report</p>

          <div>
            <p> <span>Candidate name:</span>{props.interview.candidateName}</p>
            <p> <span>Company name:</span> {props.interview.companyName}</p>
            <p> <span>Interview date:</span> {props.interview.interviewDate}</p>
            <p> <span>Phase:</span> {props.interview.phase}</p>
            <p> <span>Status:</span> {props.interview.status}</p>
          </div>
          <div className="textareaBlocker">
          </div>
          <div className="blockEditDiv"></div>
          <p className="note">Notes:</p>
          <textarea
          defaultValue={props.interview.note}
          ></textarea>

          <div className="btnflex">
            <button className="close-modal" onClick={(e) => {
              props.modalShouldUpdate()
            }}>Close</button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ModalInterview;
