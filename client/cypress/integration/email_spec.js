describe("Email Confirmation", function () {
  it("Visits the Kitchen Sink", function () {
    cy.visit(Cypress.config().baseUrl);

    cy.task("getLastEmail")
      .its("html")
      .then((html) => {
        const test = Cypress.$(html).find("strong")[1].innerText;

        expect(test).to.contain("Dein Bestätigungscode:");
        const code = test.split("Dein Bestätigungscode: ")[1];

        cy.document({ log: false }).invoke({ log: false }, "write", html);

        cy.contains("Dein Bestätigungscode:")
          .invoke("text")
          .then((code) => {
            const confitmationCode = code.split("Dein Bestätigungscode:")[1];

            cy.log(`**confirm code ${confitmationCode} works**`);
          });
      });

    cy.log("**email has the user name**");

    // cy.go("back");
    // cy.document();
  });
});
