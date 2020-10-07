import React from "react";

import { render, cleanup, screen, waitForElement, fireEvent, getByText, getByTestId, getAllByTestId, prettyDOM, getByAltText, getByPlaceholderText, getNodeText, waitForElementToBeRemoved, queryByText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

//this is async!
  it("defaults to Monday and changes the schedule when a new day is selected", async() => {

    const {getByText} = render(<Application />);

    //wait for getByText to find the first element that contains text "Monday"
    //returns a promise! This promise resolves when the callback getByText("Monday") returns a truthy value; reject after a timeout.
    //only when this promise either resolves OR rejects will JEST continue the test. 
    await waitForElement(() => getByText("Monday")) // async/await replaced the return waitForElement.... .then 
    fireEvent.click(getByText("Tuesday"))
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
    
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async() => {

    const {container, debug} = render(<Application />); //container represents the DOM that we are working with. the return by render is automatically scoped to the document.body
    
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    
    //console.log(prettyDOM(appointment));//here we need to scope the query to the specific part of the DOM tree - the <article>
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

    //console.log(prettyDOM(appointment));

    const days = getAllByTestId(container, "day");
    
    const day = days.find(day => queryByText(day, "Monday")); //this gives you the specific <li> node that contains "Monday"

    //debug(day);

    //getByText to find "no spots remaining" wont work here, as in the DayListItem, the text is actually conditionally rendered/broken into many places.
    const text = getNodeText(day.querySelector("h3")) //

    expect(getByText(day, text)).toBeInTheDocument();
  })

})