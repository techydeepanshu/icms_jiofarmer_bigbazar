import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import axios from 'axios';
import {applyFilter,emptyColumnForChetak} from './filter';
import {optionData} from './optionData'
class App extends Component{
  constructor(props){
    super(props);
    this.state={file:null,loading:false,arr:[],optionArray:[],optionSelected:"",option:null}
    this.getFile=this.getFile.bind(this);
    this.onUpload=this.onUpload.bind(this);
    this.handleChange=this.handleChange.bind(this);
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
    let resultNew=emptyColumnForChetak(result)
    //console.log(resultNew)
    let option=optionData[this.state.optionSelected];
    let arr=applyFilter(resultNew,option);
    this.setState({loading:false,arr:arr,option:option});
  }
  render(){
    if(this.state.loading)return(<div className="text-center">Processing..</div>)
    return(
      <>
        <select onChange={(event)=>this.handleChange(event)} name="optionSelected">
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
      </>
    );
  }
}
export default App;