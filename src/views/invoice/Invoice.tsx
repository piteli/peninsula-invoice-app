import React from 'react';
import { INVOICE_HEADING_LABEL } from './Invoice.constant';
import './Invoice.css';
import { ReactComponent as IconArrowDown } from '../../assets/icons/icon-arrow-down.svg';
import ButtonOneComponent from '../../components/button-one/ButtonOne.component';
import ItemListComponent from '../../components/item-list/ItemList.component';
import { CreateInvoiceInputsModel } from '../../components/side-bar-invoice/SideBarInvoice.model';
import { monthsThreeLetter } from '../../components/field-datetimepicker/FieldDatetimepicker.constant';

function InvoiceView(props: any) {

    function createNewInvoice() {
        props?.setInvoiceMenuOpen(!props?.isInvoiceMenuOpen);
    }

    return (
        <div className='invoice-container'>
            <div className='top-part'>
                <div className='heading-container'>
                    <h2>{INVOICE_HEADING_LABEL}</h2>
                    <span>There are 7 total invoice</span>
                </div>
                <div className='click-container'>
                    <div className='filter-by-status'>
                        <span>Filter by status</span>
                        <IconArrowDown />
                    </div>
                    <div>
                        <ButtonOneComponent onClick={createNewInvoice} />
                    </div>
                </div>
            </div>
            <div className='bottom-part'>
                {
                    props.dataSourceInvoices.map((item: CreateInvoiceInputsModel) => (
                        <ItemListComponent 
                            columnOne={item.id}
                            columnTwo={`${item.invoiceDate.day} 
                                        ${monthsThreeLetter[item.invoiceDate.month]} 
                                        ${item.invoiceDate.year}`}
                            columnThree={item.billToClientName}
                            columnFour={item.total}
                            columnFive={item.status}
                        />
                    ))
                }
                {
                    props.dataSourceInvoice?.length === 0 ?
                    <div>

                    </div>
                    :
                    null
                }
            </div>
        </div>
    );
}

export default InvoiceView;