import './FieldText.css';
import { INPUT_LABEL } from './FieldText.constant';

function FieldTextComponent(props: any) {
    return(
        <div className='input-container'>
            <span>{props.hasOwnProperty('label') ? props.label : INPUT_LABEL}</span>
            <input />
        </div>
    );
}

export default FieldTextComponent;