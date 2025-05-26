function AddItem() {
  return (
    <div>
      <h2 className="content-title">Upload image</h2>
      <div className="add-form">
        <div className="upload-box">Upload</div>
        <input className="input" placeholder="Product name" />
        <textarea className="input textarea" placeholder="Product description" />
        <div className="form-row">
          <select className="input select">
            <option>Sandwich</option>
            <option>Pasta</option>
            <option>Indian</option>
            <option>Cake</option>
          </select>
          <input className="input" placeholder="1000.00" />
        </div>
        <button className="add-btn">Add</button>
      </div>
    </div>
  );
}

export default AddItem;