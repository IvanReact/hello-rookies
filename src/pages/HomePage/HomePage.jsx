import "./style.scss";

import { React, useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import Candidates from "../Candidates/Candidates";
import SingleCandidate from "../SingleCandidate/SingleCandidate";

import {
  CandidatesProvider,
  InterviewsProvider,
  CompaniesProvider,
} from "../../contexts/contexts";

const HomePage = (props) => {
  
  const [candidates, setCandidates] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [shouldUpdate, setUpdate] = useState(false);

  useEffect(() => {   
    fetch("https://api-mock.avanturista.com/api/candidates")
      .then((res) => res.json())
      .then((data) => setCandidates(data));
  }, []);

  useEffect(() => {
    fetch("https://api-mock.avanturista.com/api/reports")
      .then((res) => res.json())
      .then((data) => setInterviews(data));
  }, [shouldUpdate]);

  useEffect(() => {
    fetch("https://api-mock.avanturista.com/api/companies")
      .then((res) => res.json())
      .then((data) => setCompanies(data));
  }, []);

  function setShouldUpdate() {
    setUpdate(!shouldUpdate)
  }

  return (
    <div className="homePage">
        <CandidatesProvider value={{ candidates, setCandidates }}>
          <InterviewsProvider value={{ interviews, setInterviews }}>
            <CompaniesProvider value={{ companies, setCompanies }}>
              <Switch>
                <Route path="/candidates/singlecandidate/:id">
                  <SingleCandidate setShouldUpdate={setShouldUpdate} setToken={props.setToken} />
                </Route>
                <Route path="/candidates" exact>
                  <Candidates setToken={props.setToken} />
                </Route>
              </Switch>
            </CompaniesProvider>
          </InterviewsProvider>
        </CandidatesProvider>
    </div>
  );
};

export default HomePage;
