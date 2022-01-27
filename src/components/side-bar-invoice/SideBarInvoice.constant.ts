import { defaultDateData } from '../field-datetimepicker/FieldDatetimepicker.component';

export const DEFAULT_CREATE_INVOICE_DATA = {
    billFromStreetAddress: "",
    billFromCity: "",
    billFromPostcode: 0,
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
    id: ""
}

export const ALL_FIELDS_REQUIRED = 'Please fill all fields!';

export const SUCCESS_CREATE_INVOICE = 'successfully created new Invoice!';