import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom"

import Profile from "./index"

import fakeUserData from "../../_test_data/user.json"

import useUser from "../../api/user"

afterEach(cleanup)


jest.mock("../../api/user");

describe("Profile Page", () => {

  it('renders to the document with all data', () => {

    useUser.mockReturnValue({
      user: {
        first_name: "John",
        last_name: "Doe ",
        email: "jd1122@njit.edu",
        dept_name: "Computer Science",
        phone_no: "123456839",
        address: "101 Barton Street, Apt 02, New York City, New York",
        is_staff: true
      },
      isLoading: false,
      isError: undefined
    });


    const { getByText, getByRole } = render(
      // <TestProviderWrapper {...data_state} >
      <MemoryRouter initialEntries={["/profile"]}>
        <Profile />
      </MemoryRouter>
      // </TestProviderWrapper>
    )

    expect(getByText(fakeUserData.email)).toBeInTheDocument()
    expect(getByText(fakeUserData.dept_name)).toBeInTheDocument()
    expect(getByText("John Doe")).toBeInTheDocument()

    expect(getByText(fakeUserData.phone_no)).toBeInTheDocument()
    expect(getByText(fakeUserData.address)).toBeInTheDocument()

    expect(getByRole('button', { name: /Edit Profile/i })).toBeInTheDocument()
    expect(getByRole('button', { name: /Go Back/i })).toBeInTheDocument()

  })

  it('renders loading state', () => {

    useUser.mockReturnValue({
      user: undefined,
      isLoading: true,
      isError: undefined
    });


    const { container } = render(
      <MemoryRouter initialEntries={["/profile"]}>
        <Profile />
      </MemoryRouter>
    )

    expect(container.querySelector(".react-loading-skeleton")).toBeInTheDocument()

  })

  it('renders error page - when fails to fetch user', () => {

    useUser.mockReturnValue({
      user: undefined,
      isLoading: false,
      isError: {
        info: { message: "user not found" },
        status: 404
      }
    });

    const { getByText } = render(
      <MemoryRouter initialEntries={["/profile"]}>
        <Profile />
      </MemoryRouter>
    )

    expect(getByText('user not found')).toBeInTheDocument()
    expect(getByText('404')).toBeInTheDocument()

  })

  // it('verify links are correct', () => {

  //   useUser.mockReturnValue({
  //     user: {
  //       first_name: "John",
  //       last_name: "Doe ",
  //       email: "jd1122@njit.edu",
  //       dept_name: "Computer Science",
  //       phone_no: "123456839",
  //       address: "101 Barton Street, Apt 02, New York City, New York",
  //       is_staff: true
  //     },
  //     isLoading: false,
  //     isError: undefined
  //   });

  //   const { getByRole } = render(
  //     <MemoryRouter initialEntries={["/profile"]}>
  //       <Profile />
  //     </MemoryRouter>
  //   )

  //   expect(getByRole('link', { name: /edit/i })).toHaveAttribute("pathname", "/profile/edit")
  // })

})