describe("Open capa team", function () {
  it("Visits the Kitchen Sink", function () {
    cy.visit(Cypress.config().baseUrl);
    cy.get("span");
    cy.findByText("Neues Projekt").click();
    cy.findByText("Projektname").click().type("Project name");

    cy.findByText("Organisation/Teamname").click().type("Team Name");

    cy.findByText("Projektverantwortlicher").click().type("PM Name");

    cy.findByText("E-Mailadresse").click().type("example@asd.com");

    cy.findByRole("button", { name: /Projekt anlegen/i });
  });
});
