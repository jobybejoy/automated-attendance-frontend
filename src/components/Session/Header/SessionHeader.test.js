import React from 'react';
import { render, cleanup } from '@testing-library/react';

import SessionHeader from './index';

afterEach(cleanup)

// Unit Test Cases for Session Header Component 
describe('Session Header', () => {

  it('renders to document w/ props', () => {

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

    const { getByTestId } = render(<SessionHeader session={session} />);
    // expect(getByTestId('SessionHeader')).toBeInTheDocument();
    expect(getByTestId('SessionHeader')).toMatchSnapshot()
  })

  it('renders to without props', () => {

    // * Expecting the component to render loading state

    // const session = {
    //   course_id: 1,
    //   course_string: "cs 675",
    //   session_id: 1,
    //   session_name: "001",
    //   course_name: "Software Architecture",
    //   term: "Fall",
    //   year: 2021,
    //   url: "/cs/675/session/001"
    // }

    const { getByTestId } = render(<SessionHeader />);
    expect(getByTestId('SessionHeader')).toBeInTheDocument();
  })

})