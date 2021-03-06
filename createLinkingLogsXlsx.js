const axios = require("axios");
const ExcelJS = require("exceljs");
require("dotenv").config({ path:"./.env" });
const createLinkingLogsXlsx = async (req, res) => {
  // console.log("body : ", req.query);
  const data = req.query;
  console.log("body : ", data);
  // return req.LinkingDate

  const logsResult = await axios.get(
    `http://${process.env.MONGO_IP}:3001/getlinkinglogs`,
    { headers: { "Contant-Type": "application/json" }, params: data }
  );

  const inventoryLogsResult = await axios.get(
    `http://${process.env.MONGO_IP}:3001/getinventorylogs`,
    { headers: { "Contant-Type": "application/json" }, params: data }
  );

  // console.log("logsResult : ", logsResult.data);
  const inventoryLogs = inventoryLogsResult.data;
  // console.log("inventorylogs : ",inventoryLogs)
  const linkinglogs = logsResult.data;
  

  
linkinglogs.map((product)=>{
  product.newPosUnitCost = product.PosUnitCost;
  product.newPosUnitPrice = product.PosUnitPrice;
  if(product.PosUnitPrice === "" || product.PosUnitCost === ""){
  product.PriceIncrease = "";
  product.PriceDecrease = "";
  product.PriceSame = "";
  }else{

    product.PriceIncrease = (product.PosUnitPrice > product.PosUnitCost) ? "YES" :"";
    product.PriceDecrease = (product.PosUnitPrice < product.PosUnitCost) ? "YES" :"";
    product.PriceSame = (product.PosUnitPrice === product.PosUnitCost) ? "YES" :"";
  }
  inventoryLogs.map((inventLog)=>{
  if(product.Barcode === inventLog.Barcode && product.ItemCode === inventLog.ItemNo){
      product.OldInventory = inventLog.OldQty;
      product.NewInventory = inventLog.NewQty;
  }
  })
})
console.log("newArray : ",linkinglogs)
  if(linkinglogs.length !== 0){
    
  
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("linkinglogs", {
    headerFooter:{firstHeader: "Hello Exceljs", firstFooter: "Hello World"}});
  worksheet.columns = [
    { header: "S.NO", key: "s_no", width: 10 },
    { header: "REMARKS", key: "REMARKS", width: 10 },
    { header: "SKU", key: "SKU", width: 10 },
    { header: "BARCODE", key: "Barcode", width: 15 },
    { header: "ITEM CODE", key: "ItemCode", width: 45 },
    { header: "INV UNIT COST", key: "InvUnitCost", width: 10 },
    { header: "POS UNIT COST", key: "PosUnitCost", width: 10 },
    { header: "COST DECREASE", key: "CostDecrease", width: 12 },
    { header: "COST INCREASE", key: "CostIncrease", width: 10 },
    { header: "COST SAME", key: "CostSame", width: 10 },
    { header: "UNIDENTIFIED", key: "Unidentified", width: 15 },
    { header: "NOT FOUND IN POS", key: "NotFoundPos", width: 10 },
    { header: "INV ERROR", key: "InvError", width: 10 },
    { header: "POS UNIT COST", key: "newPosUnitCost", width: 10 },
    { header: "POS UNIT PRICE", key: "newPosUnitPrice", width: 10 },
    { header: "PRICE DECREASE", key: "PriceDecrease", width: 12 },
    { header: "PRICE INCREASE", key: "PriceIncrease", width: 10 },
    { header: "PRICE SAME", key: "PriceSame", width: 10 },
    { header: "Old Qty", key: "OldInventory", width: 10 },
    { header: "New Qty", key: "NewInventory", width: 10 },
    { header: "POS DESCRIPTION", key: "PosDescription", width: 20 },
    { header: "INVOICE DESCRIPTION", key: "InvoiceDescription", width: 55 },
    { header: "DEPARTMENT", key: "Department", width: 15 },
    { header: "SIZE", key: "Size", width: 10 },
    { header: "TIME STAMP", key: "TimeStamp", width: 10 },
    { header: "REMARKS", key: "", width: 10 },
    { header: "ITEM CODE ERROR", key: "", width: 10 },
    { header: "S.NO", key: "s_no2", width: 10 },
    
  ];

  let count = 1;
  linkinglogs.forEach((log) => {
    log.s_no = count;
    log.s_no2 = count;
    worksheet.addRow(log);
    count += 1;
  });

  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, size: 12, name: "Calibri" };
    cell.alignment = { vertical: "middle", horizontal: "center",wrapText: true };
  });
  worksheet.getRow(1).height = 60;
  worksheet.getCell("H1").fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00FFFF00" } , fgColor:{argb:'F08080'}};
  worksheet.getCell("I1").fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "0000B0F0" } , fgColor:{argb:'F08080'}};
  worksheet.getCell("J1").fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00F79646" } , fgColor:{argb:'F08080'}};
  worksheet.getCell("K1").fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00FC6CDD" } , fgColor:{argb:'F08080'}};
  worksheet.getCell("L1").fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00FF0000" } , fgColor:{argb:'F08080'}};
  worksheet.getCell("M1").fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "0066FF66" } , fgColor:{argb:'F08080'}};
  worksheet.getCell("P1").fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00FFFF00" } , fgColor:{argb:'F08080'}};
  worksheet.getCell("Q1").fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "0000B0F0" } , fgColor:{argb:'F08080'}};
  worksheet.getCell("R1").fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00F79646" } , fgColor:{argb:'F08080'}};
  // worksheet.getCell("T1").fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00FFFF00" } , fgColor:{argb:'F08080'}};
  // worksheet.getCell("U1").fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "0000B0F0" } , fgColor:{argb:'F08080'}};
  // worksheet.getCell("V1").fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00F79646" } , fgColor:{argb:'F08080'}};


  worksheet.getCell(`H${count+2}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00FFFF00" } , fgColor:{argb:'F08080'}};
  worksheet.getCell(`H${count+2}`).value = 0;
  worksheet.getCell(`I${count+2}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "0000B0F0" } , fgColor:{argb:'F08080'}};
  worksheet.getCell(`I${count+2}`).value = 0;
  worksheet.getCell(`J${count+2}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00F79646" } , fgColor:{argb:'F08080'}};
  worksheet.getCell(`J${count+2}`).value = 0;
  worksheet.getCell(`K${count+2}}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00FC6CDD" } , fgColor:{argb:'F08080'}};
  worksheet.getCell(`K${count+2}`).value = 0;
  worksheet.getCell(`L${count+2}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00FF0000" } , fgColor:{argb:'F08080'}};
  worksheet.getCell(`L${count+2}`).value = 0;
  worksheet.getCell(`M${count+2}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "0066FF66" } , fgColor:{argb:'F08080'}};
  worksheet.getCell(`M${count+2}`).value = 0;
  worksheet.getCell(`P${count+2}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00FFFF00" } , fgColor:{argb:'F08080'}};
  worksheet.getCell(`P${count+2}`).value = 0;
  worksheet.getCell(`Q${count+2}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "0000B0F0" } , fgColor:{argb:'F08080'}};
  worksheet.getCell(`Q${count+2}`).value = 0;
  worksheet.getCell(`R${count+2}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00F79646" } , fgColor:{argb:'F08080'}};
  worksheet.getCell(`R${count+2}`).value = 0;
  let row = 2;
  logsResult.data.map((log)=>{
    // console.log("row : ",row)
    // console.log("count : ",count);
    // console.log("cons increase : ",log.CostSame)
  
    if(log.CostSame === "YES"){
      worksheet.getCell(`J${row}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00F79646" } , fgColor:{argb:'F08080'}};
      worksheet.getCell(`J${count+2}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00F79646" } , fgColor:{argb:'F08080'}};
      worksheet.getCell(`J${count+2}`).value += 1;
    }
    if(log.CostIncrease === "YES"){
      worksheet.getCell(`I${row}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "0000B0F0" } , fgColor:{argb:'F08080'}};
      worksheet.getCell(`I${count+2}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "0000B0F0" } , fgColor:{argb:'F08080'}};
      worksheet.getCell(`I${count+2}`).value += 1;
    }
    if(log.CostDecrease === "YES"){
      worksheet.getCell(`H${row}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00FFFF00" } , fgColor:{argb:'F08080'}};
      worksheet.getCell(`H${count+2}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00FFFF00" } , fgColor:{argb:'F08080'}};
      worksheet.getCell(`H${count+2}`).value += 1;
    }
    if(log.Unidentified === "YES"){
      worksheet.getCell(`K${row}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00FC6CDD" } , fgColor:{argb:'F08080'}};
      worksheet.getCell(`K${count+2}}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00FC6CDD" } , fgColor:{argb:'F08080'}};
      worksheet.getCell(`K${count+2}`).value += 1;
      worksheet.getCell(`M${row}`).value = "";
    }
    if(log.Unidentified !== "YES"){
    if(log.InvError === "YES"){
      worksheet.getCell(`M${row}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "0066FF66" } , fgColor:{argb:'F08080'}};
      worksheet.getCell(`M${count+2}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "0066FF66" } , fgColor:{argb:'F08080'}};
      worksheet.getCell(`M${count+2}`).value += 1;
    }}
    if(log.NotFoundPos === "YES" || log.NotFoundPos === ""){
      // worksheet.getCell(`M${row}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00FF0000" } , fgColor:{argb:'F08080'}};
      // worksheet.getCell(`M${count+2}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00FF0000" } , fgColor:{argb:'F08080'}};
      // worksheet.getCell(`M${count+2}`).value += 1;
      worksheet.getCell(`L${row}`).value = "";
    }


    if(log.PriceSame === "YES"){
      worksheet.getCell(`R${row}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00F79646" } , fgColor:{argb:'F08080'}};
      worksheet.getCell(`R${count+2}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00F79646" } , fgColor:{argb:'F08080'}};
      worksheet.getCell(`R${count+2}`).value += 1;
    }
    if(log.PriceIncrease === "YES"){
      worksheet.getCell(`Q${row}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "0000B0F0" } , fgColor:{argb:'F08080'}};
      worksheet.getCell(`Q${count+2}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "0000B0F0" } , fgColor:{argb:'F08080'}};
      worksheet.getCell(`Q${count+2}`).value += 1;
    }
    if(log.PriceDecrease === "YES"){
      worksheet.getCell(`P${row}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00FFFF00" } , fgColor:{argb:'F08080'}};
      worksheet.getCell(`P${count+2}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00FFFF00" } , fgColor:{argb:'F08080'}};
      worksheet.getCell(`P${count+2}`).value += 1;
    }
    
    worksheet.getCell(`A${count+4}`).font = { bold: true, size: 12, name: "Calibri",color:{'argb': 'FFFF0000'} };
    worksheet.getCell(`A${count+4}`).value =`VENDOR:${logsResult.data[0].InvoiceName}`;
    worksheet.getCell(`A${count+5}`).font = { bold: true, size: 12, name: "Calibri" };
    worksheet.getCell(`A${count+5}`).value =`INV #:${logsResult.data[0].InvoiceNo} - INV DATE:${logsResult.data[0].InvoiceDate}`;
    worksheet.getCell(`A${count+6}`).font = { bold: true, size: 12, name: "Calibri" };
    worksheet.getCell(`A${count+6}`).value =`LINKED BY #:${logsResult.data[0].PersonName.split("@")[0]}`;

    row += 1

  })


  
  let colNum = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "AA", "AB"];
  for(let i = 0; i<colNum.length;i++){
    for(let j = 0; j<=count;j++){

        worksheet.getCell(`${colNum[i]}${j}`).border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };

  }
} 
       
  
  // worksheet.getCell("A1:O6").border = {
  //   top: {style:'thin'},
  //   left: {style:'thin'},
  //   bottom: {style:'thin'},
  //   right: {style:'thin'}
  // }

  await workbook.xlsx.writeFile("linkinglogs_file.xlsx").then((data) => {
    console.log("done...");
    res.status(200).download("linkinglogs_file.xlsx");
  });

  }else{
    res.status(201).json("NotFound");
  }
};

module.exports = createLinkingLogsXlsx;
