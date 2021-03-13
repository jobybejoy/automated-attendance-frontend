import styles from './Label.module.css'

export default function Label({ htmlFor, children, className }) {
  return (
    <label htmlFor={htmlFor} className={styles.input_label + " " + styles[className]}>{children}</label>
  )
}

export function Helper({ htmlFor, children, className }) {
  return (
    <label htmlFor={htmlFor} className={`${styles.input_label} ${styles.helper} ${styles[className]}`}>{children}</label>
  )
}