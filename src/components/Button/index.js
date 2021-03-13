import styles from './Button.module.css'

function Button({ value, onClick, disabled, className, children, ...props }) {
  return (
    <button
      className={styles.input_button + " " + (styles[className] ? styles[className] : className)} {...props}
      disabled={disabled} onClick={onClick}>
      {children || value}
    </button>
  )
}

function CTA_Button({ value, onClick, disabled, className, children, ...props }) {
  return (
    <button
      className={styles.input_button + " " + styles.cta_button + " " + (styles[className] ? styles[className] : className)} {...props}
      disabled={disabled} onClick={onClick}>
      {children || value}
    </button>
  )
}

function OutlineButton({ value, onClick, disabled, className, children, ...props }) {
  console.log(className ? className : styles[className])
  return (
    <button
      className={styles.input_button + " " + styles.outline_button + " " + (styles[className] ? styles[className] : className)} {...props}
      disabled={disabled} onClick={onClick}>
      {children || value}
    </button>
  )
}


export { Button, CTA_Button, OutlineButton }