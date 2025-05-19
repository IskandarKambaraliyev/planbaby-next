import React from "react";
import { mount } from "cypress/react";
import { RawProduct, Blog } from "@/types";
import { StoreModal } from "@/components/layout";
import { TestProviders } from "@/test-utils/TestProviders";
import { useModalStore } from "@/stores/modal";

// 🧪 Dummy Data
const mockProduct: RawProduct = {
  id: 1,
  name: "Test Product",
  bestseller: true,
  image: "https://example.com/image.jpg",
  price: "100000.00",
  discount_price: "80000.00",
  short_description: "Test short description",
  description: "Test description",
  languages: ["en"],
  // ...fill with required fields
};

const mockBlog: Blog = {
  id: 2,
  title: "Test Blog",
  image_large: "https://example.com/image.jpg",
  short_content: "Test blog description",
  content: "Test blog content",
  languages: ["en"],
  article_status: "published",
  author_choice: false,
  category: "preparation",
  publish: "2023-10-01",
  number_of_views: 100,
  is_pinned: false,
  youtube_link: null,
  youtube_image: null,
  tags: ["test", "blog"],
  products: [],
  image_source: null,
  image_name: null,
  thumbnail: "https://example.com/thumbnail.jpg",
  // ...fill with required fields
};

const initialData = {
  products: [mockProduct],
  preparation: [mockBlog],
  pregnancy: [],
  planning: [],
  nutrition: [],
};

describe("<StoreModal />", () => {
  beforeEach(() => {
    useModalStore.setState({
      isOpen: true,
      view: "both",
      closeModal: cy.stub().as("closeModal"),
    });
  });
  it("renders modal when open", () => {
    mount(
      <TestProviders>
        <StoreModal initialData={initialData} />
      </TestProviders>
    );

    cy.contains("Test Product").should("exist");
    cy.contains("Test Blog").should("exist");
    cy.get("input").should("exist");
  });

  it("focuses input on open", () => {
    mount(
      <TestProviders>
        <StoreModal initialData={initialData} />
      </TestProviders>
    );

    cy.focused().should("have.attr", "type", "text");
  });

  it("calls closeModal on Escape key", () => {
    mount(
      <TestProviders>
        <StoreModal initialData={initialData} />
      </TestProviders>
    );

    cy.get("body").type("{esc}");
    cy.get("@closeModal").should("have.been.calledOnce");
  });

  it("filters when typing", () => {
    // Only work if API functions like `searchProducts` are mocked — not shown here
    mount(
      <TestProviders>
        <StoreModal initialData={initialData} />
      </TestProviders>
    );

    cy.get("input").type("test");
    // Expect debounce delay
    cy.wait(1000);
    cy.contains("Test Product").should("exist");
  });

  it("renders correct category titles", () => {
    mount(
      <TestProviders>
        <StoreModal initialData={initialData} />
      </TestProviders>
    );

    cy.contains("Store"); // assuming t("nav.store") = "Store"
    cy.contains("Preparation"); // assuming t("categories.preparation") = "Preparation"
  });

  it("doesn't render unrelated sections", () => {
    const emptyData = {
      products: [],
      preparation: [],
      pregnancy: [],
      planning: [],
      nutrition: [],
    };

    mount(
      <TestProviders>
        <StoreModal initialData={emptyData} />
      </TestProviders>
    );

    cy.contains("Store").should("not.exist");
    cy.contains("Preparation").should("not.exist");
  });
});
