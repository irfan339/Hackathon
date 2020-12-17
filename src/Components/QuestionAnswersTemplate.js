import React, {Component} from 'react';
import './Welcome.css';

class QuestionAnswersTemplate extends Component{
    constructor(props) {
        super(props);
        this.state={
            defaultRadiovalue: props.defaultRadiovalue,
            defaultCheckboxValues:props.defaultCheckboxValues,
            type: props.type,
            stage: props.stage,
            description:props.description,
            question: props.question,
            answer:props.answer,
            addRadioToState:props.addRadioToState,
            addCheckboxToState:props.addCheckboxToState,
            onPreviousRadioButton:props.onPreviousRadioButton,
            nextbuttonValue:props.nextbuttonValue,
        };
    }
    
    componentDidUpdate(prevProps){
        const{stage} =this.props;
        if(stage !== prevProps.stage)
        {
          this.setState({
            defaultRadiovalue: this.props.defaultRadiovalue,
            defaultCheckboxValues:this.props.defaultCheckboxValues,
            type: this.props.type,
            stage: this.props.stage,
            description:this.props.description,
            question: this.props.question,
            answer: this.props.answer,
            addRadioToState: this.props.addRadioToState,
            addCheckboxToState: this.props.addCheckboxToState,
            onPreviousRadioButton:this.props.onPreviousRadioButton,
            nextbuttonValue: this.props.nextbuttonValue,
          });
        }
    }

    renderRadioButton(question, answers){
        var lis = [];
        for(var i = 0; i < answers.length ; i++) {
            lis.push(<br/>);
            lis.push(<div class="custom-control custom-radio left"  >
                        <input type="radio" class="custom-control-input" id={i} value={i} name="Radios" checked={i===this.state.defaultRadiovalue}
                        onChange={(event) => {this.state.stage === "CompMatchStandard"?
                                            this.setState({defaultRadiovalue: Number(event.target.value),nextbuttonValue:"Configure "+this.state.answer[event.target.value]}):
                                            this.setState({defaultRadiovalue: Number(event.target.value)})
                                            }}/>
                        <label class="custom-control-label" for={i}>{answers[i]}</label>
                     </div>    
                    );
            lis.push(<br/>);
            if(this.props.stage === "MerchantType" || this.props.stage === "CompMatchStandard"){
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
                    <h3 className="left ">{question}</h3> 
                </div>
                <br/>
                <div className="container">
                    {lis}
                </div>
                <div className="boxwell"></div>
                <br/>

                <button type="button"  onClick={this.onPreviousRadioButton.bind(this)} class="btn btn-primary btn-lg left amazonColorDark" >Previous</button>
                <button type="button"  onClick={this.onRadioButtonValueChange.bind(this)} class="btn btn-primary btn-lg right amazonColorDark" >{this.state.nextbuttonValue}</button>

            </div>
          );
    }
    onPreviousRadioButton(){
        this.state.onPreviousRadioButton({stage:this.state.stage});
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
                        <input type="checkbox" class="custom-control-input" id={i} value={i} name="checboxes" 
                            checked={this.state.defaultCheckboxValues?this.state.defaultCheckboxValues.includes(i):false}
                        onChange={(event) => {    
                            (event.target.checked && this.state.defaultCheckboxValues) ? 
                                        this.setState({defaultCheckboxValues:[...this.state.defaultCheckboxValues, Number(event.target.value)]}) :
                            (event.target.checked ? this.setState({defaultCheckboxValues:[Number(event.target.value)]}):
                            this.setState({defaultCheckboxValues:[...this.state.defaultCheckboxValues.filter(index=>index!==Number(event.target.value))]}) )
                                            }
                        }/>
                        <label class="custom-control-label" for={i}>{answers[i]}</label>
                     </div>    
                    );
            lis.push(<br/>);  
            if(this.props.stage === "ConfigsStandard"){
                lis.push(<div className="container">
                            <label className="left">{"["+this.props.description[i]+"]"}</label>
                        </div>
                    );
                lis.push(<br/>);lis.push(<br/>);
            }          
        }   
        return (
            <div className="container">
                <hr color="#edf0f"></hr>
                <div className="container">
                    <h3 className="left">{question}</h3>   
                </div>
                <br/>
                <div className="container">
                    {lis}
                </div>
                <br/>
            
                <button type="button"  onClick={this.onPreviousRadioButton.bind(this)} class="btn btn-primary btn-lg left amazonColorDark" >Previous</button>
                <button type="button" onClick={this.onCheckboxSelection.bind(this)} class="btn btn-primary btn-lg right amazonColorDark" >{this.props.nextbuttonValue}</button>
            </div>
          );
    }
    onCheckboxSelection() {
        const que = this.props.question;
        const ans = this.state.defaultCheckboxValues?
            this.state.defaultCheckboxValues.map(index => this.props.answer[index]) : null;
        const typ = this.props.type;
        const sta =this.props.stage;
        this.state.addCheckboxToState({question:que, answer:ans, type:typ, stage:sta});
    }
    render(){
        const {question, answer, stage} = this.props;
        return(
            <div>
                <div className="sidenavwhite amazonColorDark amazonText">
                    {
                        stage==="MerchantType"? <div className="container blueColor">Basic Details</div>:

                        <div className="container">Basic Details</div> 
                    }
                    <hr color="#edf0f"></hr>
                    {
                        (stage==="CompMatchStandard" || stage==="ConfigsStandard")? <div className="container blueColor">Configure Pricing Strategy</div>:
                        <div className="container">Configure Pricing Strategy</div> 
                    }
                    <hr color="#edf0f"></hr>
                    {
                        (stage==="SelectGLForMerchant" || stage==="AddOnMerchant")? <div className="container blueColor">Setup GLs</div>:
                        <div className="container">Setup GLs</div> 
                    }
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