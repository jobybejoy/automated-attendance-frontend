import { useContext } from "react";
import { UserContext } from "../../context/UserContext"

import StudentAttendance from "./Student/index"
import FacultyAttendance from "./Faculty/index"

export default function Attendance(params) {
  const { user } = useContext(UserContext)
  if (user?.isStaff) {
    return <FacultyAttendance />
  } else {
    return <StudentAttendance />
  }

};
