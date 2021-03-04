import styles from "./style.module.css"
import propTypes from 'prop-types';

export default function SessionHeader({ session }) {
  return (
    <div className={styles.session_header_container}>
      <div className={styles.session_meta_details}>
        <span><b>{session.course_id}</b> </span>
        <span>{session.session_id}</span>
        <span>{session.term}</span>
      </div>
      <h1 className={styles.course_name}>{session.course_name}</h1>
    </div >
  )
}

SessionHeader.propTypes = {
  session: propTypes.shape({
    course_id: propTypes.string,
    session_id: propTypes.number,
    course_name: propTypes.string,
    term: propTypes.string
  })
};