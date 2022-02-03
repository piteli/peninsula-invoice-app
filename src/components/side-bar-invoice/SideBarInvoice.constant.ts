import { defaultDateData } from '../field-datetimepicker/FieldDatetimepicker.component';
import { idGenerate } from '../../utils/helper/common.helper';


export const DEFAULT_CREATE_INVOICE_DATA = {
    billFromStreetAddress: "",
    billFromCity: "",
    billFromPostcode: "",
    billFromCountry: "",
    billToClientName: "",
    billToClientEmail: "",
    billToStreetAddress: "",
    billToCity: "",
    billToPostcode: "",
    billToCountry: "",
    invoiceDate: defaultDateData,
    paymentTerms: "",
    projectDesc: "",
    status: 'none',
    total: "0",
    id: idGenerate(),
    paymentDue: defaultDateData,
    addItems: [
        {itemName: '', quantity: "", price: '', total: ''}
    ]
}

export const ALL_FIELDS_REQUIRED = 'Please fill all fields!';

export const SUCCESS_CREATE_INVOICE = 'successfully created new invoice!';

export const SUCCESS_DRAFT_INVOICE = 'Draft Saved!';

export const SUCCESS_UPDATE_INVOICE = 'Successfully updated invoice!';