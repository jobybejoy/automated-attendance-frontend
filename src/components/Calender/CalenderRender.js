// Contains all the render functions
import beforeIcon from "../../assets/images/icons/navigate_before.svg"
import afterIcon from "../../assets/images/icons/navigate_next.svg"
import styles from "./Calender.module.css"

import PropTypes from 'prop-types'

export const RenderCalenderHeader = ({ month, year, onNextClick, onPrevClick }) => {
  return (
    <div className={styles.calender_header_container}>
      <button className={styles.button_month_change} aria-label="previous-month" onClick={onPrevClick}><img src={beforeIcon} alt="" /></button>
      <div>
        <div className={styles.calender_header_year}>{year}</div>
        <div className={styles.calender_header_month}>{month}</div>
      </div>
      <button className={styles.button_month_change} aria-label="next-month" onClick={onNextClick}><img src={afterIcon} alt="" /></button>
    </div>
  )
}

RenderCalenderHeader.propTypes = {
  month: PropTypes.string.isRequired,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onNextClick: PropTypes.func.isRequired,
  onPrevClick: PropTypes.func.isRequired,
};


export const RenderDaysOfWeek = ({ daysOfWeek }) => {
  return (
    daysOfWeek.map((day, index) => {
      return <div key={day + index} className={styles.calender_days_of_week}><span>{day}</span></div>
    })
  )
}

RenderDaysOfWeek.propTypes = {
  daysOfWeek: PropTypes.array.isRequired
};


export const RenderFillers = ({ first_DoW }) => {
  // Creating first_DoW - 1 elements
  const el = []
  for (let f_count = 0; f_count < first_DoW - 1; f_count++) {
    el.push(" ")
  }
  // Rendering the created filler elements
  return (
    el.map((el, index) => <div key={"filler_" + index} className={styles.calender_item_filler}> </div>)
  )
}

RenderFillers.propTypes = {
  first_DoW: PropTypes.number.isRequired
};

export const RenderDaysintoCalender = ({ days, current_year, current_month, current_date, DateComponent }) => {
  const today = new Date()
  const today_year = today.getFullYear();
  const today_month = today.getMonth();     // Month is from 0 - 11
  const today_date = today.getDate();
  return (
    days.map((day, index) => {
      if (day.date === today_date && current_month === today_month && current_year === today_year) {
        return <DateComponent day={day} className={styles.today} key={index} />
      } else {
        return (<DateComponent day={day} key={index} />)
      }
    })
  )
}

RenderDaysintoCalender.propTypes = {
  days: PropTypes.array.isRequired,
  current_year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  current_month: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  current_date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  DateComponent: PropTypes.func.isRequired
};

// const RenderDaysintoCalender = ({ days, current_year, current_month, current_date }) => {
  //   const today = new Date()
  //   const today_year = today.getFullYear();
  //   const today_month = today.getMonth();     // Month is from 0 - 11
  //   const today_date = today.getDate();
  //   return (
  //     days.map((day, index) => {
  //       if (day.date == today_date && current_month == today_month && current_year == today_year) {
  //         return <PercentageCalenderItem day={day} className={styles.today} />
  //       }
  //       return (<PercentageCalenderItem day={day} />)
  //     })
  //   )
  // }
