import Label, { Helper } from "./index"
import Input from "../Input/index"

import { render, cleanup } from '@testing-library/react';

afterEach(cleanup)

describe("Label Text", () => {

  it("renders to document", () => {
    const { getByTestId } = render(<Label>Password</Label>);
    expect(getByTestId('FormLabel')).toBeInTheDocument()
  })

})

describe("Helper Text", () => {

  it("renders to document", () => {
    const { getByTestId } = render(<Helper>Enter your password here</Helper>);
    expect(getByTestId('FormHelper')).toBeInTheDocument()
  })

})
