import { React, useContext, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ModalForm from "../../components/ModalForm/ModalForm";
import ModalInterview from "../../components/ModalInterview/ModalInterview";
import ModalUpdateForm from "../../components/ModalUpdateForm/ModalUpdateForm";

import "./style.scss";

import {
  interviewsContext,
  candidatesContext,
} from "../../contexts/contexts";

const SingleCandidate = (props) => {
  const { interviews } = useContext(interviewsContext);
  const { candidates } = useContext(candidatesContext);

  const token = localStorage.getItem("token");

  const [interviewModal, seInterviewModal] = useState(false); // za view
  function modalShouldUpdate(report) {
    seInterviewModal(report)
  }

  const [formModal, setFormModal] = useState(false); // za create
  function formModalShouldUpdate() {
    setFormModal(!formModal)
  }

  const [formModalUpdate, setFormModalUpdate] = useState(false); // za edit
  function formEditModalShouldUpdate(report) {
    setFormModalUpdate(report)
  }

  const { id } = useParams();
  const singleCandidate = candidates.find((e) => e.id == id);
  const singleCandidateReport = interviews.filter((e) => e.candidateId == id);

  function deleteInterview(e) {
    fetch(`http://localhost:3333/api/reports/${e.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then(() => props.setShouldUpdate());
  }

  if (!singleCandidate) {
    return null
  }

  if (singleCandidate) {
   
    return (
      <div className="singleCandidate">
        <Header setToken={props.setToken} />
        <div className="singleCandidateContainer">
          <div className="data">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg" alt="imageAvatar"></img>
            <div id="detailsName" className="dataDetails">
              <h2> <span>Name:</span>  <br />  {singleCandidate.name}</h2>
              <h2> <span>Birthday:</span>  <br />  {singleCandidate.birthday.slice(4, 16)}</h2>
            </div>
            <div id="detailsEducation" className="dataDetails eduWidth">
              <h2> <span>Education:</span> <br />{singleCandidate.education}</h2>
              <h2 className="fontSize"> <span>Email:</span> <br />{singleCandidate.email}</h2>
            </div>
          </div>
        </div>
        <h1>Interviews</h1>
        <table>
          <tbody>
            <tr>
              <th id="firstTH">Company name</th>
              <th>Interview date</th>
              <th className="delCol">Phase</th>
              <th className="delCol">Status</th>
              <th className="delCol">View notes</th>
              <th>Edit interview</th>
              <th id="lastTH">Delete Interview</th>
            </tr>
            {singleCandidateReport
            .sort((a,b)=>{
              return new Date(b.interviewDate) - new Date(a.interviewDate);
          })
            .map((e) => ( 
                <tr key={e.id} className="onHover">
                  <td>{e.companyName}</td>
                  <td className="delCol">{e.interviewDate}</td>
                  <td className="delCol">{e.phase}</td>
                  <td className={e.status === "declined" ? "declined delCol" : "passed delCol"}>{e.status}</td>
                  <td>
                    <button className="view" onClick={() => { modalShouldUpdate(e) }}>  </button>
                  </td>
                  <td>
                    <button className="edit" onClick={() => { formEditModalShouldUpdate(e) }}> </button>
                  </td>
                  <td>
                    <button className="garbage" onClick={() => deleteInterview(e)}>
                    </button>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>

        {interviewModal && <ModalInterview interview={interviewModal} modalShouldUpdate={modalShouldUpdate} />}
        {formModalUpdate && <ModalUpdateForm interview={formModalUpdate} formEditModalShouldUpdate={formEditModalShouldUpdate} setShouldUpdate={props.setShouldUpdate} />}

        <button className="newInterviewBTN" onClick={(e) => { formModalShouldUpdate() }}>CREATE INTERVIEW</button>
        {formModal && <ModalForm formModalShouldUpdate={formModalShouldUpdate} setShouldUpdate={props.setShouldUpdate} singleCandidate={singleCandidate} />}

        <Footer />
      </div>
    );
  }



};

export default SingleCandidate;
