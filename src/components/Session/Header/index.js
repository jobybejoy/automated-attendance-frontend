import styles from "./style.module.css"
import propTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

export default function SessionHeader({ session }) {

  return (
    <div className={styles.session_header_container} data-testid="SessionHeader">
      <div className={styles.session_meta_details}>
        <span><b>{session?.course_string.toUpperCase() || <Skeleton width={64} height={21} />}</b> </span>
        <span>{session?.session_name || <Skeleton width={30} height={21} />}</span>
        <span>{session?.term ? (session?.term + " " + session?.year) : <Skeleton width={76} height={21} />}</span>
      </div>
      <h1 className={styles.course_name}>{session?.course_name || <Skeleton style={{ width: "80%" }} height={50} />}</h1>
    </div >
  )
}

SessionHeader.propTypes = {
  session: propTypes.shape({
    course_id: propTypes.number,
    session_id: propTypes.number,
    course_string: propTypes.string,
    session_name: propTypes.string,
    course_name: propTypes.string,
    term: propTypes.string,
    year: propTypes.number
  })
};