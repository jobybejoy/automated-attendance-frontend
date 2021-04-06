import React from 'react';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';

import { Navbar, getSession } from './index';
import { createMemoryHistory } from 'history'

// import { useContext, useProvider } from "react";

// import { UserContext } from "../../../context/UserContext"
// import { SessionsContext } from "../../../context/SessionsContext"

import { MemoryRouter, BrowserRouter } from 'react-router-dom'

afterEach(cleanup)

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, { wrapper: BrowserRouter })
}

describe('Navbar (Default) Component', () => {

  describe("renders Navbar to document", () => {

    beforeEach(() => {
      const user = {
        address: "101 Manor Ave Harrison NJ 07029",
        dept_name: "Computer Science",
        email: "gm1@njit.edu",
        first_name: "Gayathri",
        is_staff: true,
        last_name: "Murugesan",
        phone_no: "123456839",
      }

      render(
        <MemoryRouter>
          <Navbar user={user} />
        </MemoryRouter>
      );
    });

    it("checks if name is displayed", () => {
      const HelloText = screen.getByText("Hello, Gayathri Murugesan")
      expect(HelloText).toBeInTheDocument();
    })

    it("checks if profile img is displayed", () => {
      const UserImage = screen.getByRole('img')
      expect(UserImage).toBeInTheDocument();
      // Also check if there is a src and an alt text
      expect(UserImage.getAttribute('src')).toBeTruthy();
      expect(UserImage.getAttribute('alt')).toBeTruthy();
    })

    // * TODO  -- Test clicking on the profile image


  })


})

describe("getSession() function", () => {

  it("checks getSession() fetches the correct session", () => {
    const sessions = [
      { course_id: 1, session_id: 1, course_name: "Software Architecture", course_string: "cs 675", session_name: "001", term: "Fall", year: 2021 },
      { course_id: 2, session_id: 4, course_name: "Software Testing and Quality Assurance", course_string: "cs 684", session_name: "004", term: "Fall", year: 2021 },
      { course_id: 3, session_id: 7, course_name: "Java Programming", course_string: "cs 602", session_name: "001", term: "Fall", year: 2021 }
    ]

    const expected_session = { course_id: 1, session_id: 1, course_name: "Software Architecture", course_string: "cs 675", session_name: "001", term: "Fall", year: 2021 }

    const selected_session = getSession({ sessions, department: "cs", course_number: "675", session_id: "001" })

    expect(selected_session).toEqual(expected_session)
  })

  it("checks getSession() doesnt filter for bad input", () => {
    const sessions = [
      { course_id: 1, session_id: 1, course_name: "Software Architecture", course_string: "cs 675", session_name: "001", term: "Fall", year: 2021 },
      { course_id: 2, session_id: 4, course_name: "Software Testing and Quality Assurance", course_string: "cs 684", session_name: "004", term: "Fall", year: 2021 },
      { course_id: 3, session_id: 7, course_name: "Java Programming", course_string: "cs 602", session_name: "001", term: "Fall", year: 2021 }
    ]

    const expected_session = { course_id: 1, session_id: 1, course_name: "Software Architecture", course_string: "cs 675", session_name: "001", term: "Fall", year: 2021 }

    // Calling getSession() w/ bad input -- departement actual -> "cs" but - invoked w/ department "ee"
    const selected_session = getSession({ sessions, department: "ee", course_number: "675", session_id: "001" })

    expect(selected_session).not.toEqual(expected_session)
  })
})


describe("Navbar (Sesssion Header) Component", () => {
  describe("renders Session Header to document", () => {

    beforeEach(() => {
      // To render SessionHeader we following data - user & sessions
      const user = {
        address: "101 Manor Ave Harrison NJ 07029",
        dept_name: "Computer Science",
        email: "gm1@njit.edu",
        first_name: "Gayathri",
        is_staff: true,
        last_name: "Murugesan ",
        phone_no: "123456839",
      }

      const sessions_data = [
        { course_id: 1, session_id: 1, course_name: "Software Architecture", course_string: "cs 675", session_name: "001", term: "Fall", year: 2021 },
        { course_id: 2, session_id: 4, course_name: "Software Testing and Quality Assurance", course_string: "cs 684", session_name: "004", term: "Fall", year: 2021 },
        { course_id: 3, session_id: 7, course_name: "Java Programming", course_string: "cs 602", session_name: "001", term: "Fall", year: 2021 }
      ]

      render(
        (<Navbar user={user} sessions={sessions_data} department={"cs"} course_number={"675"} session_id={"001"} />)
        , { wrapper: MemoryRouter }
      );
    });

    it("checks if course name is displayed", () => {
      const SessionName = screen.getByText("Software Architecture", { exact: true })
      expect(SessionName).toBeInTheDocument();
    })

    it("checks if course id is displayed", () => {
      const CourseID = screen.getByText("CS 675", { exact: true })
      expect(CourseID).toBeInTheDocument();
    })

    it("checks if term year is displayed", () => {
      const TermAndYear = screen.getByText("Fall 2021", { exact: true })
      expect(TermAndYear).toBeInTheDocument();
    })

    it("checks if profile img is displayed", () => {
      const UserImage = screen.getByRole('img')
      expect(UserImage).toBeInTheDocument();
    })


  })
})