import './SideBarInvoice.css';
import FieldTextComponent from '../field-text/FieldText.component';
import FieldDatetimepickerComponent from '../field-datetimepicker/FieldDatetimepicker.component';
import FieldSelectComponent from '../field-select/FieldSelect.component';
import ButtonSixComponent from '../button-six/ButtonSix.component';

function SideBarInvoiceComponent() {
    return(
        <div className="side-bar-invoice-container">
            <h3>New Invoice</h3>
            <p>Bill From</p>
            <div className='full-field-custom-container'><FieldTextComponent /></div>
            <div className='city-postcode-country'>
                <div className='three-field-custom-container'><FieldTextComponent label="City" /></div>
                <div className='three-field-custom-container'><FieldTextComponent label="Post Code" /></div>
                <div className='three-field-custom-container'><FieldTextComponent label="Country" /></div>
            </div>
            <br />
            <p>Bill To</p>
            <div className='full-field-custom-container'><FieldTextComponent label="Client's Name" /></div>
            <div className='full-field-custom-container'><FieldTextComponent label="Client's Email" /></div>
            <div className='full-field-custom-container'><FieldTextComponent /></div>
            <div className='city-postcode-country'>
                <div className='three-field-custom-container'><FieldTextComponent label="City" /></div>
                <div className='three-field-custom-container'><FieldTextComponent label="Post Code" /></div>
                <div className='three-field-custom-container'><FieldTextComponent label="Country" /></div>
            </div>
            <div className='invoicedate-paymentterms'>
            <div className='two-field-custom-container'><FieldDatetimepickerComponent label="Invoice Date" /></div>
            <div className='two-field-custom-container'><FieldSelectComponent /></div>   
            </div>
            <div className='full-field-custom-container'><FieldTextComponent /></div>
            <br />
            <h3>Item List</h3>
            
            <table>
                <tr>
                    <th>Item Name</th>
                    <th>Qty.</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </table>

            <div className='add-new-item-btn'><ButtonSixComponent /></div>
            <div className='buttons-bottom'>
                
            </div>
        </div>
    );
}

export default SideBarInvoiceComponent;