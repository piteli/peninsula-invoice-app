import React from 'react';
import './ModalAddItem.css';
import FieldTextComponent from '../field-text/FieldText.component';
import ButtonTwoComponent from '../button-two/ButtonTwo.component';
import { ItemListDataSourceModel } from '../side-bar-invoice/SideBarInvoice.model';
import { INPUT_FIELDS_REQUIRED } from './ModalAddItem.constant';
import { isDarkThemeWithExtraClass } from '../../utils/helper/theme.helper';

function ModalAddItemComponent(props: any) {

    const isDarkTheme = props.isDarkTheme;
    const [addItemInputs, setAddItemInputs] = React.useState<ItemListDataSourceModel>({itemName: '', quantity: '', price: '', total: ''});

    function addItem() {
        if(
            addItemInputs.itemName === '' ||
            addItemInputs.quantity === '' ||
            addItemInputs.price === ''){
            alert(INPUT_FIELDS_REQUIRED);
        }
        let newInputs = getNewInputsWithTotal();
        props.retrieveInputs(newInputs);
        props.setAddItemModalOpen(false);
    }

    function getNewInputsWithTotal() {
        return {...addItemInputs , ...{total : (parseInt(addItemInputs.price) * parseInt(addItemInputs.quantity)).toString()}}
    }

    function inputOnChange(key: string, value: string) {
        let object: any = {};
        object[key] = value;
        setAddItemInputs({...addItemInputs, ...object});
    }

    function cancel() {
        props?.setAddItemModalOpen(false);
    }

    return(
        <div tabIndex={0} className={isDarkThemeWithExtraClass(isDarkTheme, ['modal-add-item-container'])}>
            <h2>Add Item</h2>
            <FieldTextComponent isDarkTheme={isDarkTheme} label="Item Name" onChange={(e: any) => inputOnChange('itemName', e.target.value)} />
            <div className='quantity-price'>
                <FieldTextComponent isDarkTheme={isDarkTheme} type="number" label="Quantity" onChange={(e: any) => inputOnChange('quantity', e.target.value)} />
                    <div style={{width: 50}}></div>
                <FieldTextComponent isDarkTheme={isDarkTheme} type="number" label="Price" onChange={(e: any) => inputOnChange('price', e.target.value)} />
            </div>
            <ButtonTwoComponent isDarkTheme={isDarkTheme} label="Add Item" onClick={addItem} />
            <button onClick={cancel} className='cancel-btn'>Cancel</button>
        </div>
    );
}

export default ModalAddItemComponent;