import './ButtonFive.css';
import { BUTTON_LABEL } from './ButtonFive.constant';

function ButtonFiveComponent(props: any) {
    return (
        <div className='button-five-container' onClick={props?.onClick}>
            <span className='button-five-text'>
                {props.hasOwnProperty('label') ? props.label : BUTTON_LABEL}
            </span>
        </div>
    );
}

export default ButtonFiveComponent; 