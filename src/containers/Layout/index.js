import styles from './Layout.module.css';
import Nav from "./Navbar"

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <div className={styles.layout_container}>
        {children}
      </div>
    </>
  )
}

export function LayoutOnly({ children }) {
  return (
    <>
      <div className={styles.layout_container}>
        {children}
      </div>
    </>
  )
}