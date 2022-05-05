import { lens } from "@dhmk/zustand-lens";
import searchService from "api/search";
import { SearchResponse } from "types";

type State = {
  isLoading: boolean;
  data?: SearchResponse;
  error?: Error;

  search(text: string);
};

const create = () =>
  lens<State>((set) => ({
    isLoading: false,
    data: undefined,
    error: undefined,

    search(text) {
      set({ isLoading: true, data: undefined, error: undefined });

      return searchService(text).then(
        (data) => set({ data, isLoading: false }),
        (error) => set({ error, isLoading: false })
      );
    },
  }));

export default create;
