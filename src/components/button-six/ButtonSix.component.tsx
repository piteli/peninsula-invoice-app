import './ButtonSix.css';
import { BUTTON_LABEL } from './ButtonSix.constant';
import { ReactComponent as IconPlus } from '../../assets/icons/icon-plus.svg';

function ButtonSixComponent(props: any) {
    return (
        <div className='button-six-container' onClick={props?.onClick}>
            <IconPlus fill={'#7E88C3'} />
            <span className='button-six-text'>
                {props.hasOwnProperty('label') ? props.label : BUTTON_LABEL}
            </span>
        </div>
    );
}

export default ButtonSixComponent; 