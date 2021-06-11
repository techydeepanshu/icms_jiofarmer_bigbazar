import React, { useState } from "react";
import { CRow, CCol, CDataTable } from "@coreui/react";
import { InventoryService } from "../../services/InventoryService";
import Spinner from "../../UI/Spinner/Spinner";
const Inventory = () => {
  const inventoryService = new InventoryService();
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);

  const getProducts = async () => {
    try {
      setLoader(true);
      const res = await inventoryService.SyncInventory();
      const data = res.map((item) => {
        const {
          UPC,
          SKU,
          ItemName,
          Price,
          Cost,
          TotalQty,
          soldQty,
          wordpressSoldQty,
        } = item;
        return {
          upc: UPC,
          ItemName,
          Cost,
          Price,
          SKU,
          CurrentStockQuantity: TotalQty,
          POSSoldQuantity: soldQty,
          wordpressSoldQty,
        };
      });
      setProducts(data);
      alert("Sync complete");
    } catch (error) {
      alert("Couldn't sync inventory", error);
    } finally {
      setLoader(false);
    }
  };
  const fields = [
    {
      key: "upc",
      _style: { width: "10%", position: "sticky", },
      sorter: true,
      filter: false,
    },
    {
      key: "SKU",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
    {
      key: "ItemName",
      _style: { width: "10%", position: "sticky", },
      sorter: false,
      filter: false,
    },
    {
      key: "Cost",
      _style: { width: "10%", position: "sticky", },
      sorter: false,
      filter: false,
    },
    {
      key: "Price",
      _style: { width: "10%", position: "sticky", },
      sorter: false,
      filter: false,
    },
    {
      key: "CurrentStockQuantity",
      _style: { width: "10%", position: "sticky", },
      sorter: false,
      filter: false,
    },
    {
      key: "POSSoldQuantity",
      _style: { width: "10%", position: "sticky", },
      sorter: false,
      filter: false,
    },
    {
      key: "wordpressSoldQty",
      _style: { width: "10%", position: "sticky", },
      sorter: false,
      filter: false,
    },
  ];

  React.useEffect(() => {
    async function getInitialSyncedData() {
      try {
        setLoader(true);
        const res = await inventoryService.getInitialSyncedData();
        const data = res.map((item) => {
          const {
            UPC,
            SKU,
            ItemName,
            Price,
            Cost,
            TotalQty,
            soldQty,
            wordpressSoldQty,
          } = item;
          return {
            upc: UPC,
            ItemName,
            Cost,
            Price,
            SKU,
            CurrentStockQuantity: TotalQty,
            POSSoldQuantity: soldQty,
            wordpressSoldQty,
          };
        });
        setProducts(data);
      } catch (error) {
        alert("Couldn't sync inventory", error);
      } finally {
        setLoader(false);
      }
    }
    getInitialSyncedData();
  }, []);

  if (loader) {
    return <Spinner />;
  }
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
