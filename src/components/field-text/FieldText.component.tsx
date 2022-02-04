import './FieldText.css';
import { INPUT_LABEL } from './FieldText.constant';
import { isDarkThemeWithExtraClass } from '../../utils/helper/theme.helper';

function FieldTextComponent(props: any) {
    const isDarkTheme = props.isDarkTheme;
    return(
        <div className={isDarkThemeWithExtraClass(isDarkTheme, ['input-text-container'])}>
            <span>{props.hasOwnProperty('label') ? props.label : INPUT_LABEL}</span>
            <input className='input-text' type={props?.type} onChange={props.onChange} value={props?.value} />
        </div>
    );
}

export default FieldTextComponent;