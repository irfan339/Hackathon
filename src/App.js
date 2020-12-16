import './App.css';
import React, {Component} from 'react';
import QuestionAnswersTemplate from './Components/QuestionAnswersTemplate';
import GLSetTable from './Components/GLSetTable';
// import StepZilla from 'react-stepzilla';

class App extends Component {
    constructor(props) {
      super(props);
      this.state={
          value:"WelcomePage",
          WelcomePageSelection: null,
          marketplace: null,
          merchant: null,
          listofgls:null,
          MMGLError:null,
          typeofMerchant:null,
          childAnswers: []
      };
    }
    addRadioToState(newValue)
    {
        this.setState({ childAnswers:[...this.state.childAnswers,newValue] });
    }
    addCheckboxToState(newValue)
    {
        this.setState({ childAnswers:[...this.state.childAnswers,newValue] });
    }
    render()
    {
      var content;
      if(this.state.value==="WelcomePage"){
        // content=<QuestionAnswersTemplate question={'What is your name'} answer={['garvit','irfan','azhar']} type={'checkbox'} addRadioToState={this.addRadioToState.bind(this)} />;
          content= <GLSetTable question={'What is your name'}
                        type={'priceVariance'}
                        rowHeadings={['Apparel','Books','Shoes']}
                        columnHeadings={['Field1','Field2','Field3','Field4']}
                        answer={[ [1,2,3,4], [5,6,7,8], [9,10,11,12] ]}
          />;//this.renderWelcomePage();
      } else if(this.state.value==="SelectionPage" && this.state.WelcomePageSelection==="Launch"){
        content= this.renderSelectionPage();
      } else if(this.state.value==="MerchantType" && this.state.WelcomePageSelection==="Launch"){
        content= <QuestionAnswersTemplate question={'What is your name'} answer={['garvit','irfan','azhar']} type={'radio'} addRadioToState={this.addRadioToState.bind(this)} />;
      } 
      //end of above if
      return (
            <div className="App">
              {this.renderAppTitle()}
              {content}
            </div>
        
      );
    }
    renderAppTitle(){
      return(
        <div className="container">
                <h1> Launching Merchant </h1>
        </div>
      );
    }
    renderWelcomePage(){
      return(
          <div class="container">
            <div class="row">
              <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-md-offset-1 boxStyle">
                <div>logo here</div>
                <div className="jumbotron">
                    <button type="button" onClick={() => this.setState({WelcomePageSelection: "Launch",value:"SelectionPage"})} class="btn btn-primary btn-lg">Launch</button>
                    <p>Tiffany, your personal assistant will guide you to launch marketplaces, merchants, product groups and more.</p>
                </div>
              </div>
            <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 boxStyle">
              <div>logo here</div>
              <div className="jumbotron">
                  <button type="button"  onClick={() => this.setState({WelcomePageSelection: "Manage",value:"SelectionPage"})} class="btn btn-primary btn-lg">Manage policies</button>
                  <p>Want to change the pricing strategy or modify guardrails at an hierarchy level? Let Tiffany help you to add, remove or update policies.</p>
              </div>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 boxStyle">
              <div>logo here</div>
              <div className="jumbotron">
                   <button type="button" onClick={() => this.setState({WelcomePageSelection: "Simulate",value:"SelectionPage"})} class="btn btn-primary btn-lg">Simulate</button>
                  <p>Recently launched an entity or updated the policy at an hierarchy level? Let Tiffany guide you to our simulation platform-Fortnight.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    renderSelectionPage(){
      return(
          <div class="container">
             <select onChange={(event) => this.setState({marketplace:event.target.value})} class="browser-default custom-select custom-select-lg mb-3">
                  <option disabled selected hidden>Select Marketplace</option>
                  <option value="1">US</option>
                  <option value="2">Amazon Fresh</option>
                  <option value="3">Mendel</option>
              </select>
              <select onChange={(event) => this.setState({merchant:event.target.value})} class="browser-default custom-select custom-select-lg mb-3">
                  <option disabled selected hidden>Select Merchant</option>
                  <option value="1">Amazon Fresh</option>
                  <option value="2">Amazon Lite</option>
                  <option value="3">Amazon GO</option>
              </select>
              <select onChange={(event) => this.setState({listofgls:event.target.value})} class="browser-default custom-select custom-select-lg mb-3">
                  <option disabled selected hidden>Select Product Group</option>
                  <option value="1">Apparel</option>
                  <option value="2">Furniture</option>
                  <option value="3">Grocery</option>
              </select>
              <button type="button" onClick={this.onSelection.bind(this)} class="btn btn-primary btn-lg" >Check</button>
          </div>
      );
    }
    onSelection(){
      const {marketplace,merchant,listofgls} = this.state;
      if(marketplace && merchant && listofgls){
        this.setState({MMGLError:null,value:"MerchantType"});
      } else {
        this.setState({MMGLError:"All the fields need to be selceted"});
      }
    }  
    renderGL(){
      return(
        <div class="container">
          <div>
                <h3>question ?</h3>   
          </div>
          <select onChange={(event) => this.setState({marketplace:event.target.value})} class="browser-default custom-select custom-select-lg mb-3">
              <option disabled selected hidden>Select ParentMerchant from this dropdown</option>
              <option value="1">US</option>
              <option value="2">Amazon Fresh</option>
              <option value="3">Mendel</option>
          </select>
          <button type="button" onClick={this.onSelection.bind(this)} class="btn btn-primary btn-lg" >Proceed to GL Setup</button>
        </div>
      );
    }
}

export default App;
