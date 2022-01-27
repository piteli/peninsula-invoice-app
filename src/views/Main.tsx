import React from 'react';
import SideBarHomeComponent from '../components/side-bar-home/SideBarHome.component';
import InvoiceView from './invoice/Invoice';
import './Main.css';
import SideBarInvoiceComponent from '../components/side-bar-invoice/SideBarInvoice.component';
import ModalAddItemComponent from '../components/modal-add-item/ModalAddItem.component';
import { ItemListDataSourceModel } from '../components/side-bar-invoice/SideBarInvoice.model';

function MainView() {
    const [isDarkTheme, setDarkTheme] = React.useState<boolean>(true);
    const [isInvoiceMenuOpen, setInvoiceMenuOpen] = React.useState<boolean>(false);
    const [isAddItemModalOpen, setAddItemModalOpen] = React.useState<boolean>(false);

    function retrieveInputsFromModal(value: ItemListDataSourceModel) {
        //here is modal inputs
    }

    return(
        <div className='top-main-container'>
            <SideBarHomeComponent setDarkTheme={setDarkTheme} isDarkTheme={isDarkTheme} />
            {
                isInvoiceMenuOpen ?
                    <div className='side-bar-overlay'>
                        <SideBarInvoiceComponent setAddItemModalOpen={setAddItemModalOpen} />
                    </div>
                    :
                    null
            }
            {
                isAddItemModalOpen ?
                <ModalAddItemComponent retrieveInputs={retrieveInputsFromModal} /> : null
            }
            <div className='content'><InvoiceView isInvoiceMenuOpen={isInvoiceMenuOpen} setInvoiceMenuOpen={setInvoiceMenuOpen} /></div>
        </div>
    );
}

export default MainView;