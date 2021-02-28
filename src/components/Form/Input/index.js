import styles from './Input.module.css'


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
    <input {...props}
      className={styles.input + " " + styles[className]}
    />
  )
}

export default Input 