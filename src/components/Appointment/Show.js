import React from "react";

export default function Show(props) {
  //console.log("props that are passed to SHOW are:---", props);
  //console.log("props.interview is ---", props.interview);
  //console.log("props.interview.interviewer is ---", props.interview.interviewer);
  const defaultName = "default interviewer name";

  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">{props.interview.student }</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{ props.interview.interviewer.name} </h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
            onClick={props.onEdit}
          />
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
            onClick={() => props.onDelete(props.interview)}
          />
        </section>
      </section>
    </main>

  )
}
//original line 13 is this:
//<h3 className="text--regular">{props.interview ? props.interview.interviewer.name: props.interviewer.name}</h3>