import React, { Fragment, useEffect, useState } from "react";
import styles from "./Invoice.module.css";
import { Route } from "react-router-dom";
import DisplayData from "../DisplayData/DisplayData";
import { TesseractService } from "../../services/TesseractService";
import Dropzone from "react-dropzone";
import Spinner from "../../UI/Spinner/Spinner";
import { dropdownOptions } from "../../utils/invoiceList";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

const Invoice = (props) => {
  const [selectedDropdown, setSelectedDropdown] = useState(dropdownOptions[0]);
  // const [file, setFile] = useState(null);
  const [file, setFile] = useState([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [filename, setFilename] = useState(null);
  const [loader, setLoader] = useState(false);

  const tesseractService = new TesseractService();
  const path = props.match.url + `/${selectedDropdown.slug}`;

  const handleFileChange = async (files) => {
    files = Object.values(files);

    if (files.length <= 9) {
      const inputFiles = [];
      const imagePreviewUrls = [];
      files.forEach((selectedFile) => {
        let reader = new FileReader();
        inputFiles.push(selectedFile);
        reader.onloadend = () => {
          // console.log("reader result", reader.result)
          imagePreviewUrls.push(reader.result);
          // setImagePreviewUrl(imagePreviewUrls)
        };
        reader.readAsDataURL(selectedFile);
      });
      setTimeout(() => {
        setFile(inputFiles);
        setImagePreviewUrl(imagePreviewUrls);
      }, 1000);
    } else {
      alert("Select only upto 9 files");
    }
  };
  const scanInvoice = () => {
    if (file.length > 0) {
      const postImage = async () => {
        setLoader(true);
        // const res = await tesseractService.PostImage(file);
        // setFilename(res.filename);
        // console.log("file and response on upload mage", res, file);
        const filenames = await Promise.all(
          file.map(async (inputFile) => {
            try {
              const res = await tesseractService.PostImage(inputFile);
              // console.log("Gettting description for", inputFile, res)
              return res.filename;
            } catch (error) {
              console.log("error fetching descripton", error);
              // return null;
              throw new Error("error");
            }
          })
        );
        setFilename(filenames);
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
          // console.log("err", err);
        });
    } else {
      alert("Select an image");
    }
  };

  const displaySelectFile = () => {
    const numOfCollections = dropdownOptions.length;
    console.log(numOfCollections)
    const dropdownLabel = "Select Invoice("+   numOfCollections   + ")";
    return (
      <div className={styles.main}>
        <Autocomplete
          value={selectedDropdown}
          onChange={(event, newValue) => {
            // console.log("new value", newValue)
            if (newValue) {
              setSelectedDropdown(newValue);
            }
          }}
          id="combo-box"
          options={dropdownOptions}
          getOptionLabel={(option) => option.value}
          style={{ width: 300 }}
          autoHighlight
          renderInput={(params) => (
            <TextField {...params} label={dropdownLabel} variant="outlined" />
          )}
        />
        <div className={styles.file_upload}>
          <div className={styles.Filter}>
            <input
              type="file"
              accept="image/*"
              name="image"
              id="file"
              multiple
              className={styles.file_upload_btn}
              onChange={(e) => handleFileChange(e.target.files)}
            />
          </div>
        </div>
        <Dropzone onDrop={(acceptedFiles) => handleFileChange(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className={styles.image_upload_wrap}>
                  <div className={styles.drag_text}>
                    {imagePreviewUrl.length > 0 ? (
                      <Fragment>
                        <h3>Preview</h3>
                        {imagePreviewUrl.map((file, index) => (
                          <img
                            alt="Preview"
                            key={index}
                            src={file}
                            className={styles.previewStyle}
                          />
                        ))}
                      </Fragment>
                    ) : (
                      <h3>Drag and drop a file or select add Image</h3>
                    )}
                    <div className="content"></div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </Dropzone>
        <button type="button" onClick={scanInvoice} className={styles.button}>
          {" "}
          Scan Invoice
        </button>
      </div>
    );
  };
  useEffect(() => {
    //  console.log("useeffect Input files", file)
    //  console.log("useeffect Preview url", imagePreviewUrl)
  }, [file, imagePreviewUrl]);
  if (redirect) {
    return (
      <Route
        path={path}
        component={() => (
          <DisplayData
            filename={filename}
            selectedInvoice={selectedDropdown.slug}
          />
        )}
      />
    );
  }
  if (loader) {
    return <Spinner />;
  }
  return <div>{displaySelectFile()}</div>;
};

export default Invoice;
