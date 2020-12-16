import React, {Component} from 'react'
import './Welcome.css';
class GLSetTable extends Component{
    constructor(props) {
      super(props);
      this.state={
          stage: props.stage,
          question: props.question,
          rowHeadings: props.rowHeadings,
          columnHeadings: props.columnHeadings,
          answer:props.answer,
          nextbuttonValue:props.nextbuttonValue,
          addTableToState:props.addTableToState
      }
    }
    onInputChange(event) {
      const value = event.target.value.trim();
      const row = event.target.id.split(/_/)[0];
      const col = event.target.id.split(/_/)[1];
      var arr = this.state.answer;
      arr[row][col]=value;
      this.setState({answer: arr});
    }
    render(){
      const{question,columnHeadings, answer,rowHeadings,stage}= this.props;
      var colheadlist = [];
      colheadlist.push(<th></th>);
      colheadlist.push(<th></th>);
      for(var i = 0; i < columnHeadings.length ; i++) {
        colheadlist.push(<th>{columnHeadings[i]}</th>);
        colheadlist.push(<th></th>);
      }
      var rowList=[];
      for(var j=0; j < rowHeadings.length ; j++) {
        var rowValues =[];
        rowValues.push(<td><b>{rowHeadings[j]}</b></td>);
        rowValues.push(<td></td>);
        for(var k=0;k<columnHeadings.length;k++){
          rowValues.push(<td><input type="text" id={j+"_"+k} value={answer[j][k]} onChange={this.onInputChange.bind(this)}/></td>);
          rowValues.push(<td></td>);
        }
        rowList.push(<tr>{rowValues}</tr>);
      }
      return (
        <div className="container">
          <div className="sidenavwhite">
                    {
                        stage==="MerchantType"? <div className="container blueColor" ref="basic">Basic Details</div>:
                        <div className="container">Basic Details</div> 
                    }
                    <hr color="#edf0f"></hr>
                    <div className="container" >Configure Pricing Strategy</div>
                    <hr color="#edf0f"></hr>
                    {
                        stage==="PriceVarianceGLTable"? <div className="container blueColor">Setup GLs</div>:
                        <div className="container">Setup GLs</div> 
                    }
                    <hr color="#edf0f"></hr>
                    <div className="container" >Finish up!</div>
            </div>
            <hr color="#edf0f"></hr>
            <div className="container">
                <h3 className="left">{this.props.question} </h3>   
            </div>
            <br/>
            <div className="container">
                <div class="table-responsive">
                      <table class="table table-hover">
                        <thead>
                          <tr> {colheadlist} </tr>
                        </thead>
                        <tbody> {rowList} </tbody>
                      </table>
                </div>
            </div>
            <br/>
            <button type="button" className="right" onClick={this.onTableSeletion.bind(this)} class="btn btn-primary btn-lg" >{this.props.nextbuttonValue}</button>
        </div>
      );
    }
    onTableSeletion() {
      const que = this.props.question;
      const ans = this.state.answer;
      const sta =this.props.stage;
      this.setState({answer: ans});
      console.log(que);
      console.log(ans);
      console.log(sta);
      this.state.addTableToState({question:que, answer:ans, stage:sta});
  }
}

export default GLSetTable;