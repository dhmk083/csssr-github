import create from "zustand";
import { withLenses } from "@dhmk/zustand-lens";
import search from "./search";

export const useStore = create(
  withLenses(() => ({
    search: search(),
  }))
);
