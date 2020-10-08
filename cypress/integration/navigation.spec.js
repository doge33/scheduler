describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should find the list item of Tuesday and click it", () => {
    cy.visit("/");
    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    .should("have.class", "day-list__item--selected") 
  })
});