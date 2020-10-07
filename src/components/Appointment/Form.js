import React, { useState } from "react";
import InterviewerList from "./../InterviewerList";
import Button from "./../Button";

export default function Form(props) {

  const [name, setName] = useState(props.name || ""); //input: student name state
  const [interviewer, setInterviewer] = useState(props.interviewer || null); //interviewer's id state
  const [error, setError] = useState("");

  const handleInputChange = (evt => setName(evt.target.value))

  //validate the input field is not empty
  function validation() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    } 
    setError("")
    props.onSave(name, interviewer);
  }

  const reset = (() => {
    setName("");
    setInterviewer(null);
  })

  const cancel = (() => {
    //props.onCancel;
      reset();
      props.onCancel();
  })

  //console.log("in FORM at EDIT MODE; interviewer is~~~~", interviewer)
  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={handleInputChange}
            value={name}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validation}>Save</Button>
        </section>
      </section>
    </main>

  )
}