import React from 'react';
import { ReactComponent as IconLeftArrow } from '../../assets/icons/icon-arrow-left.svg';
import { GO_BACK } from './ModalViewInvoice.constant';
import ButtonTwoComponent from '../button-two/ButtonTwo.component';
import ButtonThreeComponent from '../button-three/ButtonThree.component';
import ButtonFiveComponent from '../button-five/ButtonFive.component';
import './ModalViewInvoice.css';
import { monthsThreeLetter } from '../field-datetimepicker/FieldDatetimepicker.constant';
import { CreateInvoiceInputsModel } from '../side-bar-invoice/SideBarInvoice.model';
import ApiService from '../../services/Api.service';
import { AUTHENTICATION_TYPE } from '../../utils/constants/http.constant';
import { isDarkThemeWithExtraClass } from '../../utils/helper/theme.helper';

function ModalViewInvoiceComponent(props: any) {
    const invoice = props.invoiceDetailView;
    const totalItemsPrice = invoice.total;
    const isDarkTheme = props.isDarkTheme;

    function toCamelCase(label: string) {
        return label.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match: any, index: any) {
          if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
          return index === 0 ? match.toLowerCase() : match.toUpperCase();
        });
    }

    function goBack() {
        props.setAddItemsData([]);
        props.setInvoiceViewModalOpen(false);
    }

    function openDeleteModal() {
        props.setDeleteInvoiceId(invoice.id);
        props.setInvoiceDeleteModalOpen(true);
    }

    function openEditInvoiceSidebar() {
        props.setAddItemsData(invoice.addItems);
        props.setInvoiceMenuOpen(true);
        props.mergeViewDetailWithFormInputs();
    }

    function saveAsPaid() {
        const invoiceId = invoice.id;
        new ApiService().post('/invoice/paid', AUTHENTICATION_TYPE.BASIC, invoiceId);
        const findIndex = props.dataSourceInvoices.findIndex((c: any) => c.id === invoiceId);
        if(findIndex > -1) {
            const dataSourceInvoices = props.dataSourceInvoices.map((item: any, index: number) => {
                if(index === findIndex) {
                    return {...item, status: 'Paid'};
                }
                return item;
            });
            let newInvoiceDetailView = props.invoiceDetailView;
            newInvoiceDetailView['status'] = 'Paid';
            props.setDataSourceInvoices(dataSourceInvoices);
            props.setInvoiceDetailView(newInvoiceDetailView);
        }
    }
      
    return(
        <div tabIndex={0} className={isDarkThemeWithExtraClass(isDarkTheme, ['modal-view-invoice-container'])}>
            <div className='back-btn' onClick={goBack}>
                <div className="icon-arrow-left"><IconLeftArrow /></div>
                <span>{GO_BACK}</span>
            </div>

            <div className='top-header'>
                <div className='left-side'>
                    <span>Status</span>
                    <div className={'status-box ' + (invoice.status).toLowerCase()}>
                        <span>• {toCamelCase(invoice.status)}</span>
                    </div>
                </div>
                <div className='right-side'>
                    {
                        (invoice.status).toLowerCase() !== 'paid' ?

                        <ButtonThreeComponent onClick={openEditInvoiceSidebar} />
                        :
                        null
                    }
                    <ButtonFiveComponent onClick={openDeleteModal} />
                    {
                        (invoice.status).toLowerCase() === 'pending' ?
                        <ButtonTwoComponent onClick={saveAsPaid} />
                        :
                        null
                    }
                </div>
            </div>

            <div className='bottom-body'>
                <div className='top'>
                    <div className='up-panel'>
                        <div className='bill-to-detail'>
                            <div className='designation'>
                                <span style={{fontWeight: 'bold', fontSize: 13}}>{invoice.id}</span>
                                <br /><br />
                                <span></span>
                            </div>
                            <div className='address'>
                                {invoice.billFromStreetAddress}
                            </div>
                        </div>
                        <div className='general-info'>
                            <div>
                                <span>Invoice Date</span><br />
                                <span className="bold-text">
                                    {`${invoice.invoiceDate.day} 
                                    ${monthsThreeLetter[invoice.invoiceDate.month]} 
                                    ${invoice.invoiceDate.year}`}
                                </span> <br />
                                <span>Payment Due</span><br />
                                <span className="bold-text">                                    
                                    {`${invoice.paymentDue.day} 
                                    ${monthsThreeLetter[invoice.paymentDue.month]} 
                                    ${invoice.paymentDue.year}`}</span>
                            </div>
                            <div>
                                <span>Bill To</span><br />
                                <span className="bold-text">{invoice.billToClientName}</span><br />
                                <div className='address' style={{textAlign: 'left'}}>
                                    {invoice.billFromStreetAddress}
                                </div>
                            </div>
                            <div>
                                <span>Sent to</span><br />
                                <span className="bold-text">{invoice.billToClientEmail}</span>
                            </div>
                        </div>
                    </div>
                    <div className='down-panel'>

                    </div>
                </div>
                <div className='bottom'>
                    <table>
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                        {
                            invoice.addItems.map((item: any) => (
                                <tr>
                                    <td>{item.itemName}</td>
                                    <td>{item.quantity}</td>
                                    <td>{`RM ${item.price}`}</td>
                                    <td>{`RM ${item.total}`}</td>
                                </tr>
                            ))
                        }
                    </table>
                    <div className='amount-total'>
                        <span>Amount Due</span>
                        <span>RM {totalItemsPrice}</span>
                </div>
                </div>
            </div>
        </div>
    );
}

export default ModalViewInvoiceComponent;