import React, { useState } from 'react'
import styles from './Invoice.module.css'
import { Route } from "react-router-dom";
import DisplayData from '../DisplayData/DisplayData';
import { TesseractService } from '../../services/TesseractService';

const Invoice = (props) => {
    const dropdownOptions = ['Chetak', 'Laxmi', 'Sea Mark']
    const [selectedDropdown, setSelectedDropdown] = useState(dropdownOptions[0])
    const [file, setFile] = useState(null)
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const tesseractService = new TesseractService();

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
            const postImage = async () => {
              const res = await tesseractService.PostImage(file);
              console.log("res",res)
              // setTableData(calculateTableFields(res));
            };
            postImage()
              .then(data => {
                setRedirect(true)
                props.history.push(`${props.match.url}/read-value`);
              })
              .catch(err => {
                alert("Please try again.")
                console.log("err",err)
              })
            
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
          <div className={styles.Filter}>
            <label>Select Image </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              id="file"
              onChange={(e) => handleFileChange(e)}
            />
          </div>
          {imagePreviewUrl ? (
            <img
              src={imagePreviewUrl}
              className={styles.image}
              alt="invoice"
            />
          ) : null}
          <button onClick={scanInvoice} className={styles.button}>
            Scan Invoice
          </button>
        </div>
      );
    };
    if (redirect) {
        let path = props.match.path + "/read-value";
        // console.log("routing", props.match);
        return (
            <Route path={path} component={() => <DisplayData file={file}/>} />
        )
    }
    return (
        <div>
            {displaySelectFile()}
        </div>
    );
}

export default Invoice
