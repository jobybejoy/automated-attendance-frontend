import styles from "./Calender.module.css"

// Student Calender Component
// Date along with the type of attendance
export const CalenderItem = ({ day, className }) => {
  return (
    <div tabIndex="0" className={styles.calender_item + " " + (day?.type ? styles[day.type] : "") + " " + (className ? className : "")}>
      <span className={styles.right_connored}>{day.date}</span>
    </div >
  )
}

export const PercentageCalenderItem = ({ day, className }) => {
  return (
    <div tabIndex="0" className={styles.calender_item_percentage + " " + (day?.percentage ? styles.attn_percentage : "") + " " + (className ? className : "")}>
      <div className={styles.right_centered}>{day.percentage}</div>
      <div className={styles.right_connored}>{day.date}</div>
    </div >
  )
}