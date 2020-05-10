import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'

import axios from 'axios'


export default class App extends React.Component{

  constructor(props){
    super(props)
    this.state={
      endpoint:'https://jsonplaceholder.typicode.com/users',
      choice:'GET',
      input:'',
      output:'',
      inpCN:"card bg-light",
      opCN:"card bg-light",
      errCnt:0,
      loading:false
    }
    this.auxilary={
      EP:'https://jsonplaceholder.typicode.com/users',
      choice:'GET',
      inp:'',
      op:''
    }
  }

  urlChange=(event)=>{

    console.log('Inside url changer',event.target.value)

    this.setState({endpoint:event.target.value})
    this.auxilary.EP=event.target.value
    //this.state.endpoint=event.target.value

    console.log("This.state.endpoint",this.state.endpoint)

  }

  choiceChange=(event)=>{
    console.log("Inside chice change",event.target.value)

    this.setState({choice:event.target.value})
    this.auxilary.choice=event.target.value

    console.log("Auxilary choice",this.auxilary.choice)
    //this.state""".choice=event.target.value

    console.log("This.state.change",this.state.choice)

  }

  changeInput=(event)=>{
    console.log("Inside change input ",event.target.value)

    this.setState({input:event.target.value})
    this.auxilary.inp=event.target.value
    //this.state.input=event.target.value

    console.log("this.state.input",this.state.input)

  }

  download=()=>{
    this.setState({errCnt:0})
    let url_download=`https://chrome.google.com/webstore/detail/moesif-orign-cors-changer/digfbfaphojjndkpccljibejjbppifbc?hl=en-US`
    window.open(url_download)
  }

  hitit= async(event)=>{

    console.log("Choice",this.auxilary.choice)

    console.log("EP",this.auxilary.EP)

    this.setState({output:"",loading:true})
    this.setState({inpCN:"card bg-light"})
    this.setState({opCN:"card bg-light"})
    console.log("Inside hitit ",event.target.value)
    let input1=this.auxilary.inp

    let url_download=`https://chrome.google.com/webstore/detail/moesif-orign-cors-changer/digfbfaphojjndkpccljibejjbppifbc?hl=en-US`

    //axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

    if(this.auxilary.choice==="GET"){
      let data={}
      try {
        data=JSON.parse(input1)
      } catch (error) {
        if(input1!==""){
        this.setState({inpCN:"card bg-warning"})
        }
        data={}
      }
      axios.get(this.auxilary.EP,data)
      .then(res=>{
          let received=JSON.stringify(res, undefined, 4)
          this.setState({output:received})
      })
      .catch(err=>{
        let count=this.state.errCnt
        count++
        this.setState({errCnt:count})
        this.setState({opCN:"card bg-warning"})
        this.setState({output:err})
        console.log("Error while fetching data")
      })
    }

    else if(this.auxilary.choice==="PUT"){

      let data={}
      try {
        data=JSON.parse(input1)
      } catch (error) {
        if(input1!==""){
          this.setState({inpCN:"card bg-warning"})
          }
        data={}
      }

      axios.put(this.auxilary.EP,data)
      .then(res=>{
        let received=JSON.stringify(res, undefined, 4)
        this.setState({output:received})
      })
      .catch(err=>{
        let count=this.state.errCnt
        count++
        this.setState({errCnt:count})
        this.setState({opCN:"card bg-warning"})
        this.setState({output:err})
        console.log("Error while fetching data")
      })


    }

    else if(this.auxilary.choice==="POST"){
     
      let data={}
      try {
        data=JSON.parse(input1)
      } catch (error) {
        if(input1!==""){
          this.setState({inpCN:"card bg-warning"})
          }
        data={}
      }
      axios.post(this.auxilary.EP,data)
      .then(res=>{
        console.log("Response",res)
        let received=JSON.stringify(res, undefined, 4)
        this.setState({output:received})
      })
      .catch(err=>{
        let count=this.state.errCnt
        count++
        this.setState({errCnt:count})
        this.setState({opCN:"card bg-warning"})
        this.setState({output:err})
        console.log("Error while fetching data")
      })

    }

    else{
 
     
      axios.delete(this.auxilary.EP)
      .then(res=>{
        let received=JSON.stringify(res, undefined, 4)
        this.setState({output:received})
      })
      .catch(err=>{
        let count=this.state.errCnt
        count++
        this.setState({errCnt:count})
        this.setState({opCN:"card bg-warning"})
        this.setState({output:err})
        console.log("Error while fetching data")
      })
 
    }

    this.setState({loading:false})
    //this.setState({output:input1})
    //this.setState({output:input1})
    //console.log("Input1",input1)
    //console.log("Output",this.state.output,"Input",this.state.input)

  }

  outchange=(event)=>{

    let data=event.target.value

    this.setState({output:data})


  }



  render(){

    return (
    <div className="container-fluid bg-secondary">


      <div className="bg-dark text-light display-1">
          Post Online
      </div>
      <br/>
      <div className="card bg-light">
        <div className="card-body">
          <div className="form-group">

            <input onChange={this.urlChange} type="text" className="form-control" id="usr" placeholder="Paste Your EndPoint Here" value="https://jsonplaceholder.typicode.com/users" />
            <br/>
            <select onChange={this.choiceChange} className="form-control" id="sel1">
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>

          </div>
        </div>
      </div>

      <br/>
      <button onClick={this.hitit} type="button" className="col-12 btn btn-danger">Hit the Endpoint</button>
      <br/>
      <br/>
      <div className="jumbotron">
      {this.state.loading?<div className="row">
            <div className="col-12">
            <div class="alert alert-primary">
                        <strong>LOADING</strong> Hitting the api
                      </div>
        </div>
        </div>:<div/>
  }
        <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <div className={this.state.inpCN}>
                <div className="card-body">
                  <div className="form-group">
                      {this.state.inpCN!=="card bg-light"?<div class="alert alert-success">
                        <strong>OOPS</strong> Please enter a valid JSON
                      </div>:<div/>}
                    <label for="comment">Input:</label>
                    <textarea onChange={this.changeInput} className="form-control" rows="20" id="comment"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <div className={this.state.opCN}>
              <div className="card-body">
                <div className="form-group">
                    {this.state.errCnt>3?<button onClick={this.download} type="button" className="col-12 btn btn-success">Download the extension and turn on to fix some common error</button>:<div/>}
                    {this.state.opCN!=="card bg-light"?<div class="alert alert-success">
                            <strong>Error</strong> Hitting the API
                          </div>:<div/>}
                    <label for="comment">Output:</label>
    <textarea onChange={this.outchange} className="form-control" rows="20" id="comment" value={this.state.output}></textarea>
                </div>
              </div>
            </div>
            </div>
          </div>
      </div>


    </div>
    )


  }

}
