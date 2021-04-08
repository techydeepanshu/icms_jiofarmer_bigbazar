import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { InventoryService } from "../../services/InventoryService";
import {Api} from "../../services/Api"
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
const Pos = () => {
  const inventoryService = new InventoryService();
  const api=new Api();
  const [queue, setQueue] = useState([]);
  const [loader, setLoader] = useState(true);
  const [categoryArray, setCategoryArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState(null);
  const [header, setHeader] = useState([]);
  const [fuzzSuggestion,setFuzzSuggestion]=useState([]);
  const [state, setState] = useState({
    name: "",
    type: "",
    regular_price: "",
    description: "",
    short_description: "",
    categories: [],
    images: [],
  });
  const handleChange = (event, val) => {
    let newState = Object.assign({}, state);
    if (event.target.name !== "categories" && event.target.name !== "images")
      newState[event.target.name] = event.target.value;
    else {
      let o = null;
      if (event.target.name === "categories") {
        o = { id: val };
        newState[event.target.name] = [o];
      } else {
        o = { src: val };
        newState[event.target.name].push(o);
      }
    }
    setState(newState);
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    const ref = firebase.database().ref("/queue");
    ref.on("value", (snapshot) => {
      if (snapshot.val()) {
        const data = Object.values(snapshot.val());
        setQueue(data);
        setLoader(false);
      }
    });
    let c = [];
    inventoryService
      .getAllProducts()
      .then((res) => {
        c = res.map((d) => d.categories[0].id);
        setCategoryArray([...new Set(c)]);
      })
      .catch((err) => console.log(err));
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
      name: o.description,
      type: "simple",
      regular_price: o.cp,
      description: o.description,
      short_description: o.description,
      categories: [],
      images: [],
    };
    setState(newState);
    api
    .GetFuzz(o.description)
    .then((res) => setFuzzSuggestion(res.result))
    .catch((err) => console.log(err));
  };
  const addProduct = () => {
    setShowModal(!showModal);
    inventoryService
      .createProduct(state)
      .then((res) => alert("Successfully created a product"))
      .catch((err) => alert("Some error occuured in creating product"));
  };

  const deleteAddedProducts = (item) => {
    try {
      firebase.database().ref("/queue").child(`${item}`).remove();
      let temp = [...queue];
      setQueue(temp.filter((product) => product !== item));
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
          <div className="col-md-4" key={q.sku} style={{ padding: "10px" }}>
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
        <CModalHeader closeButton>Add Product</CModalHeader>
        <CModalBody>
          <CContainer fluid>
            <CRow>
              <CCol sm="12">
                <CFormGroup>
                  <CLabel htmlFor="name">Name</CLabel>
                  <Autocomplete
                    value={state.name}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        handleChange(event, "");
                      }
                    }}
                    id="combo-box"
                    options={fuzzSuggestion.map(e=>e.itemName)}
                    getOptionLabel={(option) => option}
                    style={{ paddingTop: 4 }}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" size="small" />
                    )}
                  />
                </CFormGroup>
                <CRow>
                  <CCol sm="6">
                    <CFormGroup>
                      <CLabel htmlFor="type">Type</CLabel>
                      <CInput
                        type="text"
                        name="type"
                        value={state.type}
                        onChange={(event) => handleChange(event, "")}
                      />
                    </CFormGroup>
                  </CCol>
                  <CCol sm="6">
                    <CFormGroup>
                      <CLabel htmlFor="regular_price">Regular Price</CLabel>
                      <CInput
                        type="text"
                        name="regular_price"
                        value={state.regular_price}
                        onChange={(event) => handleChange(event, "")}
                      />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CFormGroup>
                  <CLabel htmlFor="description">Description</CLabel>
                  <CInput
                    type="text"
                    name="description"
                    value={state.description}
                    onChange={(event) => handleChange(event, "")}
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="short_description">Short Description</CLabel>
                  <CInput
                    type="text"
                    name="short_description"
                    value={state.short_description}
                    onChange={(event) => handleChange(event, "")}
                  />
                </CFormGroup>
                <CRow>
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
                </CRow>
              </CCol>
            </CRow>
          </CContainer>
        </CModalBody>
        <CModalFooter>
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
export default Pos;
