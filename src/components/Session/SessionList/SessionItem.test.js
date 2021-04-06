import React from 'react';
import { render, cleanup } from '@testing-library/react';

import SessionItem from './SessionItem'

import { MemoryRouter } from 'react-router-dom'

afterEach(cleanup)

// Unit Test Cases for Session Item Component 
describe('Session Item Component', () => {

  it("renders to the document", () => {
    const session = {
      course_id: 1,
      course_string: "cs 675",
      session_id: 1,
      session_name: "001",
      course_name: "Software Architecture",
      term: "Fall",
      year: 2021,
      url: "/cs/675/session/001"
    }
    const { getByText } = render(
      <SessionItem session={session} index={1} />
      , { wrapper: MemoryRouter }
    )

    expect(getByText("Software Architecture")).toBeInTheDocument();
    expect(getByText("CS 675")).toBeInTheDocument();
    expect(getByText("001")).toBeInTheDocument();
    expect(getByText("Fall 2021")).toBeInTheDocument();
  })

  it("renders loading state in absence of data", () => {

    const { container } = render(<SessionItem />)
    const LoadingElement = container.getElementsByClassName("react-loading-skeleton")
    expect(LoadingElement.length).toBe(1);
  })

})