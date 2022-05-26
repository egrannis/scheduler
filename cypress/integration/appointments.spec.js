describe("Appointments", () => {

  beforeEach(() => {
    // Reset the database before each test
    cy.request("GET", "/api/debug/reset");

    // Render the homepage
    cy.visit("/");
    cy.contains("Monday");
  });


  it("should book an interview", () => {
    // click the "add" button in the second appointment
    cy.get("[alt=Add]")
      .first() // need to use first because there are 2 add buttons (we hide the second one because it is part of the last appointment, where we only want to display the header)
      .click();

    // types student name into the input field
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");

    // selects interviewer
    cy.get("[alt='Sylvia Palmer']").click();

    // clicks "save" button
    cy.contains("Save")
      .click();

    // Views the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {

    // finds the edit button and forces the click action
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });

    // clears the input field for student name and types new text
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");

    // selects a different interviewer and clicks
    cy.get("[alt='Tori Malcolm']")
      .click();

    // clicks the save button
    cy.contains("Save")
      .click();

    // verifies that it now contains the updated student and interviewer names
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {

    // finds the delete button and forces a click 
    cy.get("[alt=Delete]")
      .click({ force: true });

    // finds the confirm button and clicks
    cy.contains("Confirm")
      .click();

    // checks that the deleting message should exist
    cy.contains("Deleting")
      .should("exist");

    // checks that the deleting message goes away
    cy.contains("Deleting")
      .should("not.exist");

    // checks that the appointment card for the deleted appointment no longer shows up on the page
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });

});
