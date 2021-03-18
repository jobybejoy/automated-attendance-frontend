import styles from './Layout.module.css';
import Nav from "./Navbar"

import Footer from "./Footer"

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <div className={styles.layout_container}>
        {children}
      </div>
      <Footer />
    </>
  )
}

export function LayoutOnly({ children }) {
  return (
    <>
      <div className={styles.layout_container}>
        {children}
      </div>
      <Footer />
    </>
  )
}