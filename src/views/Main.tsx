import React from 'react';
import SideBarHomeComponent from '../components/side-bar-home/SideBarHome.component';
import InvoiceView from './invoice/Invoice';
import './Main.css';
import SideBarInvoiceComponent from '../components/side-bar-invoice/SideBarInvoice.component';
import ModalAddItemComponent from '../components/modal-add-item/ModalAddItem.component';
import { ItemListDataSourceModel } from '../components/side-bar-invoice/SideBarInvoice.model';
import { CreateInvoiceInputsModel } from '../components/side-bar-invoice/SideBarInvoice.model';

function MainView() {
    const [isDarkTheme, setDarkTheme] = React.useState<boolean>(true);
    const [isInvoiceMenuOpen, setInvoiceMenuOpen] = React.useState<boolean>(false);
    const [isAddItemModalOpen, setAddItemModalOpen] = React.useState<boolean>(false);
    const [dataSourceInvoices, setDataSourceInvoices] = React.useState<CreateInvoiceInputsModel[]>([]);
    const [addItemsData, setAddItemsData] = React.useState<ItemListDataSourceModel[]>([]);


    React.useEffect(() => {
        console.log('here is datasource invoices', dataSourceInvoices);
    }, [dataSourceInvoices]);

    function retrieveInputsFromModal(value: ItemListDataSourceModel) {
        let addItems = addItemsData;
        addItems.push(value);
        setAddItemsData(addItems);
    }

    function saveCreatedInvoiceToMainView(payload: CreateInvoiceInputsModel) {
        setDataSourceInvoices([...dataSourceInvoices, payload]);
    }

    return(
        <div className='top-main-container'>
            <SideBarHomeComponent setDarkTheme={setDarkTheme} isDarkTheme={isDarkTheme} />
            { isInvoiceMenuOpen ? <div className='backdrop'></div> : null }
            {
                isInvoiceMenuOpen ?
                    <div className='side-bar-overlay'>
                        <SideBarInvoiceComponent 
                            addItemsData={addItemsData} 
                            setInvoiceMenuOpen={setInvoiceMenuOpen} 
                            setAddItemModalOpen={setAddItemModalOpen}
                            saveCreatedInvoiceToMainView={saveCreatedInvoiceToMainView} 
                        />
                    </div>
                    :
                    null
            }
            {
                isAddItemModalOpen ?
                <ModalAddItemComponent 
                    setAddItemModalOpen={setAddItemModalOpen} 
                    retrieveInputs={retrieveInputsFromModal} 
                /> : null
            }
            <div className='content'>
                <InvoiceView 
                    dataSourceInvoices={dataSourceInvoices} 
                    isInvoiceMenuOpen={isInvoiceMenuOpen} 
                    setInvoiceMenuOpen={setInvoiceMenuOpen} 
                />
            </div>
        </div>
    );
}

export default MainView;