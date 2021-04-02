import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Button, OutlineButton, CallToActionButton } from './index';

import styles from "./Button.module.css"

afterEach(cleanup)

// Unit Test Cases for Default Button
describe('Default Button', () => {

  it("renders to document", () => {
    const { getByTestId } = render(<Button />);
    expect(getByTestId('Button')).toBeInTheDocument();
    expect(getByTestId('Button').classList.contains(styles.input_button)).toBeTruthy()
  })

  it("renders to with children elements", () => {
    const { getByTestId } = render(
      <Button>
        <span>Some Child</span>
      </Button>
    );
    expect(getByTestId('Button')).toBeInTheDocument();
    expect(getByTestId('Button')).toHaveTextContent("Some Child");
  })

  it('displays acurate text value', () => {
    const { getByTestId } = render(<Button value="Hello World!" />);
    expect(getByTestId('Button')).toHaveTextContent("Hello World!")
  })

  it('invokes the handler based on click', () => {
    const callback = jest.fn()
    const { getByText } = render(<Button value="Click Here" onClick={callback} />);
    fireEvent.click(getByText('Click Here'))
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('uses custom classNames', () => {
    const callback = jest.fn()
    const { getByTestId } = render(<Button className={"foo bar"} value="Hello World!" onClick={callback} />);
    expect(getByTestId('Button').classList.contains('foo')).toBeTruthy()
    expect(getByTestId('Button').classList.contains('bar')).toBeTruthy()
  })

  it('is disabled ?', () => {
    const callback = jest.fn()
    const { getByTestId } = render(<Button value="Disabled Button" disabled={true} onClick={callback} />);
    expect(getByTestId('Button')).toBeDisabled()
  })

});


// Unit Cases for Outline Button
describe('Outline Button', () => {

  it("renders to document", () => {
    const { getByTestId } = render(<OutlineButton />);
    expect(getByTestId('OutlineButton')).toBeInTheDocument();
    expect(getByTestId('OutlineButton').classList.contains(styles.input_button)).toBeTruthy()
    expect(getByTestId('OutlineButton').classList.contains(styles.outline_button)).toBeTruthy()
  })

  it("renders to with children elements", () => {
    const { getByTestId } = render(
      <OutlineButton>
        <span>Some Child</span>
      </OutlineButton>
    );
    expect(getByTestId('OutlineButton')).toBeInTheDocument();
    expect(getByTestId('OutlineButton')).toHaveTextContent("Some Child");
  })

  it('displays acurate text value', () => {
    const { getByTestId } = render(<OutlineButton value="Hello World!" />);
    expect(getByTestId('OutlineButton')).toHaveTextContent("Hello World!")
  })

  it('invokes the handler based on click', () => {
    const callback = jest.fn()
    const { getByText } = render(<OutlineButton value="Click Here" onClick={callback} />);
    fireEvent.click(getByText('Click Here'))
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('uses custom classNames', () => {
    const callback = jest.fn()
    const { getByTestId } = render(<OutlineButton className={"foo bar"} value="Hello World!" onClick={callback} />);
    expect(getByTestId('OutlineButton').classList.contains('foo')).toBeTruthy()
    expect(getByTestId('OutlineButton').classList.contains('bar')).toBeTruthy()
  })

  it('is disabled ?', () => {
    const callback = jest.fn()
    const { getByTestId } = render(<OutlineButton value="Disabled Button" disabled={true} onClick={callback} />);
    expect(getByTestId('OutlineButton')).toBeDisabled()
  })

});


// Unit Cases for CallToActionButton
describe('CTA Button', () => {

  it("renders to document", () => {
    const { getByTestId } = render(<CallToActionButton />);
    expect(getByTestId('CTAButton')).toBeInTheDocument();
    expect(getByTestId('CTAButton').classList.contains(styles.input_button)).toBeTruthy()
    expect(getByTestId('CTAButton').classList.contains(styles.cta_button)).toBeTruthy()
  })

  it("renders to with children elements", () => {
    const { getByTestId } = render(
      <CallToActionButton>
        <span>Some Child</span>
      </CallToActionButton>
    );
    expect(getByTestId('CTAButton')).toBeInTheDocument();
    expect(getByTestId('CTAButton')).toHaveTextContent("Some Child");
  })

  it('displays acurate text value', () => {
    const { getByTestId } = render(<CallToActionButton value="Hello World!" />);
    expect(getByTestId('CTAButton')).toHaveTextContent("Hello World!")
  })

  it('invokes the handler based on click', () => {
    const callback = jest.fn()
    const { getByText } = render(<CallToActionButton value="Click Here" onClick={callback} />);
    fireEvent.click(getByText('Click Here'))
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('uses custom classNames', () => {
    const callback = jest.fn()
    const { getByTestId } = render(<CallToActionButton className={"foo bar"} value="Hello World!" onClick={callback} />);
    expect(getByTestId('CTAButton').classList.contains('foo')).toBeTruthy()
    expect(getByTestId('CTAButton').classList.contains('bar')).toBeTruthy()
  })

  it('is disabled ?', () => {
    const callback = jest.fn()
    const { getByTestId } = render(<CallToActionButton value="Disabled Button" disabled={true} onClick={callback} />);
    expect(getByTestId('CTAButton')).toBeDisabled()
  })

});