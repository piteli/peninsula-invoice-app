import {
    INVOICE_ID,
    INVOICE_DATE,
    INVOICE_MONEY,
    INVOICE_PERSON_TO,
    INVOICE_STATUS
} from './ItemList.constant';
import './ItemList.css';
import { ReactComponent as IconArrowRight } from '../../assets/icons/icon-arrow-right.svg';
import { isDarkThemeWithExtraClass } from '../../utils/helper/theme.helper';

function ItemListComponent(props: any) {
    const invoiceId = props.hasOwnProperty('columnOne') ?
                        props.columnOne : INVOICE_ID;
    const invoiceDate = props.hasOwnProperty('columnTwo') ?
                        props.columnTwo : INVOICE_DATE;
    const invoicePersonTO = props.hasOwnProperty('columnThree') ?
                        props.columnThree : INVOICE_PERSON_TO;
    const invoiceMoney = props.hasOwnProperty('columnFour') ?
                        props.columnFour : INVOICE_MONEY;
    const invoiceStatus = props.hasOwnProperty('columnFive') ?
                        props.columnFive : INVOICE_STATUS;
    const invoiceData = props.invoiceData;
    const isDarkTheme = props.isDarkTheme;

    function onClick() {
        props.onClick(invoiceData);
    }

    return(
        <div className={isDarkThemeWithExtraClass(isDarkTheme, ['item-list-container'])} onClick={onClick}>
            <div className='column column-one'>
                <span>{invoiceId}</span>
            </div>
            <div className='column column-two'>
                <span>Due {invoiceDate}</span>
            </div>
            <div className='column column-three'>
                <span>{invoicePersonTO}</span>
            </div>
            <div className='column column-four'>
                <span>RM {invoiceMoney}</span>
            </div>
            <div className='column column-five'>
                <div className={'status-box ' + invoiceStatus.toLowerCase()}>
                    <span>• {invoiceStatus}</span>
                </div>
                <IconArrowRight />
            </div>
        </div>
    );
}

export default ItemListComponent;