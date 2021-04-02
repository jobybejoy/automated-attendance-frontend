import React from 'react';
import { render, cleanup } from '@testing-library/react';

import ButtonGroup from './ButtonGroup';
import { Button } from "./index"

afterEach(cleanup)

// Unit Test Cases for Default Button
describe('Button Group', () => {
  it('renders to document', () => {
    const { getByTestId } = render(
      <ButtonGroup>
        <Button>Hello</Button>
        <Button>World</Button>
      </ButtonGroup>
    );
    expect(getByTestId('ButtonGroup')).toBeInTheDocument();
  })

})