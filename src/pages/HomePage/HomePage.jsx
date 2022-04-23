import "./style.scss";

import { React, useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import Candidates from "../Candidates/Candidates";
import Interviews from "../Interviews/Interviews";
import SingleCandidate from "../SingleCandidate/SingleCandidate";

import {
  CandidatesProvider,
  InterviewsProvider,
  CompaniesProvider,
  ActivePageProvider,
} from "../../contexts/contexts";

const HomePage = (props) => {
  const [candidates, setCandidates] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [shouldUpdate, setUpdate] = useState(false);

  const [activePage, setActivePage] = useState("candidates")

  useEffect(() => {

    
    fetch("https://api-mock.avanturista.com/api/candidates")
      .then((res) => res.json())
      .then((data) => setCandidates(data));
  }, []);

  useEffect(() => {
    fetch("https://api-mock.avanturista.com/api/reports", {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      }
    })
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
      <ActivePageProvider value={{ activePage, setActivePage }}>
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
                <Route path="/interviews">
                  <Interviews setShouldUpdate={setShouldUpdate} setToken={props.setToken} />
                </Route>
              </Switch>
            </CompaniesProvider>
          </InterviewsProvider>
        </CandidatesProvider>
      </ActivePageProvider>
    </div>
  );
};
export default HomePage;
