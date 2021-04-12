import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from "react-router-dom"

import ProfileEdit from "./index"

import fakeUserData from "../../../_test_data/user.json"

import useUser from "../../../api/user"
import UpdateUserProfile from "../../../api/user/updateProfile"

afterEach(cleanup)


jest.mock("../../../api/user");
jest.mock("../../../api/user/updateProfile.js")


describe("Edit Profile Page", () => {

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


    const { getByText, getByLabelText, getByRole } = render(
      // <TestProviderWrapper {...data_state} >
      <MemoryRouter initialEntries={["/profile/edit"]}>
        <ProfileEdit />
      </MemoryRouter>
      // </TestProviderWrapper>
    )

    expect(getByText(fakeUserData.email)).toBeInTheDocument()
    expect(getByText(fakeUserData.dept_name)).toBeInTheDocument()

    // expect(getByRole('textbox', { name: /First Name/i })).toBeInTheDocument()
    expect(getByLabelText('First Name')).toBeInTheDocument()
    expect(getByLabelText('Last Name')).toBeInTheDocument()
    expect(getByLabelText('Phone Number')).toBeInTheDocument()
    expect(getByLabelText('Address')).toBeInTheDocument()

    expect(getByLabelText('First Name')).toHaveValue(fakeUserData.first_name)
    expect(getByLabelText('Last Name')).toHaveValue(fakeUserData.last_name)
    expect(getByLabelText('Phone Number')).toHaveValue(fakeUserData.phone_no)
    expect(getByLabelText('Address')).toHaveValue(fakeUserData.address)

    expect(getByRole('button', { name: /Update/i })).toBeInTheDocument()
    expect(getByRole('button', { name: /Go Back/i })).toBeInTheDocument()
  })

  it('successfully update user profile', () => {

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

    UpdateUserProfile.mockReturnValue({ "msg": "Success Profile is Updated" })

    const { getByLabelText, getByRole } = render(
      <MemoryRouter initialEntries={["/profile/edit"]}>
        <ProfileEdit />
      </MemoryRouter>
    )

    expect(getByLabelText('Last Name')).toHaveValue(fakeUserData.last_name)
    userEvent.clear(getByLabelText('Last Name'))

    userEvent.type(getByLabelText('Last Name'), 'Mason')
    // console.log(getByLabelText('Last Name'));

    expect(getByLabelText('Last Name')).toHaveValue("Mason")
    fireEvent.click(getByRole('button', { name: /Update/i }))

    expect(UpdateUserProfile).toHaveBeenCalledTimes(1)

    // expect(getByRole('button', { name: /Update/i })).toBeInTheDocument()
    // expect(getByRole('link', { name: /edit/i })).toHaveAttribute("pathname", "/profile/edit/edit")
  })

  it('Fails to update user profile', () => {
    // ! Note this is test is incomplete 

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

    UpdateUserProfile.mockImplementation(() => Promise.reject({ last_name: { message: "First name is a required feild" } }))

    act(() => {
      render(
        <MemoryRouter initialEntries={["/profile/edit"]}>
          <ProfileEdit />
        </MemoryRouter>
      )
    })

    expect(screen.getByLabelText('Last Name')).toHaveValue(fakeUserData.last_name)
    userEvent.clear(screen.getByLabelText('Last Name'))
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /Update/i }))
    })

    // console.log(container)
    // expect(container.querySelector(".error")).toBeInTheDocument()

    // expect(getByRole('button', { name: /Update/i })).toBeInTheDocument()
    // expect(getByRole('link', { name: /edit/i })).toHaveAttribute("pathname", "/profile/edit/edit")
  })

  it('renders loading state', () => {

    useUser.mockReturnValue({
      user: undefined,
      isLoading: true,
      isError: undefined
    });

    const { container } = render(
      <MemoryRouter initialEntries={["/profile/edit"]}>
        <ProfileEdit />
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
      <MemoryRouter initialEntries={["/profile/edit"]}>
        <ProfileEdit />
      </MemoryRouter>
    )

    expect(getByText('user not found')).toBeInTheDocument()
    expect(getByText('404')).toBeInTheDocument()

  })



})