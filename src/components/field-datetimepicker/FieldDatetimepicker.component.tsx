import React from 'react';
import './FieldDatetimepicker.css';
import { INPUT_LABEL, monthsThreeLetter } from './FieldDatetimepicker.constant';
import { ReactComponent as IconArrowLeft } from '../../assets/icons/icon-arrow-left.svg';
import { ReactComponent as IconArrowRight } from '../../assets/icons/icon-arrow-right.svg';
import { JsonCalendar } from 'json-calendar';
import { isDarkThemeWithExtraClass } from '../../utils/helper/theme.helper';

const date = new Date();
const currentToday = date.getDate();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();

export interface CurrentStateDateModel {
    day: number;
    month: number;
    year: number;
}

export const defaultDateData: CurrentStateDateModel = {
    day: currentToday,
    month: currentMonth,
    year: currentYear
}

interface monthIndexOperationModel {
    monthIndex: number;
    year: number;
}

function FieldDatetimepickerComponent(props: any) {

    const [onSelect, setOnFocusSelect] = React.useState<boolean>(false);
    const [selectLabel, setSelectLabel] = React.useState<string>("");
    const [monthChanger, setMonthChanger] = React.useState<string>(`${monthsThreeLetter[currentMonth]} ${currentYear}`);
    const [currentStateDate, setCurrentStateDate] = React.useState<CurrentStateDateModel>({day: 0, month: 0, year: 0});
    const [monthIndexStateDate, setMonthIndexStateDate] = React.useState<monthIndexOperationModel>({ monthIndex: 0, year: 0});
    const [onMouseLeaveState, setOnMouseLeaveState] = React.useState<boolean>(true);
    const [dataSourceWeeks, setDataSourceWeeks] = React.useState<any>("");
    const isDarkTheme = props.isDarkTheme;

    React.useEffect(() => {
        setCurrentStateDate({
            day: currentToday,
            month: currentMonth,
            year: currentYear
        });
        setMonthIndexStateDate({monthIndex: currentMonth, year: currentYear});
        setSelectLabel(`${currentToday} ${monthsThreeLetter[currentMonth]} ${currentYear}`);
    }, []);

    React.useEffect(() => {
        dateTimePickerModalContentArrowChange();
    }, [monthIndexStateDate]);

    React.useEffect(() => {
        dateTimePickerModalContentClickChange();
    }, [currentStateDate]);

    React.useEffect(() => {
    }, [dataSourceWeeks])

    React.useEffect(() => {
        if(props.value.year !== 0) {
            setSelectLabel(`${props.value.day} ${monthsThreeLetter[props.value.month]} ${props.value.year}`);
            setCurrentStateDate({day: props.value.day, month: props.value.month,year: props.value.year});
        }
    }, [props.value]);

    function onBlurSelect() {
        setOnFocusSelect(false);
    }

    function onClickSelect() {
        setOnFocusSelect(!onSelect);
    }

    function dateTimePickerModalContentArrowChange() {
        let calendar = new JsonCalendar({today: new Date(currentStateDate.year, currentStateDate.month, currentStateDate.day)});
        calendar.changeMonth(monthIndexStateDate.year, monthIndexStateDate.monthIndex);
        calendar.weeks.splice(0, 6);
        setDataSourceWeeks(calendar.weeks);     
    }

    function dateTimePickerModalContentClickChange() {
        const calendar = new JsonCalendar({today: new Date(currentStateDate.year, currentStateDate.month, currentStateDate.day)});
        setDataSourceWeeks(calendar.weeks);     
    }

    const dayClicked = (subItem: any) => {
        setMonthChanger(`${monthsThreeLetter[subItem.monthIndex]} ${subItem.year}`);
        setSelectLabel(`${subItem.day} ${monthsThreeLetter[subItem.monthIndex]} ${subItem.year}`);
        setCurrentStateDate({day: subItem.day, month: subItem.monthIndex,year: subItem.year});
        props?.onChange({day: subItem.day, month: subItem.monthIndex,year: subItem.year});
    }

    function goPreviousMonth() {
        if(monthIndexStateDate.monthIndex === 0) {
            setMonthChanger(`${monthsThreeLetter[11]} ${monthIndexStateDate.year - 1}`);
            setMonthIndexStateDate({monthIndex: 11, year: monthIndexStateDate.year - 1});
            return;
        }
        setMonthChanger(`${monthsThreeLetter[monthIndexStateDate.monthIndex - 1]} ${monthIndexStateDate.year}`);
        setMonthIndexStateDate({monthIndex: monthIndexStateDate.monthIndex - 1, year: monthIndexStateDate.year}); 
    }

    function goNextMonth() {
        if(monthIndexStateDate.monthIndex === 11) {
            setMonthChanger(`${monthsThreeLetter[0]} ${monthIndexStateDate.year + 1}`);
            setMonthIndexStateDate({monthIndex: 0, year: monthIndexStateDate.year + 1});
            return;
        }
        setMonthChanger(`${monthsThreeLetter[monthIndexStateDate.monthIndex + 1]} ${monthIndexStateDate.year}`);
        setMonthIndexStateDate({monthIndex: monthIndexStateDate.monthIndex + 1, year: monthIndexStateDate.year}); 
    }

    const onMouseLeaveChange = () => {
        setOnMouseLeaveState(true);
    }

    const onMouseEnterChange = () => {
        setOnMouseLeaveState(false);
    }

    return(
        <div className={isDarkThemeWithExtraClass(isDarkTheme, ['input-datetime-container'])}>
            <span>{props.hasOwnProperty('label') ? props.label : INPUT_LABEL}</span>
                <div tabIndex={0} className='datetime-container' onBlur={onBlurSelect} onClick={onClickSelect}>
                    <div className={(onSelect ? 'datetime-select-clicked' : '') + ' datetime'}>
                        {selectLabel}
                    </div>
                </div>

                {
                    onSelect || !onMouseLeaveState ?

                    <div className='datepicker-modal-container'  onMouseEnter={onMouseEnterChange} onMouseLeave={onMouseLeaveChange}>
                        <div className='top-modal-body'>
                            <div className='arrow' onClick={goPreviousMonth}><IconArrowLeft /></div>
                            <div className='month-year-changer'>{monthChanger}</div>
                            <div className='arrow' onClick={goNextMonth}><IconArrowRight /></div>
                        </div>
                        <table className='bottom-modal-body'>
                            {dataSourceWeeks.map((item: any) => {
                                return (
                                    <tr className='week-container'>
                                        {
                                            item.map((item2: any) => {
                                                return (
                                                    <td className={
                                                        (monthIndexStateDate.monthIndex === item2.monthIndex ? 
                                                        'current-month' : 'non-current-month')
                                                        + ' day'}
                                                        onClick={() => dayClicked(item2)}
                                                        >
                                                        <span style={
                                                            (item2.day === currentStateDate.day &&
                                                            item2.monthIndex === currentStateDate.month &&
                                                            item2.year === currentStateDate.year)
                                                            ? {color: "var(--button-action-hover)"} : {}
                                                        }>{item2.day}</span>
                                                    </td>
                                                );
                                            })
                                        }
                                    </tr>
                                );
                            })}
                        </table>
                    </div>
                    :
                    null
                }
        </div>
    );
}

export default FieldDatetimepickerComponent;