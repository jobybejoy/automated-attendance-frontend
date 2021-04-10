
import Input from "../Input/index"
import Label, { Helper } from "../Label/index"
import { InputGroup } from "./index"

import { render, cleanup } from '@testing-library/react';

afterEach(cleanup)

describe("Form Container", () => {

  it("renders to document", () => {
    const { getByLabelText } = render(
      <InputGroup>
        <Label id="username" htmlFor="username">Username</Label>
        <Input
          aria-labelledby="username"
          type="text" name="username"
          placeholder="johnDo1112"
        />
        <Helper aria-labelledby="username">Enter email address here</Helper>
      </InputGroup>
    );
    // expect(getByLabelText('Username')).toBeInTheDocument()
    expect(getByLabelText('Username', { selector: 'input' })).toBeInTheDocument()
  })

})

