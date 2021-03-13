import styles from "./Button.module.css"

export default function ButtonGroup({ children }) {
  return (
    <div className={styles.button_group}>
      {children}
    </div>
  )
}
