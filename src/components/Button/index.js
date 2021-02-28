import styles from './Button.module.css'

function Button({ value, onClick }) {
  return (
    <button className={styles.input_button} onClick={onClick}>{value}</button>
  )
}

function CTA_Button({ value, onClick }) {
  return (
    <button className={styles.input_button + " " + styles.cta_button} onClick={onClick}>{value}</button>
  )
}

function Outline_Button({ value, onClick }) {
  return (
    <button className={styles.input_button + " " + styles.outline_button} onClick={onClick}>{value}</button>
  )
}


export { Button, CTA_Button, Outline_Button }