import PropTypes from 'prop-types'
import styles from './Button.module.css'

function Button({ value, onClick, disabled, className, children, ...props }) {
  return (
    <button
      data-testid="Button"
      className={styles.input_button + " " + (styles[className] ? styles[className] : className)} {...props}
      disabled={disabled} onClick={onClick}>
      {children || value}
    </button>
  )
}

function CallToActionButton({ value, onClick, disabled, className, children, ...props }) {
  return (
    <button
      data-testid="CTAButton"
      className={styles.input_button + " " + styles.cta_button + " " + (styles[className] ? styles[className] : className)} {...props}
      disabled={disabled} onClick={onClick}>
      {children || value}
    </button>
  )
}

function OutlineButton({ value, onClick, disabled, className, children, ...props }) {
  return (
    <button
      data-testid="OutlineButton"
      className={styles.input_button + " " + styles.outline_button + " " + (styles[className] ? styles[className] : className)} {...props}
      disabled={disabled} onClick={onClick}>
      {children || value}
    </button>
  )
}

Button.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

OutlineButton.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

CallToActionButton.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export { Button, CallToActionButton, OutlineButton }