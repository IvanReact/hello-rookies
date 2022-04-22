import { React, useState, useEffect } from "react";
import Candidates from "../Candidates/Candidates";
import Interviews from "../Interviews/Interviews";
import SingleCandidate from "../SingleCandidate/SingleCandidate";
import { Switch, Route } from "react-router-dom";
import "./style.scss";

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
    fetch("http://localhost:3333/api/candidates")
      .then((res) => res.json())
      .then((data) => setCandidates(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3333/api/reports")
      .then((res) => res.json())
      .then((data) => setInterviews(data));
  }, [shouldUpdate]);

  useEffect(() => {
    fetch("http://localhost:3333/api/companies")
      .then((res) => res.json())
      .then((data) => setCompanies(data));
  }, []);

  function setShouldUpdate() {
    setUpdate(!shouldUpdate)
  }
  console.log("Homepage rendere")
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
