import React from 'react';
import { render, cleanup } from '@testing-library/react';

import SessionList from './index'

import { MemoryRouter } from 'react-router-dom'

afterEach(cleanup)

// Unit Test Cases for Session Item Component 
describe('Session List Component', () => {

  it("renders to the document", () => {
    const sessions = [
      { course_id: 1, session_id: 1, course_name: "Software Architecture", course_string: "cs 675", session_name: "001", term: "Fall", year: 2021 },
      { course_id: 2, session_id: 4, course_name: "Software Testing and Quality Assurance", course_string: "cs 684", session_name: "004", term: "Fall", year: 2021 },
      { course_id: 3, session_id: 7, course_name: "Java Programming", course_string: "cs 602", session_name: "001", term: "Fall", year: 2021 }
    ]

    const { getByText } = render(
      <SessionList sessions={sessions} />
      , { wrapper: MemoryRouter }
    )

    expect(getByText("Software Architecture")).toBeInTheDocument();
    expect(getByText("Software Testing and Quality Assurance")).toBeInTheDocument();
    expect(getByText("Java Programming")).toBeInTheDocument();

  })

  it("renders loading state in absence of data", () => {
    const { container } = render(<SessionList />)
    const LoadingElement = container.getElementsByClassName("react-loading-skeleton")
    expect(LoadingElement).toBeTruthy();
  })

  it("renders loading state using loading prop", () => {
    const { container } = render(<SessionList loading={true} />)
    const LoadingElement = container.getElementsByClassName("react-loading-skeleton")
    expect(LoadingElement).toBeTruthy();
  })


  it("emety state - when sessions is empty", () => {
    const sessions = []

    const { getByText } = render(
      <SessionList sessions={sessions} />
      , { wrapper: MemoryRouter }
    )

    expect(getByText(/no sessions/i, { exact: false })).toBeInTheDocument();

  })

})