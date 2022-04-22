import React from "react";

export const candidatesContext = React.createContext();
export const interviewsContext = React.createContext();
export const companiesContext = React.createContext();

export const activePageContext = React.createContext();

export const CandidatesProvider = candidatesContext.Provider;
export const InterviewsProvider = interviewsContext.Provider;
export const CompaniesProvider = companiesContext.Provider;

export const ActivePageProvider = activePageContext.Provider;