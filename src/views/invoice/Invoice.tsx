import React from 'react';
import { INVOICE_HEADING_LABEL } from './Invoice.constant';
import './Invoice.css';
import { ReactComponent as IconArrowDown } from '../../assets/icons/icon-arrow-down.svg';
import ButtonOneComponent from '../../components/button-one/ButtonOne.component';
import ItemListComponent from '../../components/item-list/ItemList.component';

function InvoiceView() {

    function createNewInvoice() {
        console.log('new invoice created!');
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
                <ItemListComponent />
                <ItemListComponent />
                <ItemListComponent />
                <ItemListComponent />
            </div>
        </div>
    );
}

export default InvoiceView;