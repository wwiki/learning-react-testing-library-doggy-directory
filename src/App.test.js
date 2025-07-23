import { render, screen,waitForElementToBeRemoved } from "@testing-library/react";
import App from "./App";
import mockFetch from "./mocks/mockFetch";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation(mockFetch);
})

afterEach(() => {
  jest.restoreAllMocks()
});

test("should be able to search and display dog image results", async () => {
  render(<App/>);


  const select = screen.getByRole("combobox");
  expect(await screen.findByRole("option", {name: "husky"})).toBeInTheDocument();
  userEvent.selectOptions(select, "husky");
  expect(select).toHaveValue("husky");

  //Simulate initiating the search request
  const searchBtn = screen.getByRole("button", { name: "Search" });
  expect(searchBtn).not.toBeDisabled();  // The toBeDisabled jest-dom matcher will verify that the search button is not disabled when a breed selection is made.
  userEvent.click(searchBtn);

  //Loading state displays and gets removed once results are displayed
  // queryByText within the waitForElementToBeRemoved callback checks for the absence of an element without throwing an error.
  await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i));

  //Verify image display and results count
  const dogImages = screen.getAllByRole("img");
  console.log(dogImages);
  expect(dogImages).toHaveLength(2);
  expect(screen.getByText(/2 Results/i)).toBeInTheDocument();
  expect(dogImages[0]).toHaveAccessibleName("husky 1 of 2");
  expect(dogImages[1]).toHaveAccessibleName("husky 2 of 2");
});
