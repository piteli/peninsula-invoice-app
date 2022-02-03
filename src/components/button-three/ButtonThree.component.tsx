import './ButtonThree.css';
import { BUTTON_LABEL } from './ButtonThree.constant';
import { isDarkThemeWithExtraClass } from '../../utils/helper/theme.helper';

function ButtonThreeComponent(props: any) {
    const isDarkTheme = props.isDarkTheme;
    return (
        <div className={isDarkThemeWithExtraClass(isDarkTheme, ['button-three', 'parent-three-container'])}>
            <div className='button-three-container' onClick={props?.onClick}>
                <span className='button-three-text'>
                    {props.hasOwnProperty('label') ? props.label : BUTTON_LABEL}
                </span>
            </div>
        </div>
    );
}

export default ButtonThreeComponent; 