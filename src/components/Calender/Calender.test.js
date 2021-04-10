import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import Calender from "./index"
import { CalenderItem, PercentageCalenderItem } from "./DateElement"
import { MemoryRouter } from 'react-router-dom'

import styles from "./Calender.module.css"

afterEach(cleanup)

describe('Calender Component', () => {

  describe("Date Component as Calender Item", () => {
    beforeEach(() => {
      const today = new Date("4/9/2021")
      const marked_days = [{ date: "4/4/2021", type: "present" }, { date: "4/5/2021", type: "absent" }, { date: "4/7/2021", type: "present" }]

      render(<Calender today={today} data={marked_days} DateComponent={CalenderItem} />, { wrapper: MemoryRouter })
    })

    it('renders to document', async () => {

      expect(screen.getByText("April")).toBeInTheDocument()
      expect(screen.getByText("2021")).toBeInTheDocument()
      expect(screen.getByText("1")).toBeInTheDocument()
      // April has only 30 days
      expect(screen.queryByText("31")).not.toBeInTheDocument()
    })
    it('has correct data states', () => {
      expect(screen.getByText("4").getElementsByClassName(styles.present)).toBeTruthy()
      expect(screen.getByText("5").getElementsByClassName(styles.absent)).toBeTruthy()
      expect(screen.getByText("7").getElementsByClassName(styles.present)).toBeTruthy()
    })
    it('handles 1 click on next month', () => {
      expect(screen.getByText("April")).toBeInTheDocument()
      expect(screen.getByText("2021")).toBeInTheDocument()
      expect(screen.queryByText("31")).not.toBeInTheDocument()
      fireEvent.click(screen.getByRole('button', { name: /next-month/i }), { button: 0 })
      expect(screen.getByText("May")).toBeInTheDocument()
      expect(screen.getByText("2021")).toBeInTheDocument()
      expect(screen.queryByText("31")).toBeInTheDocument()
    })
    it('handles 1 click on previous month', () => {
      expect(screen.getByText("April")).toBeInTheDocument()
      expect(screen.getByText("2021")).toBeInTheDocument()
      expect(screen.queryByText("31")).not.toBeInTheDocument()
      fireEvent.click(screen.getByRole('button', { name: /previous-month/i }), { button: 0 })
      expect(screen.getByText("March")).toBeInTheDocument()
      expect(screen.getByText("2021")).toBeInTheDocument()
      expect(screen.queryByText("31")).toBeInTheDocument()
    })

    it('handles 6 clicks on previous month | Will it wrap into 2020 ?', () => {
      expect(screen.getByText("April")).toBeInTheDocument()
      expect(screen.getByText("2021")).toBeInTheDocument()
      expect(screen.queryByText("31")).not.toBeInTheDocument()
      for (let index = 0; index < 6; index++) {
        fireEvent.click(screen.getByRole('button', { name: /previous-month/i }), { button: 0 })
      }
      expect(screen.getByText("October")).toBeInTheDocument()
      expect(screen.getByText("2020")).toBeInTheDocument()
      expect(screen.queryByText("31")).toBeInTheDocument()
    })

    it('handles 10 clicks on next month | Will it wrap into 2022 ?', () => {
      expect(screen.getByText("April")).toBeInTheDocument()
      expect(screen.getByText("2021")).toBeInTheDocument()
      expect(screen.queryByText("31")).not.toBeInTheDocument()
      for (let index = 0; index < 10; index++) {
        fireEvent.click(screen.getByRole('button', { name: /next-month/i }), { button: 0 })
      }
      expect(screen.getByText("February")).toBeInTheDocument()
      expect(screen.getByText("2022")).toBeInTheDocument()
      expect(screen.queryByText("28")).toBeInTheDocument()
      expect(screen.queryByText("31")).not.toBeInTheDocument()
    })

  });

  describe('Date Component as Percentage Item', () => {
    beforeEach(() => {
      const today = new Date("4/9/2021")
      const marked_days = [{ date: "3/29/2021", percentage: "88" }, { date: "4/2/2021", percentage: "78" }, { date: "4/5/2021", percentage: "89" }, { date: "4/7/2021", percentage: "94" }]

      render(
        <MemoryRouter initialEntries={["/cs/675/session/001"]}>
          <Calender today={today} data={marked_days} DateComponent={PercentageCalenderItem} />
        </MemoryRouter >
      )
    })
    it('renders to document', () => {
      expect(screen.queryByText("April")).toBeInTheDocument()
      expect(screen.queryByText("2021")).toBeInTheDocument()
      expect(screen.queryByText("1")).toBeInTheDocument()
      // April has only 30 days
      expect(screen.queryByText("31")).not.toBeInTheDocument()
    })
    it('has correct data states', () => {
      expect(screen.queryByText("88%")).toBeFalsy()
      expect(screen.queryByText("78%")).toBeTruthy()
      expect(screen.queryByText("89%")).toBeTruthy()
      expect(screen.queryByText("94%")).toBeTruthy()

      fireEvent.click(screen.getByRole('button', { name: /previous-month/i }), { button: 0 })
      expect(screen.queryByText("88%")).toBeTruthy()
      expect(screen.queryByText("78%")).toBeFalsy()
      expect(screen.queryByText("89%")).toBeFalsy()
      expect(screen.queryByText("94%")).toBeFalsy()
    })
    it('verify link locations', () => {
      expect(document.querySelectorAll("a")[0].getAttribute("href")).toBe("/cs/675/session/001/attendance/on/2021/4/2")
      expect(document.querySelectorAll("a")[1].getAttribute("href")).toBe("/cs/675/session/001/attendance/on/2021/4/5")
      expect(document.querySelectorAll("a")[2].getAttribute("href")).toBe("/cs/675/session/001/attendance/on/2021/4/7")
    })
  })

})

