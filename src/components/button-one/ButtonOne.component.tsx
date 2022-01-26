import './ButtonOne.css';
import { ReactComponent as IconPlus } from '../../assets/icons/icon-plus.svg';
import { BUTTON_LABEL } from './ButtonOne.constant';

function ButtonOneComponent(props: any) {
    return (
        <div className='button-container' onClick={props?.onClick}>
            <div className='button-icon'><IconPlus fill={"#7C5DFA"} /></div>
            <span className='button-text'>
                {props.hasOwnProperty('label') ? props.label : BUTTON_LABEL}
            </span>
        </div>
    );
}

export default ButtonOneComponent; 