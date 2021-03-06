import React from 'react';
import './FieldSelect.css';
import { INPUT_LABEL, SELECT_OPTION_LABEL, NET_IN_DAYS } from './FieldSelect.constant';
import { isDarkThemeWithExtraClass } from '../../utils/helper/theme.helper';

interface selectMenuModel {
    label: string;
    value: string;
}

function FieldSelectComponent(props: any) {

    const [onSelect, setOnFocusSelect] = React.useState<boolean>(false);
    const [selectLabel, setSelectLabel] = React.useState<string>(props.hasOwnProperty('placeholder') ? props.placeholder : 'Select Payment');
    const [onMouseLeaveState, setOnMouseLeaveState] = React.useState<boolean>(true);
    const dataSource = SELECT_OPTION_LABEL;
    const isDarkTheme = props.isDarkTheme;

    function onBlurSelect() {
        setOnFocusSelect(false);
    }

    function onClickSelect() {
        setOnFocusSelect(!onSelect);
    }

    function onChangeSelect(label: string, value: string) {
        setSelectLabel(label);
        setOnMouseLeaveState(true);
        props?.onChange(value);
    }

    const onMouseLeaveChange = () => {
        setOnMouseLeaveState(true);
    }

    const onMouseEnterChange = () => {
        setOnMouseLeaveState(false);
    }

    return(
        <div className={isDarkThemeWithExtraClass(isDarkTheme, ['select-input-container'])}>
            <span>{props.hasOwnProperty('label') ? props.label : INPUT_LABEL}</span>
                <div tabIndex={0} className='select-container' onBlur={onBlurSelect} onClick={onClickSelect}>
                    <div className={(onSelect ? 'select-clicked' : '') + ' select'}>
                        {props.value !== '' ? (NET_IN_DAYS.replace('%VALUE%', props.value) + (parseInt(props.value) > 1 ? 's' : '')) : selectLabel}
                    </div>
                </div>

                {
                    onSelect || !onMouseLeaveState ?

                    <div className='options-container' onMouseEnter={onMouseEnterChange} onMouseLeave={onMouseLeaveChange}>
                        {dataSource.map((item: selectMenuModel) => {
                            return (
                                <div className='option-container' onClick={() => onChangeSelect(item.label, item.value)}>
                                    <div className='option'>
                                        {item.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    :
                    null
                }
        </div>
    );
}

export default FieldSelectComponent;