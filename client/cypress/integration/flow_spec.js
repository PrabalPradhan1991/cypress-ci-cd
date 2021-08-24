describe("Open capa team", function () {
  it("Visits the Kitchen Sink", function () {
    let confirmationCode;
    cy.visit(Cypress.config().baseUrl);
    cy.findByText("Neues Projekt").click();

    cy.get("form").within(() => {
      cy.findByRole("textbox", { name: /Projektname/i })
        .click()
        .type("abc");

      cy.findByRole("textbox", { name: /Projektname/i }).should(
        "have.attr",
        "aria-invalid"
      );

      cy.findByRole("textbox", { name: /Projektname/i })
        .click()
        .type("d");

      cy.findByRole("textbox", { name: /Projektname/i }).should(
        "not.have.attr",
        "aria-invalid"
      );

      cy.findByRole("textbox", { name: /Organisation/i })
        .click()
        .type("abc");

      cy.findByRole("textbox", { name: /Organisation/i }).should(
        "have.attr",
        "aria-invalid"
      );

      cy.findByRole("textbox", { name: /Organisation/i })
        .click()
        .type("d");

      cy.findByRole("textbox", { name: /Organisation/i }).should(
        "not.have.attr",
        "aria-invalid"
      );

      cy.findByRole("textbox", { name: /Projektverantwortlicher/i })
        .click()
        .type("abc");

      cy.findByRole("textbox", { name: /Projektverantwortlicher/i }).should(
        "have.attr",
        "aria-invalid"
      );

      cy.findByRole("textbox", { name: /Projektverantwortlicher/i })
        .click()
        .type("d");

      cy.findByRole("textbox", { name: /Projektverantwortlicher/i }).should(
        "not.have.attr",
        "aria-invalid"
      );

      cy.findByRole("textbox", { name: /E-Mailadresse/i })
        .click()
        .type("kri");

      cy.findByRole("textbox", { name: /E-Mailadresse/i }).should(
        "have.attr",
        "aria-invalid"
      );

      cy.findByRole("textbox", { name: /E-Mailadresse/i })
        .click()
        .type("s.hagenes@ethereal.email");

      cy.findByRole("textbox", { name: /E-Mailadresse/i }).should(
        "not.have.attr",
        "aria-invalid"
      );

      cy.findByRole("button", { name: /Neues Projekt/i }).click();
    });

    cy.task("getLastEmail")
      .its("html")
      .then((html) => {
        const test = Cypress.$(html).find("strong")[1].innerText;

        expect(test).to.contain("Dein Bestätigungscode:");
        confirmationCode = test.split("Dein Bestätigungscode: ")[1];

        cy.findByRole("textbox", { name: /Bestätigungscode/i })
          .click()
          .type(confirmationCode);

        cy.findByRole("button", { name: /E-Mail bestätigen/i }).click();

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

        cy.findByText("Projekt erfolgreich erstellt");

        cy.get("button").click();

        cy.findByText("Die verschieden Feldtypen");
      });
  });
});
