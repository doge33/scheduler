import React from 'react';
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  
  console.log("props is ----:", props);

  const interviewers = props.interviewers;

    return (
        <section className="interviewers">
          <h4 className="interviewers__header text--light">Interviewer</h4>
          <ul className="interviewers__list">
            {interviewers.map(interviewer => {
              return (
                <InterviewerListItem 
                  key={interviewer.id}
                  name={interviewer.name}
                  avatar={interviewer.avatar}
                  selectedInterviewer={props.selectedInterviewer}
                  setSelectedInterviewer={props.setSelectedInterviewer}
                />
              )
            })}
          </ul>
        </section>
      ) 
}