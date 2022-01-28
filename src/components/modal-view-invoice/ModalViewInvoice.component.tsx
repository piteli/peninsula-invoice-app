import React from 'react';
import { ReactComponent as IconLeftArrow } from '../../assets/icons/icon-arrow-left.svg';
import { GO_BACK } from './ModalViewInvoice.constant';
import ButtonTwoComponent from '../button-two/ButtonTwo.component';
import ButtonThreeComponent from '../button-three/ButtonThree.component';
import ButtonFiveComponent from '../button-five/ButtonFive.component';
import './ModalViewInvoice.css';

function ModalViewInvoiceComponent() {

    return(
        <div tabIndex={0} className='modal-view-invoice-container'>
            <div className='back-btn'>
                <div className="icon-arrow-left"><IconLeftArrow /></div>
                <span>{GO_BACK}</span>
            </div>

            <div className='top-header'>
                <div className='left-side'>
                    <span>Status</span>
                    <div className={'status-box pending'}>
                        <span>• Pending</span>
                    </div>
                </div>
                <div className='right-side'>
                    <ButtonThreeComponent />
                    <ButtonFiveComponent />
                    <ButtonTwoComponent />
                </div>
            </div>

            <div className='bottom-body'>
                <div className='top'>
                    <div className='up-panel'>
                        <div className='bill-to-detail'>
                            <div className='designation'>
                                <span style={{fontWeight: 'bold', fontSize: 13}}>#XM9141</span>
                                <br /><br />
                                <span>Graphic Design</span>
                            </div>
                            <div className='address'>
                                <span>19 Union Terrace</span><br />
                                <span>London</span><br />
                                <span>E1 3EZ</span><br />
                                <span>United Kingdom</span><br />
                            </div>
                        </div>
                        <div className='general-info'>
                            <div>
                                <span>Invoice Date</span><br />
                                <span className="bold-text">21 Aug 2021</span><br />
                                <span>Payment Due</span><br />
                                <span className="bold-text">20 Sep 2021</span>
                            </div>
                            <div>
                                <span>Bill To</span><br />
                                <span className="bold-text">Alex Grim</span><br />
                                <span>84 Church Way</span><br />
                                <span>Bradford</span><br />
                                <span>8D1 9PB</span><br />
                                <span>United Kingdom</span>
                            </div>
                            <div>
                                <span>Sent to</span><br />
                                <span className="bold-text">Alexgrim@mail.com</span>
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
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                        <tr>
                            <td>Banner Design</td>
                            <td>1</td>
                            <td>RM 10000</td>
                            <td>RM 100</td>
                        </tr>
                        <tr>
                            <td>Email Design</td>
                            <td>2</td>
                            <td>RM 20000</td>
                            <td>RM 300</td>
                        </tr>
                    </table>
                    <div className='amount-total'>
                        <span>Amount Due</span>
                        <span>RM 400.00</span>
                </div>
                </div>
            </div>
        </div>
    );
}

export default ModalViewInvoiceComponent;