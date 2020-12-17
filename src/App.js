import './App.css';
import React, {Component} from 'react';
import QuestionAnswersTemplate from './Components/QuestionAnswersTemplate';
import GLSetTable from './Components/GLSetTable';
import logo from './tiffany.png';
import image1 from './image1.png';
import image2 from './image2.png';
import image3 from './image3.png';
import image4 from './image4.png';

class App extends Component {
    constructor(props) {
      super(props);
      this.state={
          value:"WelcomePage",
          //value:"SimulationPage",
          WelcomePageSelection: null,
          marketplace: null,
          merchant: null,
          merchantTypeState:null,
          CompMatchStandardState:null,
          ConfigsStandardState:null,
          SelectGLForMerchantState:null,
          PriceVarianceGLTableState:null,
          ThresholdGLTableState:null,
          MonitorGLTableState:null,
          AddOnMerchantState:null,
          MMGLError:null,
          typeofMerchant:null,
          fileName:null,
          childAnswers: []
      };
    }
    addRadioToState(newValue) 
    {
        if(newValue.stage === "MerchantType" && newValue.answer === "Retail"){
          this.setState({ childAnswers:[...this.state.childAnswers,newValue], value:"CompMatchStandard" });
        } else if(newValue.stage === "CompMatchStandard" && newValue.answer === "Standard Template"){
          this.setState({ childAnswers:[...this.state.childAnswers,newValue], value:"ConfigsStandard" });
        }  else if(newValue.stage === "CompMatchStandard" && newValue.answer === "Related Merchant"){
          this.setState({ childAnswers:[...this.state.childAnswers,newValue], value:"ParentMerchant" });
        }
    }
    onPreviousRadioButton(newValue)
    {
      if(newValue.stage === "MerchantType"){
        this.setState({value:"SelectionPage",WelcomePageSelection:"Launch",merchantTypeState:null});
      } else if(newValue.stage === "CompMatchStandard"){
          var result = this.state.childAnswers.find(obj => {
            return obj.stage === "MerchantType"
          });
          this.setState({merchantTypeState:result,CompMatchStandardState:null,
                  value:"MerchantType",childAnswers:this.state.childAnswers.filter(obj=>obj.stage !== "MerchantType")});
      } else if(newValue.stage === "ConfigsStandard"){
          var result1 = this.state.childAnswers.find(obj => {
            return obj.stage === "CompMatchStandard"
          });
          this.setState({CompMatchStandardState:result1 , ConfigsStandardState:null,
                  value:"CompMatchStandard",childAnswers:this.state.childAnswers.filter(obj=>obj.stage !== "CompMatchStandard")});
      } else if(newValue.stage === "SelectGLForMerchant"){
        var prevCompMatch = this.state.childAnswers.find(obj => {
          return obj.stage === "CompMatchStandard"
        });
        if(prevCompMatch.answer === "Standard Template"){
          var result2a = this.state.childAnswers.find(obj => {
            return obj.stage === "ConfigsStandard"
          });
          this.setState({ConfigsStandardState:result2a , SelectGLForMerchantState:null,
                      value:"ConfigsStandard",childAnswers:this.state.childAnswers.filter(obj=>obj.stage !== "ConfigsStandard")});
        } else {
          this.setState({value:"ParentMerchant", SelectGLForMerchantState:null});
        }     
      } else if(newValue.stage === "AddOnMerchant"){
        var result3 = this.state.childAnswers.find(obj => {
          return obj.stage === "MonitorGLTable"
        });
        this.setState({MonitorGLTableState:result3 , AddOnMerchantState:null,
                    value:"MonitorGLTable",childAnswers:this.state.childAnswers.filter(obj=>obj.stage !== "MonitorGLTable")});
      }
    }
    addCheckboxToState(newValue)
    {
        if(newValue.stage === "ConfigsStandard")
        {
          this.setState({ childAnswers:[...this.state.childAnswers,newValue], value:"SelectGLForMerchant" });
        } else if(newValue.stage === "SelectGLForMerchant")
        {
          var compmatch=this.state.childAnswers.find(obj => {return obj.stage === "CompMatchStandard"});
          var valuetoPush="PriceVarianceGLTable";
          if(compmatch.answer === "Related Merchant"){
            valuetoPush="SummaryPage";
          }
          
          this.setState({ childAnswers:[...this.state.childAnswers,newValue], value:valuetoPush });
        } else if(newValue.stage === "AddOnMerchant")
        {
          this.setState({ childAnswers:[...this.state.childAnswers,newValue], value:"SummaryPage" });
        }
    }
    onPreviousGLTable(newValue){
      if(newValue.stage === "PriceVarianceGLTable"){
        var result = this.state.childAnswers.find(obj => {
          return obj.stage === "SelectGLForMerchant"
        });
        this.setState({ SelectGLForMerchantState:result , PriceVarianceGLTableState:null,
          value:"SelectGLForMerchant",childAnswers:this.state.childAnswers.filter(obj=>obj.stage !== "SelectGLForMerchant") });
      } else if(newValue.stage === "ThresholdGLTable"){
        var result1 = this.state.childAnswers.find(obj => {
          return obj.stage === "PriceVarianceGLTable"
        });
        this.setState({ PriceVarianceGLTableState:result1 ,ThresholdGLTableState:null,
          value:"PriceVarianceGLTable",childAnswers:this.state.childAnswers.filter(obj=>obj.stage !== "PriceVarianceGLTable") });
      } else if(newValue.stage === "MonitorGLTable"){
        var result2 = this.state.childAnswers.find(obj => {
          return obj.stage === "ThresholdGLTable"
        });
        this.setState({ ThresholdGLTableState:result2 , MonitorGLTableState:null,
          value:"ThresholdGLTable",childAnswers:this.state.childAnswers.filter(obj=>obj.stage !== "ThresholdGLTable") });
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
        const {merchantTypeState}= this.state;
        const answer=['Retail','3rd Party'];
        content= <QuestionAnswersTemplate 
                    question={'What type of Merchant is this'} 
                    answer={answer} 
                    description={['Description: Product is sold and shipped by Retail seller i.e Amazon.XX',
                                  'Description: Third party seller who list the product on Amazon marketplace']}
                    type={'radio'} 
                    defaultRadiovalue={merchantTypeState?answer.indexOf(merchantTypeState.answer):0}
                    stage="MerchantType"
                    nextbuttonValue="Next"
                    addRadioToState={this.addRadioToState.bind(this)} 
                    addCheckboxToState={this.addCheckboxToState.bind(this)}
                    onPreviousRadioButton={this.onPreviousRadioButton.bind(this)}
                  />;
      }  else if(this.state.value==="CompMatchStandard" && this.state.WelcomePageSelection==="Launch"){
        const {CompMatchStandardState}= this.state;
        const answer=['Standard Template','Related Merchant','Comp Match with related merchant as fall back'];
        content= <QuestionAnswersTemplate 
                    question={'Select the Competitor matching strategy for this Merchant'} 
                    answer={answer} 
                    description={['Description: Will recommend Min(external,internal) competitor price',
                                  'Description: Will inherit all pricing policies from parent merchant including Price',
                                  'Description: Min(external,internal) competitor price recommended as Final price, in absence of competitor will inherit from parent merchant']}
                    type={'radio'} 
                    defaultRadiovalue={CompMatchStandardState?answer.indexOf(CompMatchStandardState.answer):0}
                    stage="CompMatchStandard"
                    nextbuttonValue={CompMatchStandardState?"Configure "+CompMatchStandardState.answer:"Configure Standard Template"}
                    addRadioToState={this.addRadioToState.bind(this)} 
                    addCheckboxToState={this.addCheckboxToState.bind(this)}
                    onPreviousRadioButton={this.onPreviousRadioButton.bind(this)}
                  />;
      } else if(this.state.value==="ConfigsStandard" && this.state.WelcomePageSelection==="Launch"){
        const {ConfigsStandardState}= this.state;
        const answer=['External Comp match','Internal Comp match','FBA Cede'];
        content= <QuestionAnswersTemplate 
                    question={'Select Configs for Standard Template'} 
                    answer={answer} 
                    description={['Description: Will consume CMT recommended price as an input for price recommendation.',
                                  'Description: FMA recommended featured offer price will be used to derive price',
                                  'Description: We will match FBA Seller recommended by FMA, and cede featured offer where applicable']}
                    type={'checkbox'} 
                    stage="ConfigsStandard"
                    defaultCheckboxValues={ConfigsStandardState?ConfigsStandardState.answer.map(a=> answer.indexOf(a)):[0,1,2]}
                    nextbuttonValue="Proceed to GL Setup"
                    addRadioToState={this.addRadioToState.bind(this)}
                    addCheckboxToState={this.addCheckboxToState.bind(this)}
                    onPreviousRadioButton={this.onPreviousRadioButton.bind(this)}
                  />;
      } else if(this.state.value==="SelectGLForMerchant" && this.state.WelcomePageSelection==="Launch"){
        const{SelectGLForMerchantState}=this.state;
        const answer= ['Apparel(Softlines)','Shoes(Softlines)','Luggage(Softlines)','Books(Media)','Gifts(Media)','Tires(Hardlines)','Home Decor(Hardlines)','Ebook(Digital)',
            'Amazon_Pantry(Consumables)'];
        content= <QuestionAnswersTemplate 
                    question={'Select the GLs for this Merchant'} 
                    answer={answer} 
                    type={'checkbox'} 
                    defaultCheckboxValues={SelectGLForMerchantState?SelectGLForMerchantState.answer.map(a=>answer.indexOf(a)):[0,1]}
                    stage="SelectGLForMerchant"
                    nextbuttonValue="Next"
                    addCheckboxToState={this.addCheckboxToState.bind(this)} 
                    addRadioToState={this.addRadioToState.bind(this)}
                    onPreviousRadioButton={this.onPreviousRadioButton.bind(this)}
                  />;
      } else if(this.state.value==="PriceVarianceGLTable" && this.state.WelcomePageSelection==="Launch"){
        const{PriceVarianceGLTableState}=this.state;
        const answer= [ ["10.17","20%","3.00","4%"], 
                        ["50.34","6%","70.98","8%"], 
                        ["9.09","10%","11.00","12%"] ];
        content= <GLSetTable question={'Enter the Price Variance for Selected GLs'}
                        type={'PriceVarianceGLTable'}
                        stage={'PriceVarianceGLTable'}
                        rowHeadings={['Apparel','Shoes','Books']}
                        columnHeadings={['increase by $,','increase by %','decrease by $','decrease by %']}
                        answer={PriceVarianceGLTableState? PriceVarianceGLTableState.answer: answer}
                        nextbuttonValue="Submit and Proceed to Configure CP Caps"
                        addTableToState={this.addTableToState.bind(this)}
                        onPreviousGLTable={this.onPreviousGLTable.bind(this)}
                  />;
      } else if(this.state.value==="ThresholdGLTable" && this.state.WelcomePageSelection==="Launch"){
        const{ThresholdGLTableState}=this.state;
        const answer= [ ["120.10","89%"], 
                        ["500.90","65%"], 
                        ["91.12","75%"] ];
        content= <GLSetTable question={'Enter the CP cap thresholds for Selected GLs'}
                        type={'ThresholdGLTable'}
                        stage={'ThresholdGLTable'}
                        rowHeadings={['Apparel','Shoes','Books']}
                        columnHeadings={['Margin in $','Margin in %']}
                        answer={ThresholdGLTableState?ThresholdGLTableState.answer:answer}
                        nextbuttonValue="Submit and Proceed to Configure Email notifications"
                        addTableToState={this.addTableToState.bind(this)}
                        onPreviousGLTable={this.onPreviousGLTable.bind(this)}
                  />;
      }  else if(this.state.value==="MonitorGLTable" && this.state.WelcomePageSelection==="Launch"){
        const{MonitorGLTableState}=this.state;
        const answer = [ ['apparel-spike@amazon.com','apparel@amazon.com'], 
                         ['books-spike@amazon.com','books@amazon.com'], 
                         ['shoes-spike@amazon.com','shoes@amazon.com'] ];
        content= <GLSetTable question={'Configure the demand monitors for Selected GLs'}
                        type={'MonitorGLTable'}
                        stage={'MonitorGLTable'}
                        rowHeadings={['Apparel','Books','Shoes']}
                        columnHeadings={['Spike','Kill']}
                        answer={MonitorGLTableState?MonitorGLTableState.answer:answer}
                        nextbuttonValue="Submit and Proceed to enable add-ons"
                        addTableToState={this.addTableToState.bind(this)}
                        onPreviousGLTable={this.onPreviousGLTable.bind(this)}
                  />;
      }  else if(this.state.value==="AddOnMerchant" && this.state.WelcomePageSelection==="Launch"){
        const{AddOnMerchantState}=this.state;
        const answer = ['Match External Competitor while losing featured offer','Teen','PPU','H/B ASIN CP aware','MAP as floor','ECF as floor']
        content= <QuestionAnswersTemplate 
                    question={'Select any add-ons that you would like to enable for the merchant'} 
                    answer={answer} 
                    type={'checkbox'} 
                    stage="AddOnMerchant"
                    defaultCheckboxValues={AddOnMerchantState?AddOnMerchantState.answer.map(a=> answer.indexOf(a)):[]}
                    nextbuttonValue="Next"
                    addCheckboxToState={this.addCheckboxToState.bind(this)} 
                    addRadioToState={this.addRadioToState.bind(this)}
                    onPreviousRadioButton={this.onPreviousRadioButton.bind(this)}
                    onPreviousGLTable={this.onPreviousGLTable.bind(this)}
                  />;
      } else if(this.state.value==="SummaryPage"){
        content= this.renderSummaryPage();
      } else if(this.state.value==="SimulationPage"){
        content= this.renderSimulationPage();
      } else if(this.state.value==="FinishPage"){
        content= this.renderFinishPage();
      }  else if(this.state.value==="ParentMerchant" && this.state.WelcomePageSelection==="Launch"){
        content= this.renderParentMerchant();
      }              
      //end of above if 
      return (
            <div className="App">
              
              {this.renderAppTitle()}
              <div className="box"></div>
              {content}
            </div>
        
      );
    }
    renderAppTitle(){
      return(
        <div>
          <div className=" title-margin">
                <nav class="navbar navbar-expand-lg navbar-dark amazonColorDark">
                    <div class="container-fluid">
                      
                      <button class="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                      </button>
                      
                        
                      <div class="image-style nav-move-left">
                              <a href="/"><img src={logo}></img></a>
                      </div>
                      <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                          <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">Home</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link active"  href="https://stackoverflow.com/">About</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link active" href="https://www.youtube.com/">CTI</a>
                          </li>
                        </ul>
                        <form class="d-flex fright">
                          <input class="form-control me-2 btn-txt" type="search" placeholder="Search" aria-label="Search"/>
                          
                          <button class="btn btn-outline-success btn-search" type="submit">Search</button>
                        </form>
                      </div>
                    </div>
                  </nav>
            </div>      
            <div className="container">
                <div class="boxreduce"></div>
                <div class="image-style-2 nav-move-left">
                              <a href="/"><img src={image4}></img></a>
                </div>
            </div>
        </div>
        
      );
    }

    renderLogo()
    {
      return(
          <div class="topleft">Top Left</div>
      )
    }
    renderWelcomePage(){
      return(
          <div class="container">
            <div class="row">
              <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-md-offset-1 boxStyle bg-white amazonBorderColorDark main-page-row">
                <div class="image-style-1 nav-move-left">
                              <a href="/"><img src={image1}></img></a>
                </div>
                <div className="jumbotron bg-white">
                    <button type="button" onClick={() => this.setState({WelcomePageSelection: "Launch",value:"SelectionPage"})} class="btn btn-primary btn-lg btn-1">Launch</button>
                    <p>Tiffany, your personal assistant will guide you to launch marketplaces, merchants, product groups and more.</p>
                </div>
              </div>
            <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 boxStyle bg-white amazonBorderColorDark main-page-row">
              <div class="image-style-1 nav-move-left">
                              <a href="/"><img src={image2}></img></a>
                </div>
              <div className="jumbotron bg-white">
                  <button type="button"  onClick={() => this.setState({WelcomePageSelection: "Manage",value:"SelectionPage"})} class="btn btn-primary btn-lg btn-1">Manage policies</button>
                  <p>Want to change the pricing strategy or modify guardrails at an hierarchy level? Let Tiffany help you to add, remove or update policies.</p>
              </div>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 boxStyle bg-white amazonBorderColorDark main-page-row">
              <div class="image-style-1 nav-move-left">
                              <a href="/"><img src={image3}></img></a>
                </div>
              <div className="jumbotron bg-white">
                   <button type="button" onClick={() => this.setState({WelcomePageSelection: "Simulate",value:"SelectionPage"})} class="btn btn-primary btn-lg btn-1">Config Playground</button>
                  <p>Recently launched an entity or updated the policy at an hierarchy level? Let Tiffany guide you through our simulation platform-Fortnight.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    renderSelectionPage(){
      return(
        <div>
            <div class="sidenav text-white cs-card-txt" >
              <div class="card-header cs-card-txt" >Hola Garvit</div>
              <div class="card-body cs-card-txt">
                <h5 class="card-title">I'm Tiffany</h5>
                <p class="card-text">I will be guiding you to launch a new entity or a GL into Retail Pricing. You don't need to understand many config keys.</p>
              </div>
            </div>
            
            <div className="container">
              
              <h3 className="left" >What  would you like to Launch</h3>
              
             <select onChange={(event) => this.setState({marketplace:event.target.value})} class="browser-default custom-select custom-select-lg mb-3">
                  <option disabled selected={this.state.marketplace?false:true} hidden>Select Marketplace</option>
                  <option value="US" selected={this.state.marketplace === "US" ?true:false }>US</option>
                  <option value="Amazon Fresh" selected={this.state.marketplace === "Amazon Fresh" ?true:false }>Amazon Fresh</option>
                  <option value="6PM" selected={this.state.marketplace === "6PM" ?true:false }>6PM</option>
                  <option value="Mendel" selected={this.state.marketplace === "Mendel" ?true:false }>Mendel</option>
                  <option value="MX" selected={this.state.marketplace === "MX" ?true:false }>MX</option>
                  <option value="Panda01" selected={this.state.marketplace === "Panda01" ?true:false }>Panda01</option>
                  <option value="QuaterDeck" selected={this.state.marketplace === "QuaterDeck" ?true:false }>QuaterDeck</option>
                  <option value="PrimeNow Miami" selected={this.state.marketplace === "PrimeNow Miami" ?true:false }>PrimeNow Miami</option>
                  <option value="SmallParts" selected={this.state.marketplace === "SmallParts" ?true:false }>SmallParts</option>
                  <option value="Zappos" selected={this.state.marketplace === "Zappos" ?true:false }>Zappos</option>
                  <option value="ZapposCouture" selected={this.state.marketplace === "ZapposCouture" ?true:false }>ZapposCouture</option>
              </select>
              <select onChange={(event) => this.setState({merchant:event.target.value})} class="browser-default custom-select custom-select-lg mb-3">
                  <option disabled selected={this.state.merchant?false:true} hidden>Select Merchant</option>
                  <option value="Amazon Fresh" selected={this.state.merchant === "Amazon Fresh" ?true:false }>Amazon Fresh</option>
                  <option value="Instant-NYU" selected={this.state.merchant === "Instant-NYU" ?true:false }>Instant-NYU</option>
                  <option value="Amazon GO" selected={this.state.merchant === "Amazon GO" ?true:false }>Amazon GO</option>
                  <option value="Instant-NCState" selected={this.state.merchant === "Instant-NCState" ?true:false }>Instant-NCState</option>
                  <option value="Amazon Appstore" selected={this.state.merchant === "Amazon Appstore" ?true:false }>Amazon Appstore</option>
                  <option value="Amazon Lite" selected={this.state.merchant === "Amazon Lite" ?true:false }>Amazon Lite</option>
                  <option value="Amazon B2B" selected={this.state.merchant === "Amazon B2B" ?true:false }>Amazon B2B</option>
                  <option value="Zappos Retail" selected={this.state.merchant === "Zappos Retail" ?true:false }>Zappos Retail</option>
                  <option value="Amazon Digital" selected={this.state.merchant === "Amazon Digital" ?true:false }>Amazon Digital</option>
              </select>
              <select  class="browser-default custom-select custom-select-lg mb-3">
                  <option disabled selected hidden>Select Lister</option>
              </select>
              <button type="button" onClick={(e)=>this.setState({value:"WelcomePage",marketplace:null,merchant:null})} class="btn btn-primary btn-lg left amazonColorDark" >Previous</button>
              <button type="button" onClick={this.onSelection.bind(this)} class="btn btn-primary btn-lg right amazonColorDark" >Next</button>
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
            <div className="jumbotron amazonColorWheat">
                <h4 color="green">Done!</h4>
                <div className="box"></div>
                <h3 color="green">Workflow has been initiated to lauch the merchant.</h3>
                <hr color="green"></hr>
            </div>
          </div>
      );
    }
    renderParentMerchant(){
      return(
        <div class="container">
          <div className="sidenavwhite amazonColorDark amazonText">
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
              <option disabled selected={this.state.parentMerchant?false:true} hidden>Select the parent merchant from this dropdown</option>
              <option value="AmazonWirelessUS" selected={this.state.parentMerchant === "AmazonWirelessUS" ?true:false }>AmazonWirelessUS</option>
              <option value="AmazonFresh LLC" selected={this.state.parentMerchant === "AmazonFresh LLC" ?true:false }>AmazonFresh LLC</option>
              <option value="AmazonFresh Seattle" selected={this.state.parentMerchant === "AmazonFresh Seattle" ?true:false }>AmazonFresh Seattle</option>
              <option value="Instant Pickup Berkley" selected={this.state.parentMerchant === "Instant Pickup Berkley" ?true:false }>Instant Pickup Berkley</option>
              <option value="Mendel01" selected={this.state.parentMerchant === "Mendel01" ?true:false }>Mendel01</option>
              <option value="Product Compliance Mendel" selected={this.state.parentMerchant === "Product Compliance Mendel" ?true:false }>Product Compliance Mendel</option>
              <option value="Mendel02" selected={this.state.parentMerchant === "Mendel02" ?true:false }>Mendel02</option>
              <option value="Zappos Retail Inc" selected={this.state.parentMerchant === "Zappos Retail Inc" ?true:false }>Zappos Retail Inc</option>
              <option value="Author Services" selected={this.state.parentMerchant === "Author Services" ?true:false }>Author Services</option>
              <option value="ZConsignment" selected={this.state.parentMerchant === "ZConsignment" ?true:false }>ZConsignment</option>
          </select>
          <button type="button" onClick={(e)=>this.setState({value:"CompMatchStandard",parentMerchant:null,
          CompMatchStandardState:this.state.childAnswers.find(obj => {return obj.stage === "CompMatchStandard"}),
          childAnswers:this.state.childAnswers.filter(obj=>obj.stage !== "CompMatchStandard") })} 
                          class="btn btn-primary btn-lg left amazonColorDark" >Previous</button>
          <button type="button" onClick={this.onParentMerchantSelection.bind(this)} class="btn btn-primary btn-lg right amazonColorDark">Proceed to GL Setup</button>
        </div>
      );
    }
    onParentMerchantSelection(){
      const {parentMerchant} = this.state;
      if(parentMerchant){
        this.setState({value:"SelectGLForMerchant"});
      }
    }  

    renderSummaryPage(){
      var compmatch=this.state.childAnswers.find(obj => {return obj.stage === "CompMatchStandard"});
      var merchanttype=this.state.childAnswers.find(obj => {return obj.stage === "MerchantType"});
      var gls=this.state.childAnswers.find(obj => {return obj.stage === "SelectGLForMerchant"});
      if(compmatch.answer === "Standard Template"){
        var configs=this.state.childAnswers.find(obj => {return obj.stage === "ConfigsStandard"});
        var addon=this.state.childAnswers.find(obj => {return obj.stage === "AddOnMerchant"});
        return(
          <div class="container">
            <div class="sidenav text-white   cs-card-txt" >
              <div class="card-header cs-card-txt">Hola Garvit</div>
              <div class="card-body cs-card-txt">
                <button type="button" class="btn btn-outline-success btn-search btn-bgclr" >Download</button>
                <p class="card-text"> Summary of your Selection.</p>
              </div>
            </div>
            <div className="container">
                <h3 className="left">Here's the Summary of Merchant Lauch</h3>   
            </div>
            <br/>
            <div class="table-responsive">
                      <table class="table table-hover">
                        <thead>
                          <tr> <th>Key</th>  <th>Value</th></tr>
                        </thead>
                        <tbody> 
                          <tr> <td>Marketplace</td> <td>{this.state.marketplace}</td> </tr>
                          <tr> <td>Merchant</td> <td>{this.state.merchant}</td> </tr>
                          <tr> <td>Merchant Type</td> <td>{merchanttype.answer}</td> </tr>
                          <tr> <td>Compmatch Strategy</td> <td>{compmatch.answer}</td> </tr>
                          <tr> <td>Configs of Standard Template</td> <td>{"["+configs.answer.toString()+"]"}</td> </tr>
                          <tr> <td>GL selecteds</td> <td>{"["+gls.answer.toString()+"]"}</td> </tr>
                          <tr> <td>Add-On's</td> <td>{"["+addon.answer.toString()+"]"}</td> </tr>
                        </tbody>
                      </table>
            </div>

            <button type="button" onClick={this.onSummaryPagePrevious.bind(this)} class="btn btn-primary btn-lg left amazonColorDark" >Previous</button>
            <input type="text" class="form-control right" placeholder="Save File name" aria-label="Username" style={{width:300}} 
                onChange={(event) => { this.setState({fileName: event.target.value})}}/>  <br/><br/>
            <button type="button" onClick={this.onSummaryPageSelection.bind(this)} class="btn btn-primary btn-lg right amazonColorDark">Go to Config PlayGround</button>
          </div>
        );
      } else {
        return(
          <div class="container">
           <div class="sidenav text-white cs-card-txt" >
              <div class="card-header cs-card-txt">Hola Garvit</div>
              <div class="card-body cs-card-txt">
                <button type="button" class="btn btn-outline-success btn-search btn-bgclr" >Download</button>
                <p class="card-text"> Summary of your Selection.</p>
              </div>
            </div>
            <div className="container">
                <h3 className="left">Summary </h3>   
            </div>
            <br/>
            <div class="table-responsive">
                      <table class="table table-hover">
                        <thead>
                          <tr> <th>Key</th>  <th>Value</th></tr>
                        </thead>
                        <tbody> 
                          <tr> <td>Marketplace</td> <td>{this.state.marketplace}</td> </tr>
                          <tr> <td>Merchant</td> <td>{this.state.merchant}</td> </tr>
                          <tr> <td>Merchant Type</td> <td>{merchanttype.answer}</td> </tr>
                          <tr> <td>Compmatch Strategy</td> <td>{compmatch.answer}</td> </tr>
                          <tr> <td>Parent Merchant</td> <td>{this.state.parentMerchant}</td> </tr>
                          <tr> <td>GL selecteds</td> <td>{"["+gls.answer.toString()+"]"}</td> </tr>
                        </tbody>
                      </table>
            </div>

            <button type="button" onClick={this.onSummaryPagePrevious.bind(this)} class="btn btn-primary btn-lg left amazonColorDark" >Previous</button>
            <input type="text" class="form-control right" placeholder="Save File name" aria-label="Username" style={{width:300}} 
                onChange={(event) => { this.setState({fileName: event.target.value})}}/>  <br/><br/>
            <button type="button" onClick={this.onSummaryPageSelection.bind(this)} class="btn btn-primary btn-lg right amazonColorDark">Go to Config PlayGround</button>
          </div>
        );
      }
      
    }
    onSummaryPagePrevious(){
      var compmatch=this.state.childAnswers.find(obj => {return obj.stage === "CompMatchStandard"});
      if(compmatch.answer === "Related Merchant"){
        var result = this.state.childAnswers.find(obj => {
          return obj.stage === "SelectGLForMerchant"
        });
        this.setState({ SelectGLForMerchantState:result ,
          value:"SelectGLForMerchant",childAnswers:this.state.childAnswers.filter(obj=>obj.stage !== "SelectGLForMerchant") });
      } else {
        var result1 = this.state.childAnswers.find(obj => {
          return obj.stage === "AddOnMerchant"
        });
        this.setState({ AddOnMerchantState:result1 ,
          value:"AddOnMerchant",childAnswers:this.state.childAnswers.filter(obj=>obj.stage !== "AddOnMerchant") }); 
      }   
    }
    onSummaryPageSelection(){
        this.setState({value:"SimulationPage"});
    }  

    renderSimulationPage(){
      return(
        <div className="container">
                <hr color="#edf0f"></hr>
                <div className="container" >
                    <h3 className="left">Config PlayGround</h3> 
                </div>
                <br/>
                <hr color="#edf0f"></hr>
                <h3 class="left"> Select the saved config's to play around</h3>
                <br/><br/>
                <div className="container">
                    <div class="custom-control custom-radio left" >
                        <input type="radio" class="custom-control-input" id="1" value="1" name="Radios"/>
                        <label class="custom-control-label" for="1">Mendel</label>
                     </div>    
                     <br/>
                     <div class="custom-control custom-radio left"  >
                        <input type="radio" class="custom-control-input" id="2"value="2" name="Radios"/>
                        <label class="custom-control-label" for="2">Go</label>
                     </div> 
                     <br/>
                     <div class="custom-control custom-radio left"  >
                        <input type="radio" class="custom-control-input" id="3" value="3" name="Radios" />
                        <label class="custom-control-label" for="3">{this.state.fileName?this.state.fileName:"NewMerchant"}</label>
                     </div> 
                </div>
                <div className="boxwell"></div>
                <br/>
                <textarea placeholder="Enter the list of ASIN's" class="form-control left" style={{width:385,height:300}}></textarea>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <button type="button"  class="btn btn-primary btn-lg left amazonColorDark" >Download the Config PlayGround Report</button>  
                <button type="button"  onClick={this.onSimulationPageComplete.bind(this)} class="btn btn-primary btn-lg right amazonColorDark" >Complete</button>
        </div>
      );
    }
    onSimulationPageComplete(){
      this.setState({value:"FinishPage"});
    }  

}

export default App;
