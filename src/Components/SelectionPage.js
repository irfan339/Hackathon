import React, {Component} from 'react';
import {  loadMarketplace, loadMerchant, loadGl} from '../redux/MMGL/mmglAction';
import {connect} from 'react-redux';

class SelectionPage extends Component{
    constructor(props) {
        super(props);
    }


    render(){
        const {loadMarketplace}=this.props;
        console.log(this.props);
        return(
            <div class="container">
               <select class="browser-default custom-select custom-select-lg mb-3">
                    <option disabled selected hidden>Select Marketplace</option>
                    <option value="1">US</option>
                    <option value="2">Amazon Fresh</option>
                    <option value="3">Mendel</option>
                </select>
                <select  class="browser-default custom-select custom-select-lg mb-3">
                    <option disabled selected hidden>Select Merchant</option>
                    <option value="1">Amazon Fresh</option>
                    <option value="2">Amazon Lite</option>
                    <option value="3">Amazon GO</option>
                </select>
                <select  class="browser-default custom-select custom-select-lg mb-3">
                    <option disabled selected hidden>Select Product Group</option>
                    <option value="1">Apparel</option>
                    <option value="2">Furniture</option>
                    <option value="3">Grocery</option>
                </select>
                <button type="button" class="btn btn-primary btn-lg" onClick={loadMarketplace("okkk")}>Check</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({MarketplaceMerchantGL: state.MarketplaceMerchantGL});
const mapDispatchToProps =  {  
        loadMarketplace,
        loadMerchant,
        loadGl
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectionPage);