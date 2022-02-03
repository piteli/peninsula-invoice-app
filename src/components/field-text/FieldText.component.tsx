import './FieldText.css';
import { INPUT_LABEL } from './FieldText.constant';

function FieldTextComponent(props: any) {
    return(
        <div className='input-container'>
            <span>{props.hasOwnProperty('label') ? props.label : INPUT_LABEL}</span>
            <input type={props?.type} onChange={props.onChange} value={props?.value} />
        </div>
    );
}

export default FieldTextComponent;