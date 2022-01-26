import './ButtonFour.css';
import { BUTTON_LABEL } from './ButtonFour.constant';
import { isDarkThemeWithExtraClass } from '../../utils/helper/theme.helper';

function ButtonFourComponent(props: any) {
    return (
        <div className={isDarkThemeWithExtraClass('draft', ['parent-container'])}>
            <div className='button-container' onClick={props?.onClick}>
                <span className='button-text'>
                    {props.hasOwnProperty('label') ? props.label : BUTTON_LABEL}
                </span>
            </div>
        </div>
    );
}

export default ButtonFourComponent; 