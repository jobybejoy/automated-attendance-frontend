import styles from "./Button.module.css"
import PropTypes from 'prop-types'

export default function ButtonGroup({ children }) {
  return (
    <div
      data-testid="ButtonGroup"
      className={styles.button_group}>
      {children}
    </div>
  )
}

ButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
};
