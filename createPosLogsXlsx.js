const axios = require("axios");
const ExcelJS = require("exceljs");
require("dotenv").config({ path:"./.env" });
const createPosLogsXlsx = async (req, res) => {
  console.log("body : ", req.query);
  const data = req.query;
  console.log("body : ", data);
  // return req.LinkingDate

  const logsResult = await axios.get(
    `http://${process.env.MONGO_IP}:3001/getposlogs`,
    { headers: { "Contant-Type": "application/json" }, params: data }
  );

  console.log("logsResult : ", logsResult.data);
  const poslogs = logsResult.data;

  if(poslogs.length !== 0){
    
  
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("poslogs", {
    headerFooter:{firstHeader: "Hello Exceljs", firstFooter: "Hello World"}});
  worksheet.columns = [
    { header: "Inv-S.NO", key: "SerialNoInInv", width: 10 },
    { header: "SKU", key: "SKU", width: 10 },
    { header: "BARCODE", key: "Barcode", width: 15 },
    { header: "Invoice Description", key: "InvoiceDescription", width: 45 },
    { header: "Pos Description", key: "PosDescription", width: 45 },
    { header: "ItemNo", key: "ItemNo", width: 10 },
    { header: "Pos Unit Cost", key: "PosUnitCost", width: 10 },
    { header: "Pos Unit Price", key: "PosUnitPrice", width: 10 },
    { header: "Inv New Unit Cost", key: "InvUnitCost", width: 12 },
    { header: "Pos New Unit Price", key: "InvUnitPrice", width: 10 },
    { header: "Old Markup", key: "OldMarkup", width: 10 },
    { header: "New Markup", key: "NewMarkup", width: 10 },
    { header: "Inv Unit In Case", key: "InvUnitsInCase", width: 15 },
    { header: "InvCaseCost", key: "InvCaseCost", width: 10 },
   
  ];

  let count = 1;
  poslogs.forEach((log) => {
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
  worksheet.getCell("G1").fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "0000B0F0" } , fgColor:{argb:'F08080'}};
  worksheet.getCell("H1").fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00FFFF00" } , fgColor:{argb:'F08080'}};
  worksheet.getCell("I1").fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "0000B0F0" } , fgColor:{argb:'F08080'}};
  worksheet.getCell("J1").fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00FFFF00" } , fgColor:{argb:'F08080'}};
  

  let row = 2;
  logsResult.data.map((log)=>{
    // console.log("row : ",row)
    // console.log("count : ",count);
    // console.log("cons increase : ",log.CostSame)
  
    worksheet.getCell(`G${row}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "0000B0F0" } , fgColor:{argb:'F08080'}};  
    worksheet.getCell(`H${row}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00FFFF00" } , fgColor:{argb:'F08080'}}; 
    worksheet.getCell(`I${row}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "0000B0F0" } , fgColor:{argb:'F08080'}};
    worksheet.getCell(`J${row}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00FFFF00" } , fgColor:{argb:'F08080'}};  
    // if(log.PosUnitCost){
    //   worksheet.getCell(`G${row}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "0000B0F0" } , fgColor:{argb:'F08080'}};  
    // }
    // if(log.PosUnitPrice){
    //   worksheet.getCell(`J${row}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00FFFF00" } , fgColor:{argb:'F08080'}}; 
    // }
    // if(log.InvUnitCost){
    //   worksheet.getCell(`I${row}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "0000B0F0" } , fgColor:{argb:'F08080'}};
    // }
    // if(log.InvUnitPrice){
    //   worksheet.getCell(`L${row}`).fill = {type: 'pattern',pattern:'lightDown', bgColor: { argb: "00FFFF00" } , fgColor:{argb:'F08080'}};  
    // }
    

    worksheet.getCell(`A${count+4}`).font = { bold: true, size: 12, name: "Calibri",color:{'argb': 'FFFF0000'} };
    worksheet.getCell(`A${count+4}`).value =`VENDOR:${logsResult.data[0].InvoiceName}`;
    worksheet.getCell(`A${count+5}`).font = { bold: true, size: 12, name: "Calibri" };
    worksheet.getCell(`A${count+5}`).value =`INV #:${logsResult.data[0].InvoiceNo} - INV DATE:${logsResult.data[0].InvoiceDate}`;
    worksheet.getCell(`A${count+6}`).font = { bold: true, size: 12, name: "Calibri" };
    worksheet.getCell(`A${count+6}`).value =`LINKED BY #:${logsResult.data[0].Person.split("@")[0]}`;

    row += 1

  })


  
  let colNum = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"];
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

  await workbook.xlsx.writeFile("poslogs_file.xlsx").then((data) => {
    console.log("done...");
    res.status(200).download("poslogs_file.xlsx");
  });

  }else{
    res.status(201).json("NotFound");
  }
};

module.exports = createPosLogsXlsx;
