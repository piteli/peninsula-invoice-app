import React from 'react';
import './ModalAddItem.css';
import FieldTextComponent from '../field-text/FieldText.component';
import ButtonTwoComponent from '../button-two/ButtonTwo.component';
import { ItemListDataSourceModel } from '../side-bar-invoice/SideBarInvoice.model';

function ModalAddItemComponent(props: any) {

    const [addItemInputs, setAddItemInputs] = React.useState<ItemListDataSourceModel>({itemName: '', quantity: 0, price: '', total: ''});

    function addItem() {
        if(
            addItemInputs.itemName === '' ||
            addItemInputs.quantity === 0 ||
            addItemInputs.price === ''){
            alert('Please fill all fields');
        }
        let newInputs = getNewInputsWithTotal();
        props?.retrieveInputs(newInputs);
    }

    function getNewInputsWithTotal() {
        return {...addItemInputs , ...{total : (parseInt(addItemInputs.price) * addItemInputs.quantity).toString()}}
    }

    function inputOnChange(key: string, value: string) {
        let object: any = {};
        object[key] = value;
        setAddItemInputs({...addItemInputs, ...object});
    }

    return(
        <div tabIndex={0} className='modal-add-item-container' onBlur={() => props?.setAddItemModalOpen(false)}>
            <h2>Add Item</h2>
            <FieldTextComponent label="Item Name" onChange={(e: any) => inputOnChange('itemName', e.target.value)} />
            <div className='quantity-price'>
                <FieldTextComponent type="number" label="Quantity" onChange={(e: any) => inputOnChange('quantity', e.target.value)} />
                    <div style={{width: 50}}></div>
                <FieldTextComponent type="number" label="Price" onChange={(e: any) => inputOnChange('price', e.target.value)} />
            </div>
            <ButtonTwoComponent label="Add Item" onClick={addItem} />
        </div>
    );
}

export default ModalAddItemComponent;