import React, { useState } from 'react';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Input from './index';
import { TextArea } from './index';

import styles from "./Button.module.css"

afterEach(cleanup)

// Unit Test Cases for Form Input
describe("Form Input Component", () => {

  it("renders to document  w/ no props", () => {
    const { getByTestId } = render(<Input />);
    expect(getByTestId('FormInput')).toBeInTheDocument()
    expect(getByTestId('FormInput').getAttribute('type')).toEqual("text")
  })

  it("renders to document  w/ props", () => {
    const onChangeHandler = jest.fn()
    const { getByTestId } = render(
      <Input
        name="email"
        type="email"
        placeholder="Enter your email address"
        onChange={onChangeHandler}
      />
    );
    expect(getByTestId('FormInput')).toBeInTheDocument()
    expect(getByTestId('FormInput').getAttribute('name')).toEqual("email")
    expect(getByTestId('FormInput').getAttribute('type')).toEqual("email")
    expect(getByTestId('FormInput').getAttribute('placeholder')).toEqual("Enter your email address")
  })

  describe("checks for all text input types", () => {
    const input_types = ["text", "email", "number", "password", "search", "tel", "url"]

    input_types.forEach(input_type => {
      it(`input as ${input_type}`, () => {
        const { getByTestId } = render(<Input type={input_type} />);
        expect(getByTestId('FormInput').getAttribute('type')).toEqual(input_type)
      })
    });

  })

  it("check if input handles user entries", () => {

    const onChangeHandler = jest.fn()

    const { getByTestId } = render(
      <Input
        name="email"
        type="email"
        placeholder="Enter your email address"
        onChange={onChangeHandler}
      />
    );

    userEvent.type(
      getByTestId('FormInput'), "jandenDoe@email.com"
    )

    // ! Note here the value is not being verified
    expect(onChangeHandler).toHaveBeenCalledTimes("jandenDoe@email.com".length)

  })

})


describe("Text Area Component", () => {
  it("renders to document  w/ no props", () => {
    const { getByTestId } = render(<TextArea />);
    expect(getByTestId('TextArea')).toBeInTheDocument()
  })

  it("renders to document  w/ props", () => {
    const onChangeHandler = jest.fn()
    const { getByTestId } = render(
      <TextArea
        name="address"
        placeholder="Enter your address"
        onChange={onChangeHandler}
      />
    );
    expect(getByTestId('TextArea')).toBeInTheDocument()
    expect(getByTestId('TextArea').getAttribute('name')).toEqual("address")
    expect(getByTestId('TextArea').getAttribute('placeholder')).toEqual("Enter your address")
  })
})