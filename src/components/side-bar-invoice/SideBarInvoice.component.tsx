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
    SUCCESS_CREATE_INVOICE,
    SUCCESS_DRAFT_INVOICE,
    SUCCESS_UPDATE_INVOICE
} from './SideBarInvoice.constant';
import ApiService from '../../services/Api.service';
import { AUTHENTICATION_TYPE } from '../../utils/constants/http.constant';
import { isDarkThemeWithExtraClass } from '../../utils/helper/theme.helper';

function SideBarInvoiceComponent(props: any) {

    const isDarkTheme = props.isDarkTheme;

    function inputsChanged(key: string, value: string) {
        let object: any = {};
        object[key] = value;
        props.setInputs({...props.inputs, ...object});
    }
    
    function inputsChangedDate(key: string, value: CurrentStateDateModel) {
        let object: any = {};
        object[key] = value;
        props.setInputs({...props.inputs, ...object});
    }

    function mergeInputsWithAddItemInputs(key: string) {

        const day = props.inputs.invoiceDate.day;
        const month = props.inputs.invoiceDate.month;
        const year = props.inputs.invoiceDate.year;
        const paymentDueDateObject = new Date(year, month, day);
        paymentDueDateObject.setDate(paymentDueDateObject.getDate() + parseInt(props.inputs.paymentTerms));   
        paymentDueDateObject.toLocaleDateString('en-MY');  
        const paymentDueDay = paymentDueDateObject.getDate();
        const paymentDueMonth = paymentDueDateObject.getMonth();
        const paymentDueYear = paymentDueDateObject.getFullYear();
        const paymentDue = { 
            day: paymentDueDay, 
            month: paymentDueMonth,
            year: paymentDueYear
        };

        let total = 0;

        for(let item of props.addItemsData) {
            total = total + parseInt(item.total);
        }

        const payload = {...props.inputs, addItems: props.addItemsData, paymentDue, status: key, total: total.toString()};
        if(key === 'Draft') {
            submitAsDraft(payload);
            return;
        }
        submitInvoiceDataToAPI(payload);
    }

    function submitAsDraft(payload: any) {
        alert(SUCCESS_DRAFT_INVOICE); 
        props.setInvoiceMenuOpen(false);
        if(props.inputs.status === 'none') {
            props.saveCreatedInvoiceToMainView(payload);
        } else {
            const newDataSource = props.dataSourceInvoices.map((item: any) => {
                if(item.id === payload.id) {
                    return payload;
                }
                return item;
            })
            props.setDataSourceInvoices(newDataSource);
            refreshTheModalInvoiceViewContent(payload);
        }
    }

    async function submitInvoiceDataToAPI(payload: CreateInvoiceInputsModel){
        if(!validateAllInput()) { alert(ALL_FIELDS_REQUIRED); return; }
        try {
            const response = await new ApiService().post('/create-invoice', AUTHENTICATION_TYPE.BASIC, payload);
            const json = response.json(); //do anything with success json response
            props.setInvoiceMenuOpen(false);
            if(props.inputs.status === 'none') {
                props.saveCreatedInvoiceToMainView(payload);
                alert(SUCCESS_CREATE_INVOICE); //can use toast or styling modal for better experiences
            } else {
                const newDataSource = props.dataSourceInvoices.map((item: any) => {
                    if(item.id === payload.id) {
                        return payload;
                    }
                    return item;
                })
                props.setDataSourceInvoices(newDataSource);
                refreshTheModalInvoiceViewContent(payload);
                props.setInputs(DEFAULT_CREATE_INVOICE_DATA);
                alert(SUCCESS_UPDATE_INVOICE); //can use toast or styling modal for better experiences
            }
        } catch(e) {
            console.log(e);
            //do anything if error
        }
    }

    function refreshTheModalInvoiceViewContent(payload: any) {
        props.setInvoiceDetailView(payload);
    }

    function validateAllInput() {
        for(const [key, value] of Object.entries(props.inputs)) {
            if(value === '' || value === 0) {
                return false;
            }
        }
        return true;
    }

    function submit(key: string) {
        mergeInputsWithAddItemInputs(key);
    }

    function discard() {
        props.setInputs(DEFAULT_CREATE_INVOICE_DATA);
        props.setInvoiceMenuOpen(false);
    }

    return(
        <div>
            <div className={isDarkThemeWithExtraClass(isDarkTheme, ["side-bar-invoice-container"])}>
                    <h3>New Invoice</h3>
                    <p>Bill From</p>
                    <div className='full-field-custom-container'><FieldTextComponent isDarkTheme={isDarkTheme} onChange={(e: any) => inputsChanged('billFromStreetAddress', e.target.value)} value={props.inputs.billFromStreetAddress} /></div>
                    <div className='city-postcode-country'>
                        <div className='three-field-custom-container'><FieldTextComponent isDarkTheme={isDarkTheme} label="City" onChange={(e: any) => inputsChanged('billFromCity', e.target.value)} value={props.inputs.billFromCity} /></div>
                        <div className='three-field-custom-container'><FieldTextComponent isDarkTheme={isDarkTheme} label="Post Code" onChange={(e: any) => inputsChanged('billFromPostcode', e.target.value)} value={props.inputs.billFromPostcode} /></div>
                        <div className='three-field-custom-container'><FieldTextComponent isDarkTheme={isDarkTheme} label="Country" onChange={(e: any) => inputsChanged('billFromCountry', e.target.value)} value={props.inputs.billFromCountry}  /></div>
                    </div>
                    <br />
                    <p>Bill To</p>
                    <div className='full-field-custom-container'><FieldTextComponent isDarkTheme={isDarkTheme} label="Client's Name" onChange={(e: any) => inputsChanged('billToClientName', e.target.value)} value={props.inputs.billToClientName}  /></div>
                    <div className='full-field-custom-container'><FieldTextComponent isDarkTheme={isDarkTheme} label="Client's Email" onChange={(e: any) => inputsChanged('billToClientEmail', e.target.value)} value={props.inputs.billToClientEmail}  /></div>
                    <div className='full-field-custom-container'><FieldTextComponent isDarkTheme={isDarkTheme} onChange={(e: any) => inputsChanged('billToStreetAddress', e.target.value)} value={props.inputs.billToStreetAddress} /></div>
                    <div className='city-postcode-country'>
                        <div className='three-field-custom-container'><FieldTextComponent isDarkTheme={isDarkTheme} label="City" onChange={(e: any) => inputsChanged('billToCity', e.target.value)} value={props.inputs.billToCity} /></div>
                        <div className='three-field-custom-container'><FieldTextComponent isDarkTheme={isDarkTheme} label="Post Code" onChange={(e: any) => inputsChanged('billToPostcode', e.target.value)} value={props.inputs.billToPostcode}  /></div>
                        <div className='three-field-custom-container'><FieldTextComponent isDarkTheme={isDarkTheme} label="Country" onChange={(e: any) => inputsChanged('billToCountry', e.target.value)} value={props.inputs.billToCountry} /></div>
                    </div>
                    <div className='invoicedate-paymentterms'>
                    <div className='two-field-custom-container'><FieldDatetimepickerComponent isDarkTheme={isDarkTheme} label="Invoice Date" onChange={(value: CurrentStateDateModel) => inputsChangedDate('invoiceDate', value)} value={props.inputs.invoiceDate} /></div>
                    <div className='two-field-custom-container'><FieldSelectComponent isDarkTheme={isDarkTheme} onChange={(value: string) => inputsChanged('paymentTerms', value)} value={props.inputs.paymentTerms} /></div>   
                    </div>
                    <div className='full-field-custom-container'><FieldTextComponent isDarkTheme={isDarkTheme} label="Project's Description" onChange={(e: any) => inputsChanged('projectDesc', e.target.value)} value={props.inputs.projectDesc} /></div>
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
                    <div className='add-new-item-btn'><ButtonSixComponent isDarkTheme={isDarkTheme} onClick={() => props?.setAddItemModalOpen(true)} /></div>
                    <div className='free-space'></div>
            </div>

            <div className={isDarkThemeWithExtraClass(isDarkTheme, ['buttons-bottom'])}>
                <ButtonThreeComponent isDarkTheme={isDarkTheme} label="Discard" onClick={discard} />
                <div className='buttons-bottom-two'>
                    <ButtonThreeComponent isDarkTheme={isDarkTheme} onClick={() => submit('Draft')} label="Save as Draft " />
                    <div style={{width: 20}}></div>
                    <ButtonTwoComponent isDarkTheme={isDarkTheme} onClick={() => submit('Pending')} label="Save & Send" />
                </div>
            </div>
        </div>

        
    );
}

export default SideBarInvoiceComponent;