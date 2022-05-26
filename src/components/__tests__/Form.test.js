import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];


  it("renders without student name if not provided", () => {
    // Render the form with an interviewers prop
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    // Since no student name was entered and it wasn't passed as a prop, it should be blank
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    // Render the form with an interviewers prop and a student prop
    const { getByTestId } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones" />
    );
    // Expect the student name input to have the value that was passed to the student prop
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    // Create the mock onSave function
    const onSave = jest.fn();
    // Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
    // Click the save button
    fireEvent.click(getByText('Save'));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    // onSave is not called
    expect(onSave).not.toHaveBeenCalled();
  });

  it("validates that the interviewer cannot be null", () => {
    // Create the mock onSave function
    const onSave = jest.fn();
    // Render the form with interviewers, onSave, and student props (interviewer is not set as a prop here)
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} student="Lydia Miller-Jones" />
    );
    // Click the save button
    fireEvent.click(getByText("Save"));
    // Expect to see an error message to pop up
    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    // Because interviewer was missing, expect onSave to not be called
    expect(onSave).not.toHaveBeenCalled();
  });

  it("can successfully save after trying to submit an empty student name", () => {
    // Create the mock onSave function
    const onSave = jest.fn();
    // Render the form with interviewers, onSave, and interviewer (student is not set as a prop here)
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} interviewer={interviewers[0].name} />
    );
    // Click the save button
    fireEvent.click(getByText("Save"));
    // Expect to see the student error message to pop up
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    // Expect onSave to not have gotten called
    expect(onSave).not.toHaveBeenCalled();
    // Enter a student name into the field
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    // Click save again
    fireEvent.click(getByText("Save"));
    // Expect error message to have gone away
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    // Because the student and interviewers values are both truthy / pass validate function, it should have been called once
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", interviewers[0].name); // added interviewer here in lieu of null so it would pass
  });

  it("calls onCancel and resets the input field", () => {
    // Create the mock onSave function
    const onCancel = jest.fn();
    // Render the form with interviewers, stuedent, onSave, and onCancel
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        student="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
    // Click the save button
    fireEvent.click(getByText("Save"));
    // Enter a student name
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    // Click the cancel button
    fireEvent.click(getByText("Cancel"));
    // Because cancel was called, the error message should have gone away
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    // Enter student name field should have been reset to blank as a result of clicking cancel
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
    // Expect onCancel to have been called once
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

});