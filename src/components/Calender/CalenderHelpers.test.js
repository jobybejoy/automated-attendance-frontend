import {
  numberOfDaysInMonth,
  getFirstDayofMonthinWeekList,
  getCurrentDateDetails,
  getDaysinMonth,
  markAttendedDays
} from "./helpers"

import { cleanup } from '@testing-library/react';

afterEach(cleanup)


describe('Helper fn | DaysInMonth', () => {
  it('returns the number of days in 2021', () => {
    expect(numberOfDaysInMonth(2021, 1)).toBe(31)
    expect(numberOfDaysInMonth(2021, 2)).toBe(28)
    expect(numberOfDaysInMonth(2021, 3)).toBe(31)
    expect(numberOfDaysInMonth(2021, 4)).toBe(30)
    expect(numberOfDaysInMonth(2021, 5)).toBe(31)
    expect(numberOfDaysInMonth(2000, 2)).toBe(29)
    expect(numberOfDaysInMonth(2010, 2)).toBe(28)
  })

  it('number of days for current month', () => {
    const today = new Date()
    const expected = new Date(today.getYear(), today.getMonth(), 0).getDate()

    expect(numberOfDaysInMonth(today.getYear(), today.getMonth())).toBe(expected)
  })
})

describe('Helper fn | First Day in Month as in Weekdays', () => {
  it('returns as expected', () => {
    // Apr 2021
    const date = new Date(2021, 3)
    // Returns 4 ie. starts with Thrsday
    expect(getFirstDayofMonthinWeekList(date)).toBe(4)
  })
})

describe('Helper fn | Gets the meta details about a date', () => {

  it('return w/ static param of - Apr 09 2021', () => {
    const expected = {
      current_year: 2021,
      current_month: 3,
      current_date: 9,
      count_days_in_month: 30,
      first_DoW: 4,
      // dow - 0-6
      doW: 4
    }

    // Apr 09 2021
    const some_date = new Date(2021, 3, 9)

    expect(getCurrentDateDetails(some_date)).toEqual(expected)
  })

})

describe("Helper fn | Calender Days", () => {
  it('returns expected result length', () => {
    // getDaysinMonth(count)
    expect(getDaysinMonth(31).length).toEqual(31)
  })

  it('return expected results', () => {
    const count = 31
    const expected = []
    for (let index = 0; index < 31; index++) {
      expected.push({
        date: (index + 1), type: "default", percentage: undefined
      })
    }
    expect(getDaysinMonth(count)).toEqual(expected)
  })

})


describe("Helper fn | GetMarkedDays", () => {
  it("returns unmarked days as it is", () => {
    const days = getDaysinMonth(31)
    const marked_days = []

    const base_url = "http://localhost:3000/cs/675/session/001"
    expect(markAttendedDays(base_url, days, marked_days, 4, 2021)).toEqual(days)
  })

  it("returns calender days along w/ marked days", () => {
    const days = getDaysinMonth(31)
    const marked_days = [{ date: "4/4/2021", type: "present" }, { date: "4/5/2021", type: "absent" }, { date: "4/7/2021", type: "present" }]
    const base_url = "http://localhost:3000/cs/675/session/001"

    const res_days = [...days]
    marked_days.forEach(element => {
      const date_number = new Date(element.date).getDate()
      res_days[date_number - 1] = { date: date_number, type: element.type, percentage: undefined }
    });

    const today = new Date("4/9/2021")

    expect(markAttendedDays(base_url, days, marked_days, today.getMonth(), today.getFullYear())).toEqual(res_days)
  })

  it("returns calender days along w/ percentage days", () => {
    const days = getDaysinMonth(31)
    const marked_days = [{ date: "4/4/2021", percentage: "78" }, { date: "4/5/2021", percentage: "89" }, { date: "4/7/2021", percentage: "94" }]
    const base_url = "http://localhost:3000/cs/675/session/001"

    const res_days = [...days]
    marked_days.forEach(element => {
      const date = new Date(element.date)
      const date_number = date.getDate()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const url = `${base_url}/attendance/on/${year}/${month}/${date_number}`

      res_days[date_number - 1] = { date: date_number, type: undefined, percentage: element.percentage + "%", link_to: url }
    });

    const today = new Date("4/9/2021")

    expect(markAttendedDays(base_url, days, marked_days, today.getMonth(), today.getFullYear())).toEqual(res_days)
  })

})

