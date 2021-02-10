import React, { useState } from 'react'
import styles from './Invoice.module.css'
import { Route } from "react-router-dom";
import DisplayData from '../DisplayData/DisplayData';


const Invoice = (props) => {
  const dropdownOptions = ['Chetak', 'Laxmi', 'Sea Mark']
  const [selectedDropdown, setSelectedDropdown] = useState(dropdownOptions[0])
  const [file, setFile] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null)
  const [redirect, setRedirect] = useState(false)

  const handleDropdownChange = (e) => {
    setSelectedDropdown(e.target.value)
  }
  const handleFileChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let inputFile = e.target.files[0];
    reader.onloadend = () => {
      setFile(inputFile);
      setImagePreviewUrl(reader.result)
    };
    reader.readAsDataURL(inputFile);
  }
  const scanInvoice = () => {
    if (imagePreviewUrl) {
      setRedirect(true)
      props.history.push(`${props.match.url}/read-value`);
    } else {
      alert("Select an image")
    }
  }
  const displaySelectFile = () => {
    return (
      <div className={styles.main}>
        <div className={styles.Filter}>
          <label>Select Invoice </label>
          <select
            value={selectedDropdown}
            onChange={handleDropdownChange}
          >
            {dropdownOptions.map((opt) => {
              return <option key={opt}>{opt}</option>;
            })}
          </select>

        </div>

        <div class="dropdown show">
          <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown link
          </a>

          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </div>


        <div className={styles.file_upload}>
          <div className={styles.Filter}>
            <input
              type="file"
              accept="image/*"
              name="image"
              id="file"
              className={styles.file_upload_btn}
              onChange={(e) => handleFileChange(e)}
            />
          </div>

          <div className={styles.image_upload_wrap}>
            <div className={styles.drag_text}>
              {imagePreviewUrl ? (
                <img
                  src={imagePreviewUrl}
                  className={styles.file_upload_image}
                  // className="file-upload-image"
                  alt="invoice"
                />
              ) : <h3>Drag and drop a file or select add Image</h3>}

            </div>
          </div>
        </div>


        {/* <div className={styles.Filter}>
          <label>Select Image </label>
          <input
            type="file"
            accept="image/*"
            name="image"
            id="file"
            onChange={(e) => handleFileChange(e)}
          />
        </div> */}
        {/* {imagePreviewUrl ? (
          <img
            src={imagePreviewUrl}
            className={styles.image}
            alt="invoice"
          />
        ) : null} */}
        {/* <button onClick={scanInvoice} className={styles.button}>
          Scan Invoice
          </button> */}
        <button type="button" onClick={scanInvoice} className="btn btn-success">  Scan Invoice</button>
      </div>
    );
  };
  if (redirect) {
    let path = props.match.path + "/read-value";
    // console.log("routing", props.match);
    return (
      <Route path={path} component={() => <DisplayData file={file} />} />
    )
  }
  return (
    <div>
      {displaySelectFile()}
    </div>
  );
}

export default Invoice
