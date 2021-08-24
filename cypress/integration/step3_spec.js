describe("Open capa team", function () {
  it("Visits the Kitchen Sink", function () {
    cy.visit(Cypress.config().baseUrl);
    cy.findByText("Neues Projekt").click();

    // cy.get("#sprintInterval-uid1")

    cy.findByRole("textbox", { name: /Interval länge/i }).click({
      force: true,
    });
    cy.findByText("1 Woche").click();
    cy.get("#aria-selection")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).equal("option 1 Woche, selected.");
      });

    cy.findAllByRole("presentation")
      .first()
      .click()
      .within(() => {
        cy.get('[data-today="true"]').click();
      });

    cy.findByRole("button", { name: /Sprint anlegen/i }).click();
  });
});
