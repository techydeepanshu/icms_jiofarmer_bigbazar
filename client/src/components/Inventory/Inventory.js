import React,{useState} from 'react';
import {CRow,CCol,CDataTable} from "@coreui/react";
import { InventoryService } from "../../services/InventoryService";
const Inventory=()=>{
  const inventoryService=new InventoryService();
  const[products,setProducts]=useState([]);
  const getProducts=()=>{
    if(products.length===0)
      inventoryService
        .getAllProducts()
        .then((res) => {
          setProducts(res)
        })
        .catch((err) => console.log(err));
  }
  const fields = [
    { key: 'name', _style: { width: '20%'},sorter:false,filter:false},
    { key: 'regular_price', _style: { width: '20%'},sorter:false,filter:false},
    { key: 'stock_quantity', _style: { width: '20%'},sorter:false,filter:false},
  ]
  return(
    <div style={{marginTop:"80px"}}>
      <CRow>
        <CCol sm="10"></CCol>
        <CCol sm="2"><button className="btn btn-lg btn-info" onClick={()=>getProducts()}>Sync</button></CCol>
      </CRow>
      <CRow>
        <CCol sm="12">
          <CDataTable
            items={products}
            fields={fields}
            hover
          />
        </CCol>
      </CRow>
    </div>
  );
}
export default Inventory;