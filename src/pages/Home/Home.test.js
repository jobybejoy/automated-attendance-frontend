import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom"

import Home from "./index"

import fakeSessionData from "../../_test_data/sessions.json"
import fakeUserData from "../../_test_data/user.json"

import TestProviderWrapper from "../../context/_TestProvider"


afterEach(cleanup)

// Unit Test for Home Page
describe('Home Page', () => {
  // Test when all data is fetched correctly
  it('renders to the document with all data', () => {

    const data_state = {
      user: fakeUserData,
      isUserLoading: false,
      isUserError: undefined,
      sessions: fakeSessionData,
      isSessionsLoading: false,
      isSessionsError: undefined,
    }

    const { getByText } = render(
      <TestProviderWrapper {...data_state} >
        <MemoryRouter >
          <Home />
        </MemoryRouter>
      </TestProviderWrapper>
    )

    fakeSessionData.forEach(session => {
      expect(getByText(session.course_name)).toBeInTheDocument()
    });

    expect(getByText(/logout/i)).toBeInTheDocument()

  })

  // Test when all data is Loading
  it('renders loading state when fetching data', () => {

    const data_state = {
      user: undefined,
      isUserLoading: true,
      isUserError: undefined,
      sessions: undefined,
      isSessionsLoading: true,
      isSessionsError: undefined,
    }

    const { container } = render(
      <TestProviderWrapper {...data_state} >
        <MemoryRouter >
          <Home />
        </MemoryRouter>
      </TestProviderWrapper>
    )
    // Total 4 Loading - 1 Nav + 3Sessions
    expect(container.querySelectorAll('.react-loading-skeleton').length).toEqual(4)

  })

  // Test when User data is fetched correctly and 
  // when Sessions Data Failed 
  it('shows error when fails to fetch sessions', () => {

    const data_state = {
      user: fakeUserData,
      isUserLoading: false,
      isUserError: undefined,
      sessions: undefined,
      isSessionsLoading: false,
      isSessionsError: {
        info: { message: "sessions not found" },
        status: 404
      },
    }

    const { getByText } = render(
      <TestProviderWrapper {...data_state} >
        <MemoryRouter >
          <Home />
        </MemoryRouter>
      </TestProviderWrapper>
    )

    expect(getByText(data_state.isSessionsError.info.message)).toBeInTheDocument()
    expect(getByText(data_state.isSessionsError.status)).toBeInTheDocument()
  })

  // Test when User Failed
  it('shows error when fails to fetch user', () => {

    const data_state = {
      user: fakeUserData,
      isUserLoading: false,
      isUserError: {
        info: { message: "user not found" },
        status: 404
      },
      sessions: undefined,
      isSessionsLoading: true,
      isSessionsError: undefined,
    }

    const { getByText } = render(
      <TestProviderWrapper {...data_state} >
        <MemoryRouter >
          <Home />
        </MemoryRouter>
      </TestProviderWrapper>
    )

    expect(getByText(data_state.isUserError.info.message)).toBeInTheDocument()
    expect(getByText(data_state.isUserError.status)).toBeInTheDocument()
  })

})