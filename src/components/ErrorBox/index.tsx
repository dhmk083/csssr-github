import styles from "./styles.module.scss";

const ErrorBox = ({ children }) => (
  <div className={styles.wrap}>{children}</div>
);

export default ErrorBox;
