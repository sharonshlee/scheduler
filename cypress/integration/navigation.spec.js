describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");

    cy.get("[data-testid=Tuesday]")
      .click()
      .should("have.class", "day-list__item--selected");
  });

  // it("should book an interview", () => {
  //   cy.visit("/");

  //   cy.get("[data-testid=Tuesday]").click();

  //   cy.get(".appointment__add-button").first().click();
  // });
});
