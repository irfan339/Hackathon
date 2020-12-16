import React, {Component} from 'react'

class GLSetTable extends Component{
  constructor(props) {
    super(props);
    this.state={
        type: props.type,
        question: props.question,
        rowHeadings: props.rowHeadings,
        columnHeadings: props.columnHeadings,
        answer:props.answer,
    }
}
    render(){
      const{question,columnHeadings, answer,rowHeadings}= this.state;
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
          rowValues.push(<td><input type="text" value={answer[j][k]}/></td>);
          rowValues.push(<td></td>);
        }
        rowList.push(<tr>{rowValues}</tr>);
      }

      return (
        <div>
            <div>
                <h3>{question} </h3>   
            </div>
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
            <button type="button" class="btn btn-primary btn-lg" >Next</button>
        </div>
      );
    }
}

export default GLSetTable;