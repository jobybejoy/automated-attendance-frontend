import styles from "./Container.module.css"

export const InputGroup = ({ children }) => {
  return (
    <div className={styles.input_group}>
      {children}
    </div>
  )
}


