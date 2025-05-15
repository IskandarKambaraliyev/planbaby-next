// cypress/components/Button.cy.tsx
import { mount } from "cypress/react";
import Button from "@/components/custom/Button";
import { TestProviders } from "@/test-utils/TestProviders";

describe("<Button />", () => {
  it("renders as a button and triggers onClick", () => {
    const handleClick = cy.stub().as("onClick");
    mount(
      <TestProviders>
        <Button onClick={handleClick}>Click me</Button>
      </TestProviders>
    );
    cy.contains("Click me").click();
    cy.get("@onClick").should("have.been.called");
  });

  it("renders as a link when href is provided", () => {
    mount(
      // Adjust the locale as needed
      <TestProviders locale="uz">
        <Button href="/about">Go to about</Button>
      </TestProviders>
    );
    cy.get("a").should("have.attr", "href", "/uz/about"); // Adjust based on your locale
  });

  it("is disabled when disabled prop is true", () => {
    mount(
      <TestProviders>
        <Button disabled>Disabled</Button>
      </TestProviders>
    );
    cy.get("button").should("be.disabled");
  });

  it("shows ripple effect on click", () => {
    mount(
      <TestProviders>
        <Button>Ripple</Button>
      </TestProviders>
    );
    cy.contains("Ripple").click();
    cy.get(".absolute").should("have.css", "display", "block");
  });

  it("applies correct size and color classes", () => {
    mount(
      <TestProviders>
        <Button size="sm" color="pink">
          Styled
        </Button>
      </TestProviders>
    );
    cy.get("button")
      .should("have.class", "py-1")
      .and("have.class", "bg-pink-main");
  });

  it("applies outlined variant", () => {
    mount(
      <TestProviders>
        <Button outlined color="green">
          Outlined
        </Button>
      </TestProviders>
    );
    cy.get("button").should("have.class", "border-green-main");
  });

  it("hides ripple when disabled", () => {
    mount(
      <TestProviders>
        <Button disabled>Disabled Ripple</Button>
      </TestProviders>
    );
    cy.get(".absolute").should("have.css", "display", "none");
  });

  it("renders with link icon if linkIcon is true", () => {
    mount(
      <TestProviders>
        <Button linkIcon>Icon Button</Button>
      </TestProviders>
    );
    cy.get("svg").should("have.class", "size-6");
  });
});
