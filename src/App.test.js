import { render, screen } from "@testing-library/react";
import App from "./App";
import mockFetch from "./mocks/mockFetch";

beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation(mockFetch);
})

afterEach(() => {
  jest.restoreAllMocks()
});

test("renders the landing page", async () => {
  render(<App/>);


  expect(screen.getByRole("banner")).toHaveTextContent(/Doggy Directory/);
  expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a breed");
  expect(await screen.findByRole("option", {name: "husky"})).toBeInTheDocument();
  expect(screen.getByRole("button", {name: "Search"})).toBeDisabled();
  expect(screen.getByRole("img")).toBeInTheDocument();
});
