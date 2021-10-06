describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  // navigating to day
  it("should navigate to Tuesday", () => {
    cy.visit("/");

    cy.get("[data-testid=Tuesday]")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});
