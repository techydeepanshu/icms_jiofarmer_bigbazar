import React, { useState } from 'react'
import styles from './Invoice.module.css'
import { Route } from "react-router-dom";
import DisplayData from '../DisplayData/DisplayData';
import { TesseractService } from '../../services/TesseractService';
import Dropzone from "react-dropzone";
import Spinner from '../../UI/Spinner/Spinner';


const Invoice = (props) => {
  const dropdownOptions = [
    { value: "Chetak", slug: "chetak" },
    // { value: "Laxmi", slug: "laxmi" },
    // { value: "Sea Mark", slug: "sea-mark" },
    // { value: "Vijay", slug: "vijay" },
    // { value: "Krishna Foods", slug: "krishna-foods" },
    // { value: "Joy Gourmet Foods", slug: "joy-gourmet-foods" },
    { value: "Advance Foods", slug: "advance-foods" },
  ];
  const [selectedDropdown, setSelectedDropdown] = useState(dropdownOptions[0].slug)
  const [file, setFile] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null)
  const [redirect, setRedirect] = useState(false)
  const [filename, setFilename] = useState(null)
  const [loader, setLoader] = useState(false);

  const tesseractService = new TesseractService();
  const path = props.match.url + `/${selectedDropdown}`
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
        setLoader(true)
        const res = await tesseractService.PostImage(file);
        setFilename(res.filename)
        // console.log("file and response on upload mage", res, file);
      };
      postImage()
        .then((data) => {
          setLoader(false);
          setRedirect(true);
          props.history.push(path);
        })
        .catch((err) => {
          setLoader(false);
          alert("Please try again.");
          console.log("err", err);
        })
        // .finally(() => setLoader(false));
    } else {
      alert("Select an image");
    }
  };
  const onDrop = (acceptedFiles) => {
    const reader = new window.FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onloadend = () => {
      const base64data = reader.result;
      // console.log(base64data);
      setImagePreviewUrl(base64data)
    }
  };
  const displaySelectFile = () => {
    return (
      <div className={styles.main}>
        <div className="">
          <label className="">Select Invoice </label>
          <select
           className={styles.Dropdown}
            value={selectedDropdown}
            onChange={handleDropdownChange}
          >
            {dropdownOptions.map((opt) => {
              return <option key={opt.slug} value={opt.slug}>{opt.value}</option>;
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
        <button type="button" onClick={scanInvoice} className={styles.button}>  Scan Invoice</button>
      </div>
    );
  };
  if (redirect) {
    return (
      <Route
        path={path}
        component={() => (
          <DisplayData
            filename={filename}
            selectedInvoice={selectedDropdown}
          />
        )}
      />
    );
  }
  if (loader) {
      return <Spinner />
  }
  return (
    <div>
      {displaySelectFile()}
    </div>
  );
}

export default Invoice

