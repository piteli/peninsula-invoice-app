import './ButtonThree.css';
import { BUTTON_LABEL } from './ButtonThree.constant';
import { isDarkThemeWithExtraClass } from '../../utils/helper/theme.helper';

function ButtonThreeComponent(props: any) {
    return (
        <div className={isDarkThemeWithExtraClass('edit', ['parent-container'])}>
            <div className='button-container' onClick={props?.onClick}>
                <span className='button-text'>
                    {props.hasOwnProperty('label') ? props.label : BUTTON_LABEL}
                </span>
            </div>
        </div>
    );
}

export default ButtonThreeComponent; 