import { LayoutOnly } from "../../containers/Layout"
import styles from "./Error.module.css"

export default function Error({ error }) {

  // console.log("In Error Page");
  // console.log({ error })

  // console.log({ error.statusText })
  const obj_string = JSON.stringify(error)
  return (
    <LayoutOnly>
      <div className={styles.ErrorContainer}>
        <h1 className={styles.error_page_header}>Opps! We have an error</h1>
        <h1 className={styles.error_status}>{error.status}</h1>
        <h2 className={styles.error_heading}>Server Message</h2>
        <p className={styles.error_message}>{error.info.message}</p>
        <pre className={styles.error_message_stack}>
          <code>
            {obj_string}
          </code>
        </pre>

        <h2 className={styles.error_heading}>Client Stack</h2>
        <p className={styles.error_message}>{error.message}</p>
        <pre className={styles.error_message_stack}>{error.stack}</pre>

      </div>
    </LayoutOnly>
  )
};
