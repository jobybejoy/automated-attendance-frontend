import styles from './Input.module.css'
import PropTypes from 'prop-types'

/**
 *          
 *
 * @param {*} { className, ...props }
 * @returns 
 *          <Input type="email" name="email"
              placeholder="jane@email.com"
              className={"outlined"}
            />
 */

function Input({ className, ...props }) {
  return (
    <input
      data-testid="FormInput"
      type={props.type || "text"}
      name={props.name || "default_input"}
      placeholder={props.placeholder || "Fill this input"}
      {...props}
      className={styles.input + " " + styles[className]}
    />
  )
}

export function TextArea({ className, value, ...props }) {
  return (
    <textarea data-testid="TextArea"
      className={styles.input + " " + styles[className]} value={value} {...props}></textarea>
  )
}

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

TextArea.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Input