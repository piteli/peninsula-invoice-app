import './ModalDeleteInvoice.css';
import ButtonTwoComponent from '../button-two/ButtonTwo.component';

function ModalDeleteInvoiceComponent(props: any) {

    function cancel() {
        props.setInvoiceDeleteModalOpen(false);
    }

    function deleteId() {
        props.deleteInvoice();
    }

    return (
        <div tabIndex={0} className='modal-add-item-container'>
            <h2>Confirm Deletion</h2>
            <h4>Are you sure you want to delete invoice {props.id}? This action cannot be undone.</h4>
            <ButtonTwoComponent label="Delete" onClick={() => deleteId()} />
            <br />
            <button onClick={cancel} className='cancel-btn'>Cancel</button>
        </div>
    );
}

export default ModalDeleteInvoiceComponent;