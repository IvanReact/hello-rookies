import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import InterviewCard from "../../components/InterviewCard/InterviewCard";
import { interviewsContext } from "../../contexts/contexts";
import { useContext } from "react";
import search from "../../images/search.png";

import "./style.scss"

const Interviews = (props) => {
    const { interviews } = useContext(interviewsContext)
    const [searchInterview, setSearchInterview] = useState("")

    return (
        <div className="interviews">
            <Header setToken={props.setToken} />
            <div className="interviewsWrapper">
                <div className="searchInterviews">
                    <input type="text" className="searchIcon" placeholder="Search Interviews by Company or Name" onChange={(e) => setSearchInterview(e.target.value)} />
                    <img src={search} alt="" />
                </div>
                <div className="interviewsMain">
                    {interviews
                        .filter((e) => {
                            if (searchInterview === "") {
                                return e
                            }
                            else if (e.companyName.toLowerCase().includes(searchInterview.toLowerCase()) || e.candidateName.toLowerCase().includes(searchInterview.toLowerCase())) {
                                return e
                            }
                            else return null
                        })
                        .sort((a, b) => {
                            return new Date(b.interviewDate) - new Date(a.interviewDate);
                        })
                        .map((e) => {
                            return <InterviewCard setShouldUpdate={props.setShouldUpdate} key={e.id} singleInterview={e} />
                        })}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Interviews;