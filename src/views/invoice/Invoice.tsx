import React from 'react';
import { EMPTY_LABEL_ONE, INVOICE_HEADING_LABEL } from './Invoice.constant';
import './Invoice.css';
import { ReactComponent as IconArrowDown } from '../../assets/icons/icon-arrow-down.svg';
import ButtonOneComponent from '../../components/button-one/ButtonOne.component';
import ItemListComponent from '../../components/item-list/ItemList.component';
import { CreateInvoiceInputsModel } from '../../components/side-bar-invoice/SideBarInvoice.model';
import { monthsThreeLetter } from '../../components/field-datetimepicker/FieldDatetimepicker.constant';
import { ReactComponent as IconIllustrationEmpty } from '../../assets/icons/illustration-empty.svg';

// const dummy = 

function InvoiceView(props: any) {

    function createNewInvoice() {
        props?.setInvoiceMenuOpen(!props?.isInvoiceMenuOpen);
    }

    function onClickItem(invoiceData: CreateInvoiceInputsModel) {
        props.setInvoiceDetailView(invoiceData);
    }

    return (
        <div className='invoice-container'>
            <div className='top-part'>
                <div className='heading-container'>
                    <h2>{INVOICE_HEADING_LABEL}</h2>
                    <span>There are {props.dataSourceInvoices?.length} total invoice</span>
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
                            invoiceData={item}
                            onClick={onClickItem}
                        />
                    ))
                }
                {
                    props.dataSourceInvoices?.length === 0 ?
                    <div className='placeholder-image-empty-records'>
                        <IconIllustrationEmpty  />
                        <h3>{EMPTY_LABEL_ONE}</h3>
                        <h6>Create an invoice by clicking the <br /> <span>New Invoice</span> button and get started</h6>
                    </div>
                    :
                    null
                }
            </div>
        </div>
    );
}

export default InvoiceView;