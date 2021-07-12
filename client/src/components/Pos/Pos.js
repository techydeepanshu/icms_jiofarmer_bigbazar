import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { InventoryService } from "../../services/InventoryService";
import { Api } from "../../services/Api";
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CButton,
  CContainer,
  CCol,
  CRow,
  CFormGroup,
  CLabel,
  CInput,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from "@coreui/react";
import firebase from "../../firebase";
import Spinner from "../../UI/Spinner/Spinner";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
const POS = () => {
  const inventoryService = new InventoryService();
  const api = new Api();
  const [queue, setQueue] = useState([]);
  const [loader, setLoader] = useState(true);
  const [categoryArray, setCategoryArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState(null);
  const [header, setHeader] = useState([]);
  const [fuzzSuggestion, setFuzzSuggestion] = useState([]);
  const [selectedItemNo, setSelectedItemNo] = useState("");
  const [modalLabel, setModalLabel] = useState("");
  const [state, setState] = useState({
    item: "",
    quantity: "",
    description: "",
    price: "",
    pos: "",
    barcode: "",
    posSku: "",
    invoice: "",
  });
  const handleChange = (key, val) => {
    setState({
      ...state,
      [key]: val,
    });
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    const ref = firebase.database().ref("/review");
    ref.on("value", (snapshot) => {
      if (snapshot.val()) {
        const data = Object.values(snapshot.val());
        setQueue(data);
        setLoader(false);
      }
    });
  }, []);
  const setContentExtra = (o) => {
    setContent(o);
    let header = [];
    for (var prop in o) {
      if (Object.prototype.hasOwnProperty.call(o, prop)) {
        header.push(prop);
      }
    }
    setHeader(header);
    let newState = {
      item: o.itemNo,
      description: o.description,
      pos: o.posName,
      barcode: o.barcode,
      posSku: o.posSku || "",
      invoice: o.invoiceName,
    };
    setState(newState);
    api
      .GetFuzz(o.description, "pos")
      .then((res) => {
        const filter = res.result.map((element) => {
          let obj = { ...element };
          obj.label = `${element.name}- ${element.price}- ${element.upc}`;
          console.log(obj);
          return obj;
          
        });
        setFuzzSuggestion(filter);
      })
      .catch((err) => console.log(err));
  };

  const changeDropdown = () => {
    api
      .GetFuzz("", "pos")
      .then((res) => {
        const filter = res.result.map((element) => {
          let obj = { ...element };
          obj.label = `${element.name}- ${element.price}- ${element.upc}`;
          console.log(obj);
          return obj;
          
        });
        setFuzzSuggestion(filter);
      })
      .catch((err) => console.log(err));
  };

  const addProduct = () => {
    console.log(selectedItemNo);
    setShowModal(!showModal);
    const data = {
      invoiceName: state.invoice,
      itemName: state.item,
      value: { POS: state.pos, Barcode: state.barcode, PosSKU: state.posSku, isReviewed: "true" },
    };
    
    setLoader(true);
    inventoryService
      .UpdateProductFields(data)
      .then((res) => {
        if (!res) {
          throw new Error("Product not created")
        }
        console.log(res);
        alert("Successfully updated fields");
      })
      .then(() => deleteAddedProducts(selectedItemNo))
      .catch((err) => {
        console.log(err);
        alert("Some error occuured in creating product");
      })
      .finally(() => setLoader(false));
  };

  const deleteAddedProducts = (item) => {
    try {
      firebase.database().ref(`/review/${item}`).remove();
      let temp = [...queue];
      const filetered = temp.filter((product) => product.itemNo !== item);
      setQueue(filetered);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  if (loader) {
    return <Spinner />;
  }

  return (
    <div style={{ marginTop: "90px" }}>
      <div className="row">
        {queue.map((q, i) => (
          <div className="col-md-4" key={q.itemNo} style={{ padding: "10px" }}>
            <div style={{ border: "1px solid grey", margin: "10px" }}>
              <div className="text-center bg-secondary">{q.itemNo}</div>
              <br />
              <div className="text-center">{q.description}</div>
              <br />
              <div className="row" style={{ marginBottom: "10px" }}>
                <div className="col-md-9"></div>
                <div className="col-md-3">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      setShowModal(true);
                      setModalLabel(q.itemNo);
                      setSelectedItemNo(q.itemNo);
                      setContentExtra(q);
                    }}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CModal show={showModal} onClose={toggleModal}>
        <CModalHeader closeButton>{modalLabel}</CModalHeader>
        <CModalBody>
          <CContainer fluid>
            <CRow>
              <CCol sm="12">
                <CFormGroup>
                  <CLabel htmlFor="name">Name</CLabel>
                  <Autocomplete
                    value={state.item}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        let newState = { ...state };
                        console.log(newValue);
                        // newState.item = newValue.name;
                        newState.description = newValue.name;
                        newState.barcode = newValue.upc;
                        newState.pos = newValue.name;
                        newState.posSku = newValue.sku;
                        setState(newState);
                      }
                    }}
                    id="combo-box"
                    options={fuzzSuggestion}
                    getOptionLabel={(option) => option.label ?? state.item}
                    style={{ paddingTop: 4 }}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" size="small" />
                    )}
                  />
                </CFormGroup>
                <CRow>
                  <CCol sm="6">
                    <CFormGroup>
                      <CLabel htmlFor="type">Barcode</CLabel>
                      <CInput
                        type="text"
                        name="type"
                        value={state.barcode}
                        onChange={(event) =>
                          handleChange("barcode", event.target.value)
                        }
                      />
                    </CFormGroup>
                  </CCol>
                  <CCol sm="6">
                    <CFormGroup>
                      <CLabel htmlFor="short_description">POS SKU</CLabel>
                      <CInput
                        type="text"
                        name="short_description"
                        value={state.posSku}
                        onChange={(event) =>
                          handleChange("posSku", event.target.value)
                        }
                      />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CFormGroup>
                  <CLabel htmlFor="description">Invoice Description</CLabel>
                  <CInput
                    type="text"
                    name="description"
                    value={state.description}
                    onChange={(event) =>
                      handleChange("description", event.target.value)
                    }
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="regular_price">POS Name</CLabel>
                  <CInput
                    type="text"
                    name="regular_price"
                    value={state.pos}
                    onChange={(event) =>
                      handleChange("pos", event.target.value)
                    }
                  />
                </CFormGroup>
                {/* <CRow>
                  <CCol sm="3">
                    <CFormGroup>
                      <CLabel htmlFor="categories">Category</CLabel>
                      <CDropdown name="categories" className="mt-2">
                        <CDropdownToggle caret>
                          {state.categories.length === 0
                            ? "Select a Category"
                            : state.categories[0].id}
                        </CDropdownToggle>
                        <CDropdownMenu>
                          {categoryArray.map((e, i) => (
                            <CDropdownItem
                              key={i}
                              name="categories"
                              onClick={(event) => handleChange(event, e)}
                            >
                              {e}
                            </CDropdownItem>
                          ))}
                        </CDropdownMenu>
                      </CDropdown>
                    </CFormGroup>
                  </CCol>
                  <CCol sm="9"></CCol>
                </CRow> */}
              </CCol>
            </CRow>
          </CContainer>
        </CModalBody>
        <CModalFooter>
        {/* <button onClick={() => changeDropdown()} 
          style={{backgroundColor: "green",
          border: "none",
          color: "white",
          padding: "4px 8px",
          textAlign: "center",
          textDecoration: "none",
          display: "inline-block",
          fontSize: "14px",
          align: "left"}} >
            Change Dropdown
          </button> */}
          <CButton color="primary" onClick={() => addProduct()}>
            Add
          </CButton>{" "}
          <CButton color="secondary" onClick={toggleModal}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
      <div className="row" style={{ marginTop: "40px" }}>
        <div className="col-md-2">
          <Link className="btn btn-lg btn-info" to="/invoice">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};
export default POS;
