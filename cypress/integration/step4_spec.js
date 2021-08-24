describe("Open capa team", function () {
  it("Visits the Kitchen Sink", function () {
    cy.visit(Cypress.config().baseUrl);
    cy.findByText("Neues Projekt").click();

    cy.get("button").click();

    cy.findByText("Die verschieden Feldtypen");
  });
});
