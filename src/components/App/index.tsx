import React from "react";
import Search from "components/Search";
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

      <div className={styles.main}>
        <Search />
      </div>
    </div>
  );
}
