import './ButtonTwo.css';
import { BUTTON_LABEL } from './ButtonTwo.constant';

function ButtonTwoComponent(props: any) {
    return (
        <div className='button-two-container' onClick={props?.onClick}>
            <span className='button-two-text'>
                {props.hasOwnProperty('label') ? props.label : BUTTON_LABEL}
            </span>
        </div>
    );
}

export default ButtonTwoComponent; 