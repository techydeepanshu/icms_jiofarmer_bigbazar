import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import axios from 'axios';
class App extends Component{
  constructor(props){
    super(props);
    this.state={file:null,loading:false}
    this.getFile=this.getFile.bind(this);
    this.onUpload=this.onUpload.bind(this);
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
    console.log(result);
    this.setState({loading:false})
  }
  render(){
    if(this.state.loading)return(<div className="text-center">Processing..</div>)
    return(
      <>
        <FileBase64 onDone={this.getFile}></FileBase64>
        <button onClick={(event)=>this.onUpload(event)}>Upload</button>
      </>
    );
  }
}
export default App;