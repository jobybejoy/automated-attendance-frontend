
// Returns count number for days
// Used for calender elements
export const getDaysinMonth = (count) => {
  const days = []
  for (let c = 1; c <= count; c++) {
    days.push({ date: c, type: "default", percentage: undefined })
  }
  return days
}


export const markAttendedDays = (base_url, cal_days, marked_days, current_month, current_year) => {

  marked_days.map((marked_day, indx) => {
    // console.log(marked_day);
    // console.log("in marked");
    const marked_date = new Date(marked_day.date)

    const m_date_number = marked_date.getDate()
    const m_date_month = marked_date.getMonth()
    const m_date_year = marked_date.getFullYear()

    const is_date_in_current_month = m_date_month === current_month;
    const is_date_in_current_year = m_date_year === current_year;

    if (is_date_in_current_month && is_date_in_current_year) {
      const date = m_date_number - 1;
      // console.log({ date });
      // const att = marked_days.attended == true ? "attended" : "attended"
      const prevState = cal_days[date]
      // console.log({ prevState });
      if (marked_day.percentage) {
        cal_days[date] = {
          ...prevState,
          type: marked_day.type,
          percentage: `${marked_day.percentage}%`,
          link_to: `${base_url}/attendance/on/${m_date_year}/${m_date_month + 1}/${m_date_number}`
        }
      } else {
        cal_days[date] = {
          ...prevState,
          type: marked_day.type,
        }
      }
      return true
    } else {
      return false
    }
  })
  return cal_days
}



// Get the number of days in the month, year
const numberOfDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

// Function Returns indexs for the first WeekDay ['Mon','Wed',..etc] of the Month
// ie. The month start with say "Monday"
// Used to render blanks or spaces 
const getFirstDayofMonthinWeekList = (today) => new Date(today.getFullYear(), today.getMonth(), 1).getDay()

// Returns the Date Details in a single function
export const getCurrentDateDetails = (today) => {
  const current_year = today.getFullYear();
  const current_month = today.getMonth();               // Month is from 0 - 11
  const current_date = today.getDate();                 // Date  is from 1 - 31 

  const current_dayOfWeek_index = today.getDay() - 1;   // Converted to 0 - 6

  const first_DoW = getFirstDayofMonthinWeekList(today);
  const count_days_in_month = numberOfDaysInMonth(current_year, current_month + 1);
  return {
    current_year,
    current_month,
    current_date,
    count_days_in_month,
    doW: current_dayOfWeek_index,
    first_DoW: first_DoW
  }
}

