import styles from "./Marker.module.css"
import Layout from "../../containers/Layout"

import { useContext } from "react"
import { useParams } from 'react-router-dom';
import { useState } from "react"

import img from "../../assets/images/icons/face.svg"

import { SessionsContext } from "../../context/SessionsContext"

import useAllStudentAttendance from "../../api/attendance/Faculty/SessionAttendance"
import UpdateSessionAttendance from "../../api/attendance/Faculty/UpdateSessionAttendance"

import useToken from "../../api/auth/useToken"

import StudentsGrid from "./StudentsGrid"
import { findSession } from "../../helpers/findSession"

// import StudentAttendance from "./Student/index"
// import FacultyMarksAttendance from "./Faculty/index"



export default function MarkAttendanceContainer(params) {

  const { department, course_number, session_id, year, month, day } = useParams();
  const { sessions } = useContext(SessionsContext)

  const { token } = useToken()

  const session = findSession({ sessions, department, course_number, session_id });

  const date = `${year}-${month}-${day}`;

  const { student_attendance, isError, isLoading } = useAllStudentAttendance(session?.course_id, session?.session_id, date);

  if (isLoading) {
    return "Fetching Attendance Details"
  }

  if (isError) {
    return "Failed to fetch Attendance Details"
  }

  // console.log({ token, session, date });

  return <MarkAttendance
    attendance={student_attendance}
    onItemClick={(student_id) => UpdateSessionAttendance(token, session?.course_id, session?.session_id, date, student_id)}
  />
  // if (user?.isStaff) {
  //   return <FacultyAttendance />
  // } else {
  //   return <StudentAttendance />
  // }

};


function MarkAttendance({ attendance, onItemClick }) {

  function handleClick(e, { id, name, type }, index) {
    // alert(e.target.name)
    e.preventDefault();

    onItemClick(id)
      .then(function () {
        console.log(`Updated attendance of student_id = ${id}`)
        const new_students_array = [...students]
        const next_attendance_type = (type === "attended") ? "absent" : "attended"
        new_students_array[index] = { id, name, type: next_attendance_type }
        setStudents(new_students_array)
      })
      .catch((err) => {
        alert(err, " due to ", err.info)
      })
  }

  const [students, setStudents] = useState(attendance)
  const students_count = students.length
  const attended_count = getTypeCount(students, "attended")
  const absent_count = students_count - attended_count
  return (
    <Layout>

      <div className={styles.header_block}>
        <h3>Attendance</h3>
        <div className={styles.summary_container}>
          <div className={styles.summary_block}>
            <p className={styles.summary_value}>{students_count}</p>
            <p className={styles.summary_title}>Students</p>
          </div>
          <div className={styles.summary_block}>
            <p className={styles.summary_value}>{attended_count}</p>
            <p className={styles.summary_title}>Attended</p>
          </div>
          <div className={styles.summary_block}>
            <p className={styles.summary_value}>{absent_count}</p>
            <p className={styles.summary_title}>Absent</p>
          </div>
        </div>
      </div>
      <StudentsGrid students={students} onClickHandler={handleClick} />
    </Layout>
  )
}

const getTypeCount = (students, attendance_type) => {
  return students.reduce((acc, student, index) => {
    if (student.type === attendance_type) { return acc += 1 }
    else { return acc; }
  }, 0)
}