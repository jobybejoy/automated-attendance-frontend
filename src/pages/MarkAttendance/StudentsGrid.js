import styles from "./Marker.module.css"

export default function StudentsGrid({ students, onClickHandler }) {
  return (
    <div className={styles.marker_container}>
      {
        students.map((student, index) => {
          return (
            <div className={styles.grid_item + " " + styles[student?.type]} key={student.id} onClick={(e) => onClickHandler(e, student, index)}>
              <img src={`https://i.pravatar.cc/300?img=${index}`} alt="" />
              <h6>{student?.name}</h6>
            </div>
          )
        })
      }
    </div>
  )
}