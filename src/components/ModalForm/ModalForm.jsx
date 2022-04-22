import React, { useState, useContext } from "react";
import "./style.scss";

import { companiesContext } from "../../contexts/contexts";

function ModalForm(props) {
  const { companies } = useContext(companiesContext);

  const token = localStorage.getItem("token");

  const [interview, setInterview] = useState({
    candidateId: props.singleCandidate.id,
    candidateName: props.singleCandidate.name,
    companyId: 0,
    companyName: "",
    interviewDate: "",
    phase: "",
    status: "",
    note: "",
  });

  function submitInterview() {
    fetch(`http://localhost:3333/api/reports/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(interview),
    })
      .then((res) => res.json())
      .then(() => {
        props.formModalShouldUpdate();
        props.setShouldUpdate();
      });
  }

  return (
    <div className="modal-create-wrapper">
      <div className="modal-create-content">
        <p className="mainTitle">Create interview report</p>
        <p className="title">Company:</p>
        <select
          className="box"
          name="company"
          onClick={(e) => {
            setInterview({
              ...interview,
              companyId: e.target.value,
              companyName: e.target.options[e.target.selectedIndex].text,
            });
          }}
        >
          <option>-</option>;
          {companies.map((e) => {
            return <option key={e.id} value={e.id}>{e.name}</option>;
          })}
        </select>

        <p className="title">Interview date:</p>
        <input
          className="box"
          type="date"
          name="interviewDate"
          onChange={(e) =>
            setInterview({
              ...interview,
              interviewDate: e.target.value,
            })
          }
        />

        <p className="title">Phase:</p>
        <select
          className="box"
          name="phase"
          onClick={(e) => {
            setInterview({
              ...interview,
              phase: e.target.value,
            });
          }}
        >
          <option>-</option>;
          <option>cv</option>;
          <option>hr</option>;
          <option>tech</option>;
          <option>final</option>;
        </select>

        <p className="title">Status:</p>
        <select
          className="box"
          name="status"
          onClick={(e) => {
            setInterview({
              ...interview,
              status: e.target.value,
            });
          }}
        >
          <option>-</option>;
          <option>passed</option>;
          <option>declined</option>;
        </select>

        <p className="title">Note: </p>
        <textarea
          className="boxNote"
          type="text"
          name="note"
          onChange={(e) =>
            setInterview({
              ...interview,
              note: e.target.value,
            })
          }
        />
        <br /> <br />

        <div className="btns">
          <button
            className="cancel-modal"
            onClick={() => props.formModalShouldUpdate()}
          >
            Cancel
          </button>
          <button
            className="create-btn"
            onClick={() => {
              submitInterview();
            }}
          >
            Create
          </button>
        </div>


      </div>
    </div>
  );
}

export default ModalForm;
