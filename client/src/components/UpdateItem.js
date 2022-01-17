import { useState } from "react";

const UpdateItem = ({
  title = "Update Inventory Item",
  onSubmit,
  data,
  modalId,
}) => {
  const [itemName, setItemName] = useState(data.itemName || "");
  const [itemType, setItemType] = useState(data.itemType || "");
  const [itemCount, setItemCount] = useState(data.itemCount || "");

  const submitForm = async () => {
    const result = {
      itemId: data.itemId,
    };
    if (itemName) {
      result.name = itemName;
    }
    if (itemType) {
      result.type = itemType;
    }
    if (itemCount) {
      result.count = itemCount;
    }
    try {
      await onSubmit(result);
      window.location.reload(false);
    } catch (err) {
      console.log("error: form submit");
    }
  };

  return (
    <div
      className="modal fade"
      id={modalId}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="itemName" className="form-label">
                  Item Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="itemName"
                  value={itemName}
                  onChange={(event) => setItemName(event.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="itemType" className="form-label">
                  Item Type
                </label>
                <select
                  className="form-select"
                  id="itemType"
                  value={itemType}
                  onChange={(event) => setItemType(event.target.value)}
                >
                  <option></option>
                  <option>Electronics</option>
                  <option>Clothing</option>
                  <option>Home</option>
                  <option>Books</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="itemCount" className="form-label">
                  Item Count
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="itemCount"
                  value={itemCount}
                  onChange={(event) => setItemCount(event.target.value)}
                  required
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => submitForm()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateItem;
