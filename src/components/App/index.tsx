import React from "react";
import IssuesList from "containers/IssuesList";
import IssueDetails from "containers/IssueDetails";
import Search from "containers/Search";
import ReduxSearch from "containers/ReduxSearch";
import ZustandSearch from "containers/ZustandSearch";
import styles from "./styles.module.scss";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import createStore from "variants/redux";

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={createStore()}>
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
              <Route path="redux" element={<ReduxSearch />} />
              <Route path="zustand" element={<ZustandSearch />} />

              <Route path=":owner/:repo/issues">
                <Route index element={<IssuesList />} />

                <Route path=":issueId" element={<IssueDetails />} />
              </Route>

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  );
}
