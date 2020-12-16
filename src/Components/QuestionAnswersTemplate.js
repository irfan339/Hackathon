import React, {Component} from 'react';
import './Welcome.css';

class QuestionAnswersTemplate extends Component{
    constructor(props) {
        super(props);
        this.state={
            defaultRadiovalue: 0,
            defaultCheckboxValues:[0],
            type: props.type,
            stage: props.stage,
            description:props.description,
            question: props.question,
            answer:props.answer,
            addRadioToState:props.addRadioToState,
            addCheckboxToState:props.addCheckboxToState,
            nextbuttonValue:props.nextbuttonValue,
        };
    }
    
    renderRadioButton(question, answers){
        var lis = [];
        for(var i = 0; i < answers.length ; i++) {
            lis.push(<br/>);
            lis.push(<div class="custom-control custom-radio left"  >
                        <input type="radio" class="custom-control-input" id={i} value={i} name="Radios" checked={i===this.state.defaultRadiovalue}
                        onChange={(event) => this.setState({defaultRadiovalue: event.target.value})}/>
                        <label class="custom-control-label" for={i}>{answers[i]}</label>
                     </div>    
                    );
            lis.push(<br/>);
            if(this.props.stage === "CompMatchStandard"){
                lis.push(<div className="container">
                            <label className="left">{"["+this.props.description[i]+"]"}</label>
                        </div>
                    );
                lis.push(<br/>);
            }      
        }   
        return (
            <div className="container">
                <hr color="#edf0f"></hr>
                <div className="container" >
                    <h3 className="left">{question} </h3>   
                </div>
                <br/>
                <div className="container">
                    {lis}
                </div>
                <div className="boxwell"></div>
                <br/>
                <button type="button" className="right" onClick={this.onRadioButtonValueChange.bind(this)} class="btn btn-primary btn-lg" >{this.props.nextbuttonValue}</button>
            </div>
          );
    }
    onRadioButtonValueChange() {
        const que = this.props.question;
        const ans = this.props.answer[this.state.defaultRadiovalue];
        const typ = this.props.type;
        const sta =this.props.stage;
        if(ans === "Standard" || ans === "Standard Template" ){
            this.setState({defaultRadiovalue:0});
        }
        this.state.addRadioToState({question:que, answer:ans, type:typ, stage:sta});
    }
    //Completed above Radiobutton Code
    renderCheckbox(question, answers){
        var lis = [];
        lis.push(<br/>);
        for(var i = 0; i < answers.length ; i++) {
            lis.push(<div class="custom-control custom-checkbox left">
                        <input type="checkbox" class="custom-control-input" id={i} value={i} name="checboxes" checked={this.state.defaultCheckboxValues.includes(i)}
                        onChange={(event) => {    
                            event.target.checked ? this.setState({defaultCheckboxValues:[...this.state.defaultCheckboxValues, Number(event.target.value)]}) :
                                    this.setState({defaultCheckboxValues:[...this.state.defaultCheckboxValues.filter(index=>index!=event.target.value)]}) 
                                            }
                        }/>
                        <label class="custom-control-label" for={i}>{answers[i]}</label>
                     </div>    
                    );
            lis.push(<br/>);        
        }   
        return (
            <div className="container">
                <hr color="#edf0f"></hr>
                <div className="container">
                    <h3 className="left">{question} ?</h3>   
                </div>
                <br/>
                <div className="container">
                    {lis}
                </div>
                <button type="button" onClick={this.onCheckboxSelection.bind(this)} class="btn btn-primary btn-lg" >{this.props.nextbuttonValue}</button>
            </div>
          );
    }
    onCheckboxSelection() {
        const que = this.props.question;
        const ans = this.state.defaultCheckboxValues.map(index => this.props.answer[index]);
        const typ = this.props.type;
        const sta =this.props.stage;
        this.setState({defaultCheckboxValues:[0]});
        this.state.addCheckboxToState({question:que, answer:ans, type:typ, stage:sta});
    }
    render(){
        const {question, answer, stage} = this.props;
        return(
            <div>
                <div className="sidenavwhite">
                    {
                        stage==="MerchantType"? <div className="container blueColor" ref="basic">Basic Details</div>:
                        <div className="container">Basic Details</div> 
                    }
                    <hr color="#edf0f"></hr>
                    <div className="container" >Configure Pricing Strategy</div>
                    <hr color="#edf0f"></hr>
                    <div className="container" >Setup GLs</div>
                    <hr color="#edf0f"></hr>
                    <div className="container" >Finish up!</div>
                </div>
                {this.props.type === "radio" ? this.renderRadioButton(question,answer): null}
                {this.props.type === "checkbox" ? this.renderCheckbox(question,answer): null}
                
            </div>
        );
    }
}

export default QuestionAnswersTemplate;