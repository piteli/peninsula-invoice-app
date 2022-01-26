import React from 'react';
import SideBarHomeComponent from '../components/side-bar-home/SideBarHome.component';
import InvoiceView from './invoice/Invoice';
import './Main.css';

function MainView() {
    const [isDarkTheme, setDarkTheme] = React.useState<boolean>(false);
    return(
        <div className='top-main-container'>
            <SideBarHomeComponent />
            <div className='content'><InvoiceView /></div>
        </div>
    );
}

export default MainView;