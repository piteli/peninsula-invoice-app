import React from 'react';
import SideBarHomeComponent from '../components/side-bar-home/SideBarHome.component';
import InvoiceView from './invoice/Invoice';
import './Main.css';
import SideBarInvoiceComponent from '../components/side-bar-invoice/SideBarInvoice.component';

function MainView() {
    const [isDarkTheme, setDarkTheme] = React.useState<boolean>(true);
    const [isInvoiceMenuOpen, setInvoiceMenuOpen] = React.useState<boolean>(false);
    return(
        <div className='top-main-container'>
            <SideBarHomeComponent setDarkTheme={setDarkTheme} isDarkTheme={isDarkTheme} />
            {
                isInvoiceMenuOpen ?
                    <div className='side-bar-overlay'>
                        <SideBarInvoiceComponent />
                    </div>
                    :
                    null
            }
            <div className='content'><InvoiceView isInvoiceMenuOpen={isInvoiceMenuOpen} setInvoiceMenuOpen={setInvoiceMenuOpen} /></div>
        </div>
    );
}

export default MainView;