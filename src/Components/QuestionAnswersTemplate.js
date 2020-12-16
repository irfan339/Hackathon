import React, {Component} from 'react';

class QuestionAnswersTemplate extends Component{
    constructor(props) {
        super(props);
        this.state={
            defaultRadiovalue: 0,
            defaultCheckboxValues:[0],
            type: props.type,
            question: props.question,
            answer:props.answer,
            addRadioToState:props.addRadioToState,
            addCheckboxToState:props.addCheckboxToState
        }
    }
    renderRadioButton(question, answers){
        var lis = [];
        for(var i = 0; i < answers.length ; i++) {
            lis.push(<div class="custom-control custom-radio">
                        <input type="radio" class="custom-control-input" id={i} value={i} name="Radios" checked={i===this.state.defaultRadiovalue}
                        onChange={(event) => this.setState({defaultRadiovalue: event.target.value})}/>
                        <label class="custom-control-label" for={i}>{answers[i]}</label>
                     </div>    
                    );
        }   
        return (
            <div>
                <div>
                    <h3>{question} ?</h3>   
                </div>
                <div className="container">
                    {lis}
                </div>
                <button type="button" onClick={this.onRadioButtonValueChange.bind(this)} class="btn btn-primary btn-lg" >Next</button>
            </div>
          );
    }
    onRadioButtonValueChange() {
        const que = this.state.question;
        const ans = this.state.answer[this.state.defaultRadiovalue];
        const typ = this.state.type;
        this.state.addRadioToState({que:que, ans:ans, type:typ});
    }
    //Completed above Radiobutton Code
    renderCheckbox(question, answers){
        var lis = [];
        for(var i = 0; i < answers.length ; i++) {
            lis.push(<div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id={i} value={i} name="checboxes" checked={this.state.defaultCheckboxValues.includes(i)}
                        onChange={(event) => {    
                            event.target.checked ? this.setState({defaultCheckboxValues:[...this.state.defaultCheckboxValues, Number(event.target.value)]}) :
                                    this.setState({defaultCheckboxValues:[...this.state.defaultCheckboxValues.filter(index=>index!=event.target.value)]}) 
                                            }
                        }/>
                        <label class="custom-control-label" for={i}>{answers[i]}</label>
                     </div>    
                    );
        }   
        return (
            <div>
                <div>
                    <h3>{question} ?</h3>   
                </div>
                <div className="container">
                    {lis}
                </div>
                <button type="button" onClick={this.onCheckboxSelection.bind(this)} class="btn btn-primary btn-lg" >Next</button>
            </div>
          );
    }
    onCheckboxSelection() {
        const que = this.state.question;
        const ans = this.state.defaultCheckboxValues.map(index => this.state.answer[index]);
        const typ = this.state.type;
        this.state.addCheckboxToState({que:que, ans:ans, type:typ});
    }
    render(){
        const {question, answer} = this.props;
        return(
            <div>
                {this.state.type === "radio" ? this.renderRadioButton(question,answer): null}
                {this.state.type === "checkbox" ? this.renderCheckbox(question,answer): null}
                
            </div>
        );
    }
}

export default QuestionAnswersTemplate;