import styles from "./Marker.module.css"
import Layout from "../../containers/Layout"

import { useState } from "react"

import img from "../../assets/images/icons/face.svg"

import { useContext } from "react";
import { UserContext } from "../../context/UserContext"

// import StudentAttendance from "./Student/index"
// import FacultyMarksAttendance from "./Faculty/index"

export default function MarkAttendanceContainer(params) {
  const { user } = useContext(UserContext)
  return <MarkAttendance />
  // if (user?.isStaff) {
  //   return <FacultyAttendance />
  // } else {
  //   return <StudentAttendance />
  // }

};

function MarkAttendance({ props }) {

  function handleClick(e, { id, name, type }, index) {
    // alert(e.target.name)
    e.preventDefault();
    console.log(index, { id, name, type })
    const new_students_array = [...students]
    const next_attendance_type = (type === "attended") ? "absent" : "attended"
    new_students_array[index] = { id, name, type: next_attendance_type }
    setStudents(new_students_array)
  }

  const getTypeCount = (students, attendance_type) => {
    return students.reduce((acc, student, index) => {
      if (student.type === attendance_type) { return acc += 1 }
      else { return acc; }
    }, 0)
  }

  const students_data = [
    { "id": 1, "name": "JohnJohn Doe", "type": "attended" },
    { "id": 6, "name": "Adhithya  Meenakshisundaram", "type": "attended" },
    { "id": 8, "name": "Akshaya  Sarath", "type": "attended" },
    { "id": 10, "name": "Lohavaani Sundar", "type": "attended" },
    { "id": 12, "name": "Purnima Manoharan", "type": "attended" },
    { "id": 14, "name": "Harish Vijayakumar", "type": "attended" },
    { "id": 16, "name": "Rahul  Bommaraju", "type": "attended" },
    { "id": 18, "name": "Rani Vishwa", "type": "attended" },
    { "id": 20, "name": "Karthik Vishwa", "type": "attended" },
    { "id": 22, "name": "Nithya  Arunkumar", "type": "attended" },
    { "id": 24, "name": "Samhitha Arunkumar", "type": "attended" },
    { "id": 26, "name": "Meenakshi Sundharam", "type": "attended" },
    { "id": 28, "name": "Vardhini Manivannan", "type": "attended" },
    { "id": 30, "name": "Murugavel Kumar", "type": "attended" },
    { "id": 32, "name": "kishore  Murugavel", "type": "attended" },
    { "id": 34, "name": "Baskar Nadarajan", "type": "attended" },
    { "id": 36, "name": "Suvinesh Bhaskar", "type": "attended" },
    { "id": 38, "name": "Baskar Ravi", "type": "attended" },
    { "id": 40, "name": "Aashikha Ravi", "type": "attended" },
    { "id": 42, "name": "Ensha  Neron", "type": "attended" },
    { "id": 44, "name": "Acansha Christini", "type": "attended" },
    { "id": 46, "name": "Isai Pari", "type": "attended" },
    { "id": 48, "name": "Girijesh Vendhan", "type": "absent" },
    { "id": 50, "name": "Roshan Rajsekar", "type": "absent" },
    { "id": 52, "name": "Sahana Ramalingam", "type": "absent" },
    { "id": 54, "name": "Santhosh Kumar", "type": "absent" }

  ];

  const [students, setStudents] = useState(students_data)
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
      <div className={styles.marker_container}>
        {
          students.map((student, index) => {
            return (
              <div className={styles.grid_item + " " + styles[student?.type]} key={student.id} onClick={(e) => handleClick(e, student, index)}>
                <img src={`https://i.pravatar.cc/300?img=${index}`} alt="" />
                <h6>{student?.name}</h6>
              </div>
            )
          })
        }
      </div>
    </Layout>
  )
}
