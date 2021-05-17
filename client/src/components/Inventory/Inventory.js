import React, { useState } from "react";
import { CRow, CCol, CDataTable } from "@coreui/react";
import { InventoryService } from "../../services/InventoryService";
const Inventory = () => {
  const inventoryService = new InventoryService();
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const res = await inventoryService.SyncInventory();
      const data = res.map((item) => {
        const {
          UPC,
          ItemName,
          Price,
          PrevPrice,
          Cost,
          PrevCost,
          TotalQty,
          PrevTotalQty,
        } = item;
        return {
          upc: UPC,
          ItemName,
          Cost,
          Price,
          CurrentStockQuantity:TotalQty,
          PreviousQuantity: PrevTotalQty,
        };
      });console.table(data)
      setProducts(data);
      alert("Sync complete");
    } catch (error) {
      alert("Couldn't sync inventory", error);
    }
    // if (products.length === 0)
    //   inventoryService
    //     .getAllProducts()
    //     .then((res) => {
    //       setProducts(res);
    //     })
    //     .catch((err) => console.log(err));
  };
  const fields = [
    {
      key: "upc",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
    {
      key: "ItemName",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
    {
      key: "Cost",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
    {
      key: "Price",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
    {
      key: "CurrentStockQuantity",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
    {
      key: "PreviousQuantity",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
  ];
  return (
    <div style={{ marginTop: "80px" }}>
      <CRow>
        <CCol sm="10"></CCol>
        <CCol sm="2">
          <button className="btn btn-lg btn-info" onClick={() => getProducts()}>
            Sync
          </button>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="12">
          <CDataTable items={products} fields={fields} hover />
        </CCol>
      </CRow>
    </div>
  );
};
export default Inventory;
