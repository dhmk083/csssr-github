import styles from "./styles.module.scss";

const Spinner = ({ children }: { children? }) => (
  <div className={styles.wrap}>
    <div className={styles.spinner} />
    {children}
  </div>
);

export default Spinner;
