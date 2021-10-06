describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  // booking an interview
  it("should book an interview", () => {
    cy.get("[data-testid=Add]").first().click();
    cy.get("[data-testid=inputStudentName]").type("Sharon");
    cy.get("[data-testid='Sylvia Palmer']").click();
    cy.get("[data-testid=Save]").click();
    cy.contains(".appointment__card-left", "Sharon");
    cy.contains(".appointment__card-left", "Sylvia Palmer");
  });

  // edit the existing appointment booked for "Archie Cohen"
  it("should edit an appointment", () => {
    cy.get("[data-testid=Edit]").first().click({ force: true });
    cy.get("[data-testid=inputStudentName]").clear().type("Sharon");
    cy.get("[data-testid='Tori Malcolm']").click();
    cy.get("[data-testid=Save]").click();
    cy.contains(".appointment__card-left", "Sharon");
    cy.contains(".appointment__card-left", "Tori Malcolm");
  });

  // cancel an interview
  it.only("should cancel an interview", () => {
    cy.get("[data-testid=Delete]").click({ force: true });
    cy.get("[data-testid=Confirm]").click();
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    cy.contains(".appointment__card", "Archie Cohen").should("not.exist");
  });
});
