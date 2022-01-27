import React from 'react';
import './SideBarInvoice.css';
import FieldTextComponent from '../field-text/FieldText.component';
import FieldDatetimepickerComponent, { CurrentStateDateModel } from '../field-datetimepicker/FieldDatetimepicker.component';
import FieldSelectComponent from '../field-select/FieldSelect.component';
import ButtonSixComponent from '../button-six/ButtonSix.component';
import { ItemListDataSourceModel, CreateInvoiceInputsModel } from './SideBarInvoice.model';
import ButtonTwoComponent from '../button-two/ButtonTwo.component';
import ButtonThreeComponent from '../button-three/ButtonThree.component';
import { 
    DEFAULT_CREATE_INVOICE_DATA, 
    ALL_FIELDS_REQUIRED,
    SUCCESS_CREATE_INVOICE
} from './SideBarInvoice.constant';
import ApiService from '../../services/Api.service';
import { AUTHENTICATION_TYPE } from '../../utils/constants/http.constant';

function SideBarInvoiceComponent(props: any) {

    const [inputs, setInputs] = React.useState<CreateInvoiceInputsModel>(DEFAULT_CREATE_INVOICE_DATA);

    function inputsChanged(key: string, value: string) {
        let object: any = {};
        object[key] = value;
        setInputs({...inputs, ...object});
    }
    
    function inputsChangedDate(key: string, value: CurrentStateDateModel) {
        let object: any = {};
        object[key] = value;
        setInputs({...inputs, ...object});
    }

    function mergeInputsWithAddItemInputs(key: string) {

        let total = 0;
        for(let item of props.addItemsData) {
            total = total + parseInt(item.total);
        }

        const payload = {...inputs, addItems: props.addItemsData, status: key, total: total.toString()};
        submitInvoiceDataToAPI(payload);
    }

    async function submitInvoiceDataToAPI(payload: CreateInvoiceInputsModel){
        if(!validateAllInput()) { alert(ALL_FIELDS_REQUIRED); return; }
        try {
            const response = await new ApiService().post('/create-invoice', AUTHENTICATION_TYPE.BASIC, payload);
            const json = response.json(); //do anything with success json response
            props.setInvoiceMenuOpen(false);
            props.saveCreatedInvoiceToMainView(payload);
            alert(SUCCESS_CREATE_INVOICE); //can use toast or styling modal for better experiences
        } catch(e) {
            console.log(e);
            //do anything if error
        }
    }

    function validateAllInput() {
        for(const [key, value] of Object.entries(inputs)) {
            if(value === '' || value === 0) {
                console.log(key);
                return false;
            }
        }
        return true;
    }

    function submit(key: string) {
        mergeInputsWithAddItemInputs(key);
    }

    function discard() {
        props?.setInvoiceMenuOpen(false);
    }

    return(
        <div>
            <div className="side-bar-invoice-container">
                    <h3>New Invoice</h3>
                    <p>Bill From</p>
                    <div className='full-field-custom-container'><FieldTextComponent onChange={(e: any) => inputsChanged('billFromStreetAddress', e.target.value)} /></div>
                    <div className='city-postcode-country'>
                        <div className='three-field-custom-container'><FieldTextComponent label="City" onChange={(e: any) => inputsChanged('billFromCity', e.target.value)} /></div>
                        <div className='three-field-custom-container'><FieldTextComponent label="Post Code" onChange={(e: any) => inputsChanged('billFromPostcode', e.target.value)} /></div>
                        <div className='three-field-custom-container'><FieldTextComponent label="Country" onChange={(e: any) => inputsChanged('billFromCountry', e.target.value)} /></div>
                    </div>
                    <br />
                    <p>Bill To</p>
                    <div className='full-field-custom-container'><FieldTextComponent label="Client's Name" onChange={(e: any) => inputsChanged('billToClientName', e.target.value)} /></div>
                    <div className='full-field-custom-container'><FieldTextComponent label="Client's Email" onChange={(e: any) => inputsChanged('billToClientEmail', e.target.value)} /></div>
                    <div className='full-field-custom-container'><FieldTextComponent onChange={(e: any) => inputsChanged('billToStreetAddress', e.target.value)} /></div>
                    <div className='city-postcode-country'>
                        <div className='three-field-custom-container'><FieldTextComponent label="City" onChange={(e: any) => inputsChanged('billToCity', e.target.value)} /></div>
                        <div className='three-field-custom-container'><FieldTextComponent label="Post Code" onChange={(e: any) => inputsChanged('billToPostcode', e.target.value)} /></div>
                        <div className='three-field-custom-container'><FieldTextComponent label="Country" onChange={(e: any) => inputsChanged('billToCountry', e.target.value)} /></div>
                    </div>
                    <div className='invoicedate-paymentterms'>
                    <div className='two-field-custom-container'><FieldDatetimepickerComponent label="Invoice Date" onChange={(value: CurrentStateDateModel) => inputsChangedDate('invoiceDate', value)} /></div>
                    <div className='two-field-custom-container'><FieldSelectComponent onChange={(value: string) => inputsChanged('paymentTerms', value)} /></div>   
                    </div>
                    <div className='full-field-custom-container'><FieldTextComponent label="Project's Description" onChange={(e: any) => inputsChanged('projectDesc', e.target.value)} /></div>
                    <br />
                    <h3>Item List</h3>
                    
                    <table>
                        <tr>
                            <th>Item Name</th>
                            <th>Qty.</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                        {
                            props.addItemsData.map((item: ItemListDataSourceModel) => (
                                <tr>
                                    <td>{item.itemName}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td>{item.total}</td>
                                </tr>
                            ))
                        }
                    </table>
                    <div className='add-new-item-btn'><ButtonSixComponent onClick={() => props?.setAddItemModalOpen(true)} /></div>
                    <div className='free-space'></div>
            </div>

            <div className='buttons-bottom'>
                <ButtonThreeComponent label="Discard" onClick={discard} />
                <div className='buttons-bottom-two'>
                    <ButtonThreeComponent onClick={() => submit('Draft')} label="Save as Draft " />
                    <div style={{width: 20}}></div>
                    <ButtonTwoComponent onClick={() => submit('Pending')} label="Save & Send" />
                </div>
            </div>
        </div>

        
    );
}

export default SideBarInvoiceComponent;