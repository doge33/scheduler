import React from "react";
import '@testing-library/jest-dom'
import { render, prettyDOM, cleanup, getByPlaceholderText} from "@testing-library/react";

import Appointment from "components/Appointment/index";

afterEach(cleanup);


describe("Appointment", () => {

  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  const interview = {
    student: "Sandy",
    interviewer: "Larry"
  }



  it("renders without crashing", () => {
    render(<Appointment />);
  });

  it("renders EMPTY slot with Add button when no information is filled in", () => {
    const {getByAltText} = render(<Appointment />)
    const img = getByAltText('Add')
    expect(img).toBeInTheDocument()
    //console.log(prettyDOM(container))
  });

  it("renders a booked slot that shows the student and interviewer for the interview", () =>{
    const {getByTestId} = render(<Appointment interview={interview} />);
    const studentName = getByTestId('studentName');
    const interviewerName = getByTestId('interviewerName');

    expect(studentName).toBeInTheDocument();
    expect(interviewerName).toBeInTheDocument();

    //add buttons for edit and delete later!
  })
});