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
        }  else if(newValue.stage === "CompMatchStandard" && newValue.answer === "Related Merchant"){
          this.setState({ childAnswers:[...this.state.childAnswers,newValue], value:"ParentMerchant" });
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
        } else if(newValue.stage === "AddOnMerchant")
        {
          this.setState({ childAnswers:[...this.state.childAnswers,newValue], value:"FinishPage" });
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
      } else if(this.state.value==="SelectionPage" && this.state.WelcomePageSelection==="Launch"){
        content= this.renderSelectionPage();
      } else if(this.state.value==="MerchantType" && this.state.WelcomePageSelection==="Launch"){
        content= <QuestionAnswersTemplate 
                    question={'What type of Merchant is this ? '} 
                    answer={['Standard','3rd Party','Regional']} 
                    type={'radio'} 
                    defaultRadiovalue={0}
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
                    defaultRadiovalue={0}
                    stage="CompMatchStandard"
                    nextbuttonValue="Configure Standard Template"
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
                    defaultCheckboxValues={[0,1,2]}
                    nextbuttonValue="Proceed to GL Setup"
                    addRadioToState={this.addRadioToState.bind(this)}
                    addCheckboxToState={this.addCheckboxToState.bind(this)}
                  />;
      } else if(this.state.value==="SelectGLForMerchant" && this.state.WelcomePageSelection==="Launch"){
        content= <QuestionAnswersTemplate 
                    question={'Select the GLs for this Merchant  '} 
                    answer={['Apparel','Books','Home Decor','Vehicles','Stationary']} 
                    type={'checkbox'} 
                    defaultCheckboxValues={[0,1]}
                    stage="SelectGLForMerchant"
                    nextbuttonValue="Next"
                    addCheckboxToState={this.addCheckboxToState.bind(this)} 
                    addRadioToState={this.addRadioToState.bind(this)}
                  />;
      } else if(this.state.value==="PriceVarianceGLTable" && this.state.WelcomePageSelection==="Launch"){
        content= <GLSetTable question={'Enter the Price Variance for Selected GLs'}
                        type={'PriceVarianceGLTable'}
                        stage={'PriceVarianceGLTable'}
                        rowHeadings={['Apparel','Books','Shoes']}
                        columnHeadings={['Field1','Field2','Field3','Field4']}
                        answer={[ [1,2,3,4], 
                                  [5,6,7,8], 
                                  [9,10,11,12] ]}
                        nextbuttonValue="Submit and Proceed to Configure CP Caps"
                        addTableToState={this.addTableToState.bind(this)}
                  />;
      } else if(this.state.value==="ThresholdGLTable" && this.state.WelcomePageSelection==="Launch"){
        content= <GLSetTable question={'Enter the CP cap thresholds for Selected GLs'}
                        type={'ThresholdGLTable'}
                        stage={'ThresholdGLTable'}
                        rowHeadings={['Apparel','Books','Shoes']}
                        columnHeadings={['Field1','Field2']}
                        answer={[ [120,230], 
                                  [500,600], 
                                  [90,110] ]}
                        nextbuttonValue="Submit and Proceed to Configure Email notifications"
                        addTableToState={this.addTableToState.bind(this)}
                  />;
      }  else if(this.state.value==="MonitorGLTable" && this.state.WelcomePageSelection==="Launch"){
        content= <GLSetTable question={'Configure the demand monitors for Selected GLs'}
                        type={'MonitorGLTable'}
                        stage={'MonitorGLTable'}
                        rowHeadings={['Apparel','Books','Shoes']}
                        columnHeadings={['Email','Field2']}
                        answer={[ ['apparel@gmail.com',30], 
                                  ['books@gmail.com',60], 
                                  ['shoes@gmail.com',11] ]}
                        nextbuttonValue="Submit and Proceed to Configure add-on to enable"
                        addTableToState={this.addTableToState.bind(this)}
                  />;
      }  else if(this.state.value==="AddOnMerchant" && this.state.WelcomePageSelection==="Launch"){
        content= <QuestionAnswersTemplate 
                    question={'Select any add-ons that you would like to enable for the merchant '} 
                    answer={['Phase 2 Cede','Teen','PPU','H/B ASIN CP aware','MAP as floor','ECF as floor']} 
                    type={'checkbox'} 
                    stage="AddOnMerchant"
                    nextbuttonValue="Next"
                    addCheckboxToState={this.addCheckboxToState.bind(this)} 
                    addRadioToState={this.addRadioToState.bind(this)}
                  />;
      }  else if(this.state.value==="FinishPage" && this.state.WelcomePageSelection==="Launch"){
        content= this.renderFinishPage();
      }  else if(this.state.value==="ParentMerchant" && this.state.WelcomePageSelection==="Launch"){
        content= this.renderParentMerchant();
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
        <div>
            <div class="sidenav text-white   bg-dark" >
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

    renderFinishPage(){
      return(
          <div className="container">
            <div className="jumbotron">
                <h4 color="green">Done!</h4>
                <div className="box"></div>
                <h3 color="green">Merchant has been successfully launched.</h3>
                <hr color="green"></hr>
            </div>
          </div>
      );
    }
    renderParentMerchant(){
      return(
        <div class="container">
          <div className="sidenavwhite">
                    <div className="container">Basic Details</div> 
                    <hr color="#edf0f"></hr>
                    <div className="container blueColor" >Configure Pricing Strategy</div>
                    <hr color="#edf0f"></hr>
                    <div className="container">Setup GLs</div>
                    <hr color="#edf0f"></hr>
                    <div className="container" >Finish up!</div>
            </div>
          <div className="container">
              <h3 className="left">Select the parent merchant</h3>   
          </div>
          <select onChange={(event) => this.setState({parentMerchant:event.target.value})} class="browser-default custom-select custom-select-lg mb-3">
              <option disabled selected hidden>Select the parent merchant from this dropdown</option>
              <option value="US">US</option>
              <option value="Amazon Fresh">Amazon Fresh</option>
              <option value="Mendel">Mendel</option>
          </select>
          <button type="button" onClick={this.onParentMerchantSelection.bind(this)} class="btn btn-primary btn-lg">Proceed to GL Setup</button>
        </div>
      );
    }
    onParentMerchantSelection(){
      const {parentMerchant} = this.state;
      if(parentMerchant){
        this.setState({value:"SelectGLForMerchant"});
      }
    }  
}

export default App;
