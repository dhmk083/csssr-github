import React from "react";
import { useStore } from "variants/zustand";
import Search from "components/Search";

export default function SearchContainer() {
  return <Search {...useStore((s) => s.search)} />;
}
