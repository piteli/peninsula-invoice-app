import './ButtonOne.css';
import { ReactComponent as IconPlus } from '../../assets/icons/icon-plus.svg';
import { BUTTON_LABEL } from './ButtonOne.constant';

function ButtonOneComponent(props: any) {
    return (
        <div className='button-one-container' onClick={props?.onClick}>
            <div className='button-one-icon'><IconPlus fill={"#7C5DFA"} /></div>
            <span className='button-one-text'>
                {props.hasOwnProperty('label') ? props.label : BUTTON_LABEL}
            </span>
        </div>
    );
}

export default ButtonOneComponent; 