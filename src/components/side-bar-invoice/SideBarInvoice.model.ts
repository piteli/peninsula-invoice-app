import { CurrentStateDateModel } from '../field-datetimepicker/FieldDatetimepicker.component';

export interface ItemListDataSourceModel {
    itemName: string;
    quantity: string;
    price: string;
    total: string;
}

export interface CreateInvoiceInputsModel {
    id?: string;
    billFromStreetAddress: string;
    billFromCity: string;
    billFromPostcode: string;
    billFromCountry: string;
    billToClientName: string;
    billToClientEmail: string;
    billToStreetAddress: string;
    billToCity: string;
    billToPostcode: string;
    billToCountry: string;
    invoiceDate: CurrentStateDateModel;
    paymentTerms: string;
    projectDesc: string;
    addItems?: ItemListDataSourceModel[];
    status: string;
    total: string;
    paymentDue: CurrentStateDateModel;
}