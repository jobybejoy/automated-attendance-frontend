import styles from "./Calender.module.css"
import { useState } from "react"

import { useLocation } from 'react-router-dom'

import { getCurrentDateDetails, getDaysinMonth, markAttendedDays } from "./helpers"

import { RenderCalenderHeader, RenderDaysOfWeek, RenderFillers, RenderDaysintoCalender } from "./CalenderRender"


export default function Calender({ today = new Date(), className, data, DateComponent }) {

  // Actions | Next Button Click Handler | changes the date value to the next month's value 
  const handleNextClick = ({ current_year, current_month }) => {
    const new_date = new Date(current_year, current_month + 1)
    setDate(new_date)
  }

  // Actions | Previous Button Click Handler | changes the date value to the previous month's value 
  const handlePrevClick = ({ current_year, current_month }) => {
    const new_date = new Date(current_year, current_month - 1)
    setDate(new_date)
  }

  const CalenderRender = ({ today = new Date(), data, className, DateComponent }) => {

    const daysOfWeek = ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"]
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const { current_year, current_month, current_date, count_days_in_month, first_DoW } = getCurrentDateDetails(today)

    // console.log(numberOfDaysInMonth(2021, 3));
    const all_days = getDaysinMonth(count_days_in_month);

    const location = useLocation();
    // console.log({ location });

    const days = markAttendedDays(location.pathname, all_days, data, current_month, current_year);

    return (
      <div className={className}>
        <RenderCalenderHeader month={monthNames[current_month]} year={current_year}
          onNextClick={() => handleNextClick({ current_month, current_year })} onPrevClick={() => handlePrevClick({ current_month, current_year })} />
        <div className={styles.calender_container}>
          <RenderDaysOfWeek daysOfWeek={daysOfWeek} />
          <RenderFillers first_DoW={first_DoW} />
          <RenderDaysintoCalender days={days} current_date={current_date} current_month={current_month} current_year={current_year} DateComponent={DateComponent} />
        </div>
      </div>
    )
  }

  const [date, setDate] = useState(new Date())
  return (
    <CalenderRender today={date} className={className} data={data} DateComponent={DateComponent} />
  )
};
