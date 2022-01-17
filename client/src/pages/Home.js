import { useCallback, useEffect, useReducer } from "react";
import axios from "axios";
import { inventoryReducer } from "../reducers/inventoryReducer";
import { API_URL } from "../constants";
import CreateItem from "../components/CreateItem";
import UpdateItem from "../components/UpdateItem";

const Home = () => {
  const [items, dispatchItems] = useReducer(inventoryReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const fetchItems = useCallback(async () => {
    dispatchItems({ type: "ITEM_FETCH_INIT" });
    let result = [];

    try {
      result = await axios.get(`${API_URL}/inventory/all`);

      dispatchItems({
        type: "ITEM_FETCH_SUCCESS",
        payload: result.data,
      });
    } catch (err) {
      dispatchItems({
        type: "ITEM_FETCH_FAILURE",
      });
    }
  }, []);

  const createInventoryItem = async (data) => {
    try {
      await axios.post(`${API_URL}/inventory/create`, data);
    } catch (err) {
      console.log("Could not submit data");
    }
  };

  const updateInventoryItem = async (data) => {
    console.log(data);
    try {
      await axios.patch(`${API_URL}/inventory/update`, data);
    } catch (err) {
      console.log("Could not submit data");
    }
  };

  const deleteInventoryItem = async (itemId) => {
    try {
      await axios.delete(`${API_URL}/inventory/delete?itemId=${itemId}`);
      await fetchItems();
    } catch (err) {
      console.log("Could not delete item");
    }
  };

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <>
      <div className="container">
        <button
          type="button"
          className="btn btn-primary m-2"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Create Item
        </button>
        <a
          type="button"
          className="btn btn-secondary m-2"
          href={`${API_URL}/inventory/download`}
        >
          Download CSV
        </a>
        <CreateItem onSubmit={createInventoryItem} />

        {items.isError && <div>Error fetching posts.</div>}
        {items.isLoading ? (
          <div>Loading ...</div>
        ) : (
          <ItemList
            data={items.data.length > 0 ? items.data : []}
            onDelete={deleteInventoryItem}
            onUpdate={updateInventoryItem}
          />
        )}
      </div>
    </>
  );
};

const ItemList = ({ data, onDelete, onUpdate }) => {
  return data.length === 0 ? (
    <div>Inventory Empty</div>
  ) : (
    data.map((item, index) => (
      <div className="card p-3 mt-3" key={item.itemId}>
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">
          Type: {item.type || "Other"} Count: {item.count}
        </p>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target={`#updateModal${index}`}
        >
          Edit
        </button>
        <UpdateItem
          onSubmit={onUpdate}
          modalId={`updateModal${index}`}
          data={{
            itemId: item.itemId,
            itemName: item.name,
            itemType: item.type,
            itemCount: item.count,
          }}
        />
        <button
          type="button"
          className="btn btn-danger mt-2"
          onClick={() => onDelete(item.itemId)}
        >
          Delete
        </button>
      </div>
    ))
  );
};

export default Home;
