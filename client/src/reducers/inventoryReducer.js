import produce from "immer";

export const inventoryReducer = produce(
  (draft, action) => {
    switch (action.type) {
      case "ITEM_FETCH_INIT":
        draft.isLoading = true;
        draft.isError = false;
        break;
      case "ITEM_FETCH_SUCCESS":
        draft.isLoading = false;
        draft.isError = false;
        draft.data = action.payload.data;
        break;
      case "ITEM_FETCH_FAILURE":
        draft.isLoading = false;
        draft.isError = true;
        break;
      default:
        break;
    }
  },
  {
    data: [],
    isLoading: false,
    isError: false,
  }
);