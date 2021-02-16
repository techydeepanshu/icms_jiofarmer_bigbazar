import React, { useState } from 'react'
import styles from './Invoice.module.css'
import { Route } from "react-router-dom";
import DisplayData from '../DisplayData/DisplayData';
import { TesseractService } from '../../services/TesseractService';
import Dropzone from "react-dropzone";


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
  const onDrop = (acceptedFiles) => {
    // if (Object.keys(rejected).length !== 0) {
    //   const message = "Please submit valid file type";
    //   this.setState({ warningMsg: message });
    // } else {
    //   this.props.addFile(accepted);
    //   this.setState({ warningMsg: "" });
    //   console.log(accepted[0].preview);
    //   console.log(accepted)
    //   var blobPromise = new Promise((resolve, reject) => {
    //     const reader = new window.FileReader();
    //     reader.readAsDataURL(accepted[0]);
    //     reader.onloadend = () => {
    //       const base64data = reader.result;
    //       resolve(base64data);
    //     };
    //   });
    //   blobPromise.then(value => {
    //     console.log(value);
    //   });
    // }
    console.log(acceptedFiles);
    console.log(acceptedFiles[0].preview)
    const reader = new window.FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onloadend = () => {
      const base64data = reader.result;
      console.log(base64data);
      setImagePreviewUrl(base64data)
    }
  };
  const displaySelectFile = () => {
    return (
      <div className={styles.main}>
        <div className={styles.Filter}>
          <label className="p-3">Select Invoice </label>
          <select
            className="btn btn-secondary dropdown-toggle"
            value={selectedDropdown}
            onChange={handleDropdownChange}
          >
            {dropdownOptions.map((opt) => {
              return <option key={opt}>{opt}</option>;
            })}
          </select>

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
        </div>
        <Dropzone onDrop={acceptedFiles => onDrop(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className={styles.image_upload_wrap}>
                  <div className={styles.drag_text}>
                    {imagePreviewUrl ? (
                      <img
                        src={imagePreviewUrl}
                        className={styles.file_upload_image}
                        //  className="file-upload-image"
                        alt="invoice"
                      />
                    ) : <h3>Drag and drop a file or select add Image</h3>}
                    <div className="content">
                    </div>

                  </div>
                </div>
              </div>

            </section>
          )}
        </Dropzone>

       


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
        <button type="button" onClick={scanInvoice} className={styles.button}>  Scan Invoice</button>
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
