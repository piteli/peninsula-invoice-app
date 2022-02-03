import React from 'react';
import SideBarHomeComponent from '../components/side-bar-home/SideBarHome.component';
import InvoiceView from './invoice/Invoice';
import './Main.css';
import SideBarInvoiceComponent from '../components/side-bar-invoice/SideBarInvoice.component';
import ModalAddItemComponent from '../components/modal-add-item/ModalAddItem.component';
import { ItemListDataSourceModel, CreateInvoiceInputsModel } from '../components/side-bar-invoice/SideBarInvoice.model';
import ModalViewInvoiceComponent from '../components/modal-view-invoice/ModalViewInvoice.component';
import ApiService from '../services/Api.service';
import { AUTHENTICATION_TYPE } from '../utils/constants/http.constant';
import ModalDeleteInvoiceComponent from '../components/modal-delete-invoice/ModalDeleteInvoice.component';
import { DEFAULT_CREATE_INVOICE_DATA } from '../components/side-bar-invoice/SideBarInvoice.constant';
import { isDarkThemeWithExtraClass } from '../utils/helper/theme.helper';

function MainView() {
    const [isDarkTheme, setDarkTheme] = React.useState<boolean>(false);
    const [isInvoiceMenuOpen, setInvoiceMenuOpen] = React.useState<boolean>(false);
    const [isAddItemModalOpen, setAddItemModalOpen] = React.useState<boolean>(false);
    const [isInvoiceViewModalOpen, setInvoiceViewModalOpen] = React.useState<boolean>(false);
    const [dataSourceInvoices, setDataSourceInvoices] = React.useState<CreateInvoiceInputsModel[]>([]);
    const [invoiceDetailView, setInvoiceDetailView] = React.useState<CreateInvoiceInputsModel>();
    const [isInvoiceDeleteModalOpen, setInvoiceDeleteModalOpen] = React.useState<boolean>(false);
    const [holdDeleteInvoiceId, setDeleteInvoiceId] = React.useState<string>('');
    const [inputs, setInputs] = React.useState<CreateInvoiceInputsModel>(DEFAULT_CREATE_INVOICE_DATA);
    const [addItemsData, setAddItemsData] = React.useState<any>([]);

    React.useEffect(() => {
        loadInvoiceDataFromAPI();
    }, []);
    
    React.useEffect(() => {
        if(invoiceDetailView !== undefined) {
            setInvoiceViewModalOpen(true);
        }
    }, [invoiceDetailView]);

    function retrieveInputsFromModal(value: ItemListDataSourceModel) {
        let newInputsAddItems = addItemsData;
        newInputsAddItems.push(value);
        setAddItemsData(newInputsAddItems);
    }

    function saveCreatedInvoiceToMainView(payload: CreateInvoiceInputsModel) {
        setDataSourceInvoices([...dataSourceInvoices, payload]);
        setInputs(DEFAULT_CREATE_INVOICE_DATA);
    }

    function mergeViewDetailWithFormInputs() {
        const mergeData = {...inputs, ...invoiceDetailView};
        setInputs(mergeData);
    }
    
    async function loadInvoiceDataFromAPI() {
        try {
            const response = await new ApiService().get('./data.json', AUTHENTICATION_TYPE.NONE);
            const json = await response.json();
            const payload: CreateInvoiceInputsModel[] = json.map((item: any) => {
                const dateSplit = item?.createdAt.split('-');
                const day = parseInt(dateSplit[2]);
                const month = parseInt(dateSplit[1]) - 1;
                const year = parseInt(dateSplit[0]);
                const dateObject = { day, month, year};

                const dateDueSplit = item?.paymentDue.split('-');
                const paymentDueDay = parseInt(dateDueSplit[2]);
                const paymentDueMonth = parseInt(dateDueSplit[1]) - 1;
                const paymentDueYear = parseInt(dateDueSplit[0]);
                const paymentDueDateObject = { 
                    day: paymentDueDay, 
                    month: paymentDueMonth,
                    year: paymentDueYear
                };
                const addItems = item.items.map((item: any) => {
                    return {
                        itemName: item.name,
                        quantity: item.quantity,
                        price: item.price,
                        total: item.total
                    }
                });

                return {
                    id: item?.id,
                    billFromStreetAddress: item?.senderAddress?.street,
                    billFromCity: item?.senderAddress?.city,
                    billFromPostcode: item?.senderAddress?.postCode,
                    billFromCountry: item?.senderAddress?.country,
                    billToClientName: item?.clientName,
                    billToClientEmail: item?.clientEmail,
                    billToStreetAddress: item?.clientAddress.street,
                    billToCity: item?.clientAddress?.city,
                    billToPostcode: item?.clientAddress?.postCode,
                    billToCountry: item?.clientAddress?.country,
                    invoiceDate: dateObject,
                    paymentTerms: item?.paymentTerms,
                    projectDesc: item?.description,
                    addItems: addItems,
                    status: item?.status,
                    total: item?.total,
                    paymentDue: paymentDueDateObject
                }
            });
            setDataSourceInvoices(payload);
        } catch(e) {
            console.log(e);
        }
    }

    async function deleteInvoice() {
        const invoiceId = holdDeleteInvoiceId;
        try {
            await new ApiService().delete('/invoice?id=' + invoiceId, AUTHENTICATION_TYPE.NONE);
            let invoices = dataSourceInvoices;
            const findIndexInvoice = invoices.findIndex((c) => c.id === invoiceId);
            invoices.splice(findIndexInvoice, 1);
            setDataSourceInvoices(invoices);
            setInvoiceDeleteModalOpen(false);
            setInvoiceViewModalOpen(false);
            setAddItemsData([]);
        } catch(e) {
            console.log(e);
        }
    }

    return(
        <div className={isDarkThemeWithExtraClass(isDarkTheme, ['top-main-container'])}>
            <SideBarHomeComponent setDarkTheme={setDarkTheme} isDarkTheme={isDarkTheme} />
            { isInvoiceMenuOpen || isInvoiceViewModalOpen ? <div className='backdrop'></div> : null }
            {
                isInvoiceViewModalOpen ?
                    <div>
                        <ModalViewInvoiceComponent 
                            invoiceDetailView={invoiceDetailView} 
                            setInvoiceViewModalOpen={setInvoiceViewModalOpen}
                            setInvoiceDeleteModalOpen={setInvoiceDeleteModalOpen}
                            setDeleteInvoiceId={setDeleteInvoiceId}
                            setInvoiceMenuOpen={setInvoiceMenuOpen}
                            setInvoiceDetailView={setInvoiceDetailView}
                            mergeViewDetailWithFormInputs={mergeViewDetailWithFormInputs}
                            dataSourceInvoices={dataSourceInvoices}
                            setDataSourceInvoices={setDataSourceInvoices}
                            isDarkTheme={isDarkTheme}
                            setAddItemsData={setAddItemsData}
                        />
                    </div>
                    :
                    null
            }
            {
                isInvoiceDeleteModalOpen?
                <ModalDeleteInvoiceComponent 
                    deleteInvoice={deleteInvoice}
                    isDarkTheme={isDarkTheme}
                    setInvoiceDeleteModalOpen={setInvoiceDeleteModalOpen}
                />
                :
                null
            }
            {
                isInvoiceMenuOpen ?
                    <div className='side-bar-overlay'>
                        <SideBarInvoiceComponent 
                            setInvoiceMenuOpen={setInvoiceMenuOpen} 
                            setAddItemModalOpen={setAddItemModalOpen}
                            saveCreatedInvoiceToMainView={saveCreatedInvoiceToMainView} 
                            setInputs={setInputs}
                            inputs={inputs}
                            setDataSourceInvoices={setDataSourceInvoices}
                            dataSourceInvoices={dataSourceInvoices}
                            setInvoiceDetailView={setInvoiceDetailView}
                            isDarkTheme={isDarkTheme}
                            addItemsData={addItemsData}
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
                    isDarkTheme={isDarkTheme}
                /> : null
            }
            <div className='content'>
                <InvoiceView 
                    dataSourceInvoices={dataSourceInvoices} 
                    isInvoiceMenuOpen={isInvoiceMenuOpen} 
                    setInvoiceMenuOpen={setInvoiceMenuOpen} 
                    setInvoiceDetailView={setInvoiceDetailView}
                    isDarkTheme={isDarkTheme}
                />
            </div>
        </div>
    );
}

export default MainView;