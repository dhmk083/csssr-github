import React from "react";
import IssuesList from "components/IssuesList";
import Search from "components/Search";
import styles from "./styles.module.scss";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <header className={styles.header}>
          <h1>
            <Link className={styles.link} to="/">
              Github Issues Viewer
            </Link>
          </h1>
        </header>

        <div className={styles.main}>
          <Routes>
            <Route index element={<Search />} />

            <Route path=":owner/:repo/issues">
              <Route index element={<IssuesList />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
