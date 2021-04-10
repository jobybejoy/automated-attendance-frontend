import {
  RenderCalenderHeader,
  RenderDaysOfWeek,
  RenderFillers,
  RenderDaysintoCalender
} from "./CalenderRender"

import { MemoryRouter } from 'react-router-dom'

import { getDaysinMonth, getCurrentDateDetails, markAttendedDays } from "./helpers"
import { CalenderItem, PercentageCalenderItem } from "./DateElement"

import { render, cleanup, fireEvent } from '@testing-library/react';
import styles from "./Calender.module.css"

afterEach(cleanup)


describe("Renderer | Calender Header", () => {

  it('renders the calender header to document', () => {
    const leftClickHandler = jest.fn()
    const rightClickHandler = jest.fn()
    const { getByText } = render(<RenderCalenderHeader month="January" year="2021" onPrevClick={leftClickHandler} onNextClick={rightClickHandler} />)
    expect(getByText('January')).toBeInTheDocument()
    expect(getByText('2021')).toBeInTheDocument()
  })

  it('clicks the previous button', () => {
    const leftClickHandler = jest.fn()
    const rightClickHandler = jest.fn()

    const { getByRole } = render(<RenderCalenderHeader month="January" year="2021" onPrevClick={leftClickHandler} onNextClick={rightClickHandler} />)
    fireEvent.click(getByRole('button', { name: /previous-month/i }), { button: 0 })
    fireEvent.click(getByRole('button', { name: /previous-month/i }), { button: 0 })
    expect(leftClickHandler).toHaveBeenCalledTimes(2)
  })

  it('clicks the next button', () => {
    const leftClickHandler = jest.fn()
    const rightClickHandler = jest.fn()

    const { getByRole } = render(<RenderCalenderHeader month="January" year="2021" onPrevClick={leftClickHandler} onNextClick={rightClickHandler} />)
    fireEvent.click(getByRole('button', { name: /next-month/i }), { button: 0 })
    fireEvent.click(getByRole('button', { name: /next-month/i }), { button: 0 })
    expect(rightClickHandler).toHaveBeenCalledTimes(2)
  })

})

describe('Renderer | Days of Week', () => {
  it('renders to document', () => {
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"]
    const { getByText } = render(<RenderDaysOfWeek daysOfWeek={daysOfWeek} />)
    daysOfWeek.forEach(day => {
      expect(getByText(day)).toBeInTheDocument()
    });
  })
})

describe('Renderer | Empty Filler', () => {
  afterEach(cleanup)
  it('renders to document', () => {
    const { container } = render(<RenderFillers first_DoW={4} />)
    expect(container.getElementsByClassName(styles.calender_item_filler).length).toEqual(3);
  })
  it('first day of week on monday', () => {
    const { container } = render(<RenderFillers first_DoW={1} />)
    expect(container).toBeEmptyDOMElement()
    expect(container.getElementsByClassName(styles.calender_item_filler).length).toEqual(0);
  })
  it('first day of week max', () => {
    const { container } = render(<RenderFillers first_DoW={7} />)
    expect(container.getElementsByClassName(styles.calender_item_filler).length).toEqual(6);
  })
})

describe('Renderer | Calender Days', () => {


  it('renders to document w/ CalenderItem Date Element', () => {
    const today = new Date("4/9/2021")

    const { current_year, current_month, current_date, count_days_in_month, first_DoW } = getCurrentDateDetails(today)
    const all_days = getDaysinMonth(count_days_in_month);

    const base_url = "http://localhost:3000/cs/675/session/001"
    const marked_days = [{ date: "4/4/2021", type: "present" }, { date: "4/5/2021", type: "absent" }, { date: "4/7/2021", type: "present" }]

    const days = markAttendedDays(base_url, all_days, marked_days, current_month, current_year);

    const { getByText } = render(<RenderDaysintoCalender days={days} current_date={current_date} current_month={current_month} current_year={current_year} DateComponent={CalenderItem} />)

    expect(getByText("1")).toBeInTheDocument()
    expect(getByText("" + count_days_in_month)).toBeInTheDocument()
    expect(getByText(4).getElementsByClassName(styles.present)).toBeTruthy();
    expect(getByText(5).getElementsByClassName(styles.absent)).toBeTruthy();
    expect(getByText(7).getElementsByClassName(styles.present)).toBeTruthy();

  })

  it('renders to document w/ Percentage Date Element', () => {
    const today = new Date("4/9/2021")

    const { current_year, current_month, current_date, count_days_in_month, first_DoW } = getCurrentDateDetails(today)
    const all_days = getDaysinMonth(count_days_in_month);

    const base_url = "http://localhost:3000/cs/675/session/001"
    const marked_days = [{ date: "4/4/2021", percentage: "78" }, { date: "4/5/2021", percentage: "89" }, { date: "4/7/2021", percentage: "94" }]

    const days = markAttendedDays(base_url, all_days, marked_days, current_month, current_year);

    const { getByText, getAllByRole } = render(<RenderDaysintoCalender days={days} current_date={current_date} current_month={current_month} current_year={current_year} DateComponent={PercentageCalenderItem} />
      , { wrapper: MemoryRouter }
    )

    expect(getByText("1")).toBeInTheDocument()
    expect(getByText("" + count_days_in_month)).toBeInTheDocument()

    // * Have to check the links -- clickable 
    // // http://localhost:3000/cs/675/session/001/attendance/on/2021/4/4
    // expect(getByText("78%").getAttribute("href")).toEqual("http://localhost:3000/cs/675/session/001/attendance/on/2021/4/4");

  })



})
