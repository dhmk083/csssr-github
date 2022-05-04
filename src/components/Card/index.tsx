import styles from "./styles.module.scss";

const Card = ({ children }) => <div className={styles.card}>{children}</div>;

const Header = ({ children }) => (
  <div className={styles.header}>{children}</div>
);

Card.Header = Header;

export default Card;
