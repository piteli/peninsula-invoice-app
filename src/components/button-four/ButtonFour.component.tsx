import './ButtonFour.css';
import { BUTTON_LABEL } from './ButtonFour.constant';
import { isDarkThemeWithExtraClass } from '../../utils/helper/theme.helper';

function ButtonFourComponent(props: any) {
    const isDarkTheme = props.isDarkTheme;
    return (
        <div className={isDarkThemeWithExtraClass(isDarkTheme, ['button-four','parent-four-container'])}>
            <div className='button-four-container' onClick={props?.onClick}>
                <span className='button-four-text'>
                    {props.hasOwnProperty('label') ? props.label : BUTTON_LABEL}
                </span>
            </div>
        </div>
    );
}

export default ButtonFourComponent; 