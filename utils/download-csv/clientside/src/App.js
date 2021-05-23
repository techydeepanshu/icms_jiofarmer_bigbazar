import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import axios from 'axios';
import {CSVLink} from "react-csv";
import { Multiselect } from 'multiselect-react-dropdown';
import {applyFilter,emptyColumn} from './filter';
import {optionData} from './optionData'
class App extends Component{
  constructor(props){
    super(props);
    this.state={file:null,loading:false,arr:[],optionArray:[],optionSelected:"",option:null,data:[],options:[],csvData:[]}
    this.getFile=this.getFile.bind(this);
    this.onUpload=this.onUpload.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.onSelect=this.onSelect.bind(this);
  }
  handleChange(event){
    this.setState({[event.target.name]:event.target.value});
  }
  componentDidMount(){
    let optionArray=[];
    for(var prop in optionData){
      if (Object.prototype.hasOwnProperty.call(optionData,prop))
        optionArray.push(prop);
    }
    this.setState({optionArray:optionArray});
  }
  onSelect(selectedList, selectedItem){
    let toMerged=selectedList.map(r=>r.id);
    toMerged.sort();
    let csvData=[];
    let d=[];
    for(let i=0;i<this.state.options.length;i++){
      if(!toMerged.includes(i))d.push(this.state.data[0][i]);
    }
    d.push("description");
    csvData.push(d);
    for(let i=1;i<this.state.data.length;i++){
      let x="";
      let d1=[];
      for(let j=0;j<this.state.options.length;j++){
        if(toMerged.includes(j))x=x+" "+this.state.data[i][j];
        else d1.push(this.state.data[i][j]);
      }
      d1.push(x);
      csvData.push(d1);
    }
    console.log(csvData)
    this.setState({csvData:csvData})
  }
  getFile(file){this.setState({file:file})}
  async onUpload(event){
    event.preventDefault();
    this.setState({loading:true})
    let file=this.state.file;
    if(file==null)return;
    let type=file.type.split("/");
    if(type[0]!=="image"){alert("Please select a image");return;}
    let status=true;
    let ts=(new Date())-0;
    await axios.post("/upload",{ext:type[1],base64:file.base64,ts:ts})
    .then((res) => {if(res.data.statusCode===undefined||res.data.statusCode!==200)throw "error"})
    .catch((err) => {status=false;alert("Some error occured try again");});
    if(!status)return;
    let result=null;
    await axios.post("/ocr",{ext:type[1],ts:ts})
    .then((res) => {if(res.data.statusCode===undefined||res.data.statusCode!==200)throw "error"; else result=res.data.body})
    .catch((err) => {status=false;alert("Some error occured try again");});
    if(!status)return;
    console.log(result)
    // let resultNew=emptyColumn(result)
    // console.log(resultNew)
    let option=optionData[this.state.optionSelected];
    let arr=applyFilter(result,option);
     //let arr=applyFilter(resultNew,option);
    let data=[];
    let header=[];
    for(var prop in arr[0]){
      if (Object.prototype.hasOwnProperty.call(arr[0],prop)){
        header.push(prop);
      }
    }
    data.push(header);
    let options=[];
    for(let i=0;i<header.length;i++)options.push({name:header[i],id:i});
    for(let i=0;i<arr.length;i++){
      let d1=[];
      for(let j=0;j<header.length;j++){
        d1.push(arr[i][header[j]]);
      }
      data.push(d1);
    }
    this.setState({loading:false,arr:arr,option:option,data:data,csvData:data,options:options});
  }
  render(){
    if(this.state.loading)return(<div className="text-center">Processing..</div>)
    return(
      <>
        <select onChange={(event)=>this.handleChange(event)} name="optionSelected">
          <option value="">Select</option>
          {
            this.state.optionArray.map((o,i)=>(
              <option key={i} value={o}>{o}</option>
            ))
          }
        </select>
        <FileBase64 onDone={this.getFile}></FileBase64>
        <button onClick={(event)=>this.onUpload(event)}>Upload</button><br/><br/>
        <table className="table table-sm">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              {this.state.option===null?null:this.state.option.header.map((o,i)=>(
                <th scope="col" key={i}>{o}</th>
              ))}
            </tr>
          </thead>
          {this.state.arr.map((o1,i1)=>(
            <tbody key={i1}>
              <tr key={i1}>
                <td>{i1+1}</td>
                {this.state.option===null?null:this.state.option.header.map((o2,i2)=>(
                  <td key={i2}>{o1[o2]}</td>
                ))
                }
              </tr>
            </tbody>
          ))}
        </table>
        {this.state.data.length>1?
          <>
            <div className="col-md-3"><Multiselect options={this.state.options} onSelect={this.onSelect} onRemove={this.onSelect} displayValue="name"/></div>
            <div><CSVLink data={this.state.csvData}>Download</CSVLink></div>
          </>:null
        }
      </>
    );
  }
}
export default App;
