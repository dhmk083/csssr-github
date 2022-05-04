import React from "react";
import styles from "./styles.module.scss";

export default function App() {
  return (
    <div>
      <header className={styles.header}>
        <h1>
          <a className={styles.link} href="/">
            Github Issues Viewer
          </a>
        </h1>
      </header>
    </div>
  );
}
