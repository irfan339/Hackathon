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
        if(newValue.stage === "MerchantType" && newValue.answer === "Standard"){
          this.setState({ childAnswers:[...this.state.childAnswers,newValue], value:"CompMatchStandard" });
        } else if(newValue.stage === "CompMatchStandard" && newValue.answer === "Standard Template"){
          this.setState({ childAnswers:[...this.state.childAnswers,newValue], value:"ConfigsStandard" });
        }
    }
    addCheckboxToState(newValue)
    {
        if(newValue.stage === "ConfigsStandard")
        {
          this.setState({ childAnswers:[...this.state.childAnswers,newValue], value:"SelectGLForMerchant" });
        } else if(newValue.stage === "SelectGLForMerchant")
        {
          this.setState({ childAnswers:[...this.state.childAnswers,newValue], value:"PriceVarianceGLTable" });
        }
    }
    addTableToState(newValue)
    {
        if(newValue.stage === "PriceVarianceGLTable"){
          this.setState({ childAnswers:[...this.state.childAnswers,newValue], value:"ThresholdGLTable" });
        } else if(newValue.stage === "ThresholdGLTable"){
          this.setState({ childAnswers:[...this.state.childAnswers,newValue], value:"MonitorGLTable" });
        } else if(newValue.stage === "MonitorGLTable"){
          this.setState({ childAnswers:[...this.state.childAnswers,newValue], value:"AddOnMerchant" });
        }
    }
    render()
    {
      var content;
      if(this.state.value==="WelcomePage"){
        content = this.renderWelcomePage();
          // content=<QuestionAnswersTemplate question={'What is your name'} answer={['garvit','irfan','azhar']} type={'checkbox'} addRadioToState={this.addRadioToState.bind(this)} />;
          // content= <GLSetTable question={'What is your name'}
          //               type={'priceVariance'}
          //               rowHeadings={['Apparel','Books','Shoes']}
          //               columnHeadings={['Field1','Field2','Field3','Field4']}
          //               answer={[ [1,2,3,4], [5,6,7,8], [9,10,11,12] ]}
          // />;
      } else if(this.state.value==="SelectionPage" && this.state.WelcomePageSelection==="Launch"){
        content= this.renderSelectionPage();
      } else if(this.state.value==="MerchantType" && this.state.WelcomePageSelection==="Launch"){
        content= <QuestionAnswersTemplate 
                    question={'What type of Merchant is this ? '} 
                    answer={['3rd Party','Standard','Regional']} 
                    type={'radio'} 
                    stage="MerchantType"
                    nextbuttonValue="Next"
                    addRadioToState={this.addRadioToState.bind(this)} 
                    addCheckboxToState={this.addCheckboxToState.bind(this)}
                  />;
      }  else if(this.state.value==="CompMatchStandard" && this.state.WelcomePageSelection==="Launch"){
        content= <QuestionAnswersTemplate 
                    question={'Select the Comp Match strategy for this Merchant ? '} 
                    answer={['Standard Template','Related Merchant','Comp Match with related merchant as fall back']} 
                    description={['Description: Recommends min(CMT,FMA) competitor input',
                                  'Description: Inherits the price without any filter from parent merchant',
                                  'Description: Price will be recommended at min(CMT,FMA). In absence of input price will be inherited from parent MKPL']}
                    type={'radio'} 
                    stage="CompMatchStandard"
                    nextbuttonValue="Configure Related Merchant"
                    addRadioToState={this.addRadioToState.bind(this)} 
                    addCheckboxToState={this.addCheckboxToState.bind(this)}
                  />;
      } else if(this.state.value==="ConfigsStandard" && this.state.WelcomePageSelection==="Launch"){
        content= <QuestionAnswersTemplate 
                    question={'Select Cofigs for Standard Template  '} 
                    answer={['External Comp match','Internal Comp match','FBA Cede']} 
                    description={['Description: Recommends min(CMT,FMA) competitor input',
                                  'Description: Inherits the price without any filter from parent merchant',
                                  'Description: Price will be recommended at min(CMT,FMA). In absence of input price will be inherited from parent MKPL']}
                    type={'checkbox'} 
                    stage="ConfigsStandard"
                    nextbuttonValue="Proceed to GL Setup"
                    addRadioToState={this.addRadioToState.bind(this)}
                    addCheckboxToState={this.addCheckboxToState.bind(this)}
                  />;
      } else if(this.state.value==="SelectGLForMerchant" && this.state.WelcomePageSelection==="Launch"){
        content= <QuestionAnswersTemplate 
                    question={'Select the GLs for this Merchant  '} 
                    answer={['Apparel','Books','Home Decor','Vehicles','Stationary']} 
                    type={'checkbox'} 
                    stage="SelectGLForMerchant"
                    nextbuttonValue="Next"
                    addCheckboxToState={this.addCheckboxToState.bind(this)} 
                    addRadioToState={this.addRadioToState.bind(this)}
                  />;
      } else if(this.state.value==="PriceVarianceGLTable" && this.state.WelcomePageSelection==="Launch"){
        content= <GLSetTable question={'Enter the Price Variance for Selected GLs'}
                        type={'priceVariance'}
                        stage={'PriceVarianceGLTable'}
                        rowHeadings={['Apparel','Books','Shoes']}
                        columnHeadings={['Field1','Field2','Field3','Field4']}
                        answer={[ [1,2,3,4], 
                                  [5,6,7,8], 
                                  [9,10,11,12] ]}
                        nextbuttonValue="Submit and Proceed to Configure CP Caps"
                        addTableToState={this.addTableToState.bind(this)}
                  />;
      }   
      //end of above if
      return (
            <div className="App">
              <div className="box"></div>
              {this.renderAppTitle()}
              <div className="box"></div>
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
              <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-md-offset-1 boxStyle bg-white amazonBorderColorDark main-page-row">
                <div>logo here</div>
                <div className="jumbotron bg-white">
                    <button type="button" onClick={() => this.setState({WelcomePageSelection: "Launch",value:"SelectionPage"})} class="btn btn-primary btn-lg btn-1">Launch</button>
                    <p>Tiffany, your personal assistant will guide you to launch marketplaces, merchants, product groups and more.</p>
                </div>
              </div>
            <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 boxStyle bg-white amazonBorderColorDark main-page-row">
              <div>logo here</div>
              <div className="jumbotron bg-white">
                  <button type="button"  onClick={() => this.setState({WelcomePageSelection: "Manage",value:"SelectionPage"})} class="btn btn-primary btn-lg btn-1">Manage policies</button>
                  <p>Want to change the pricing strategy or modify guardrails at an hierarchy level? Let Tiffany help you to add, remove or update policies.</p>
              </div>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 boxStyle bg-white amazonBorderColorDark main-page-row">
              <div>logo here</div>
              <div className="jumbotron bg-white">
                   <button type="button" onClick={() => this.setState({WelcomePageSelection: "Simulate",value:"SelectionPage"})} class="btn btn-primary btn-lg btn-1">Simulate</button>
                  <p>Recently launched an entity or updated the policy at an hierarchy level? Let Tiffany guide you to our simulation platform-Fortnight.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    renderSelectionPage(){
      return(
        <div>
            <div class="sidenav text-white  bg-dark cs-card-txt" >
              <div class="card-header">Hola Garvit</div>
              <div class="card-body">
                <h5 class="card-title">I'm Tiffany</h5>
                <p class="card-text">I will be guiding you to launch a new entity or a GL into Retail Pricing. You don't need to understand many config keys.</p>
              </div>
            </div>
            
            <div className="container">
              
              <h3 className="left" >Select Merchant from the Marketplace to Lauch</h3>
              
             <select onChange={(event) => this.setState({marketplace:event.target.value})} class="browser-default custom-select custom-select-lg mb-3">
                  <option disabled selected hidden>Select Marketplace</option>
                  <option value="US">US</option>
                  <option value="Amazon Fresh">Amazon Fresh</option>
                  <option value="Mendel">Mendel</option>
              </select>
              <select onChange={(event) => this.setState({merchant:event.target.value})} class="browser-default custom-select custom-select-lg mb-3">
                  <option disabled selected hidden>Select Merchant</option>
                  <option value="Amazon Fresh">Amazon Fresh</option>
                  <option value="Amazon Lite">Amazon Lite</option>
                  <option value="Amazon GO">Amazon GO</option>
              </select>
              <button type="button" onClick={this.onSelection.bind(this)} class="btn btn-primary btn-lg" >Next</button>
            </div>
        </div> 
      );
    }
    onSelection(){
      const {marketplace,merchant} = this.state;
      if(marketplace && merchant){
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
