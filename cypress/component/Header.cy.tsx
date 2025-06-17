import { mount } from "cypress/react";
import Header from "../../components/layout/header/Header";
import { TestProviders } from "@/test-utils/TestProviders";

describe("<Header /> responsive behavior", () => {
  const phoneNumber = "tel:+998712000807";

  it("displays call link on desktop", () => {
    cy.viewport(1280, 800); // Desktop size

    mount(
      <TestProviders>
        <Header />
      </TestProviders>
    );

    cy.contains("+998")
      .should("be.visible")
      .and("have.attr", "href", phoneNumber);
  });

  it("hides call link on mobile", () => {
    cy.viewport("iphone-6"); // iPhone size, or (375, 667)

    mount(
      <TestProviders>
        <Header />
      </TestProviders>
    );

    cy.contains("+998").should("not.be.visible");
  });
});
