import React from "react";
import axios from "axios";
import { render, cleanup, screen, waitForElement, fireEvent, getByText, getByTestId, getAllByTestId, prettyDOM, getByAltText, getByPlaceholderText, getNodeText, waitForElementToBeRemoved, queryByText } from "@testing-library/react";
import Application from "components/Application";


describe("Application", () => {
  
  beforeEach(() => cleanup);
  

  it("defaults to Monday and changes the schedule when a new day is selected", async() => {

    const {getByText} = render(<Application />);

    await waitForElement(() => getByText("Monday"))
    fireEvent.click(getByText("Tuesday"))
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
    
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async() => {
    const {container, debug} = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: {value: "Lydia Miller-Jones"}
    })

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"))

    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();
    expect(getByAltText(appointment, "Edit")).toBeInTheDocument();
    expect(getByAltText(appointment, "Delete")).toBeInTheDocument();

    const days = getAllByTestId(container, "day");
    const day = days.find(day => queryByText(day, "Monday")); 

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the booked appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find(appointment => queryByText(appointment, "Archie Cohen"));
  
    fireEvent.click(getByAltText(appointment, "Delete"));
  
    // 4. Check that the confirm mode is displayed, containing the text "Delete the appointment?"
    expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();
  
    // 5. Click the "Confirm" button to delete
    fireEvent.click(getByText(appointment, "Confirm"));
  
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    // 7. Wait until the "Deleting" element goes away
    await waitForElementToBeRemoved(() => getByText(appointment, "Deleting"))
    
    // 8. Check that the button with the alt text "Add" is displayed.
    expect(getByAltText(appointment, "Add")).toBeInTheDocument();
    // 9. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const days = getAllByTestId(container, "day");
    const day = days.find(day => queryByText(day, "Monday")); 

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  
    
  });
  

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() => {

    // 1. Render the Application.
    const {container, debug} = render(<Application />)
    
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Edit" button on the booked appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find(appointment => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(getByAltText(appointment, "Edit"))

    // 4. Check that the Form with student name and selected interviewer is shown.
    expect(getByPlaceholderText(appointment, /Enter Student Name/i)).toHaveValue("Archie Cohen");
    expect(getByText(appointment, "Tori Malcolm")).toBeInTheDocument();

    // 5. Change the name to "Lydia Miller-Jones" & change the interviewer to Sylvia Palmer. Click Save.
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Lydia Miller-Jones"}
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"))

    // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    // 7. Wait until interview with new student and interviewer info is displayed.
    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"))

    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();
    expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument();

    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spots remaining".
    const days = getAllByTestId(container, "day");
    const day = days.find(day => queryByText(day, "Monday")); 

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  })

  it("shows the save error when failing to save an appointment", async() => {

    const {container, debug} = render(<Application />); 
    
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: {value: "Lydia Miller-Jones"}
    })
    
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"))
    expect(getByText(appointment, /Error/i)).toBeInTheDocument(); 
    expect(getByText(appointment, /can't save the appointment!/i)).toBeInTheDocument(); 

    //click close button, then go back to form
    fireEvent.click(getByAltText(appointment, "Close"));
    expect(getByPlaceholderText(appointment, /enter student name/i)).toBeInTheDocument();
  })
  

  it("shows the delete error when failing to delete an appointment", async() => {
    const {container, debug} = render(<Application />); 
    axios.delete.mockRejectedValueOnce();

    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find(appointment => queryByText(appointment, "Archie Cohen"))

    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(getByText(appointment, /Delete the appointment?/i)).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"))

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText(appointment, "Deleting"))
    
    expect(getByText(appointment, /Error/i)).toBeInTheDocument(); 
    expect(getByText(appointment, /Can't delete the appointment!/i)).toBeInTheDocument(); 

    //click close button, then go back to show
    fireEvent.click(getByAltText(appointment, "Close"));
    
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();

   
  })

})
