import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  const interviewerClass =  classNames({
    "interviewers__item": true,
    "interviewers__item-image": true,
    "interviewers__item--selected": props.selected
  })

  //console.log("inside InterviewerListItem, the PROPS object is", props);

  const interviewer = props.selected ? props.name: "";
  
  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {interviewer}
    </li>
      )
}
/*
export default function InterviewerListItem(props) {

  const isSelected = props.selectedInterviewer.name === props.name;

  const interviewerName = isSelected ? props.name : null;

  const interviewer = props.selectedInterviewer ? props : null; 

  const interviewerClass =  classNames({
    "interviewers__item": true,
    "interviewers__item-image": true,
    "interviewers__item--selected": isSelected
  })

  return (
    <li className={interviewerClass} onClick={() => props.setSelectedInterviewer(interviewer)}>
      <img 
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
        />
      <span>{interviewerName}</span>
    </li>
  )
}
*/