import React from 'react';
import './FieldDatetimepicker.css';
import { INPUT_LABEL, monthsThreeLetter } from './FieldDatetimepicker.constant';
import { ReactComponent as IconArrowLeft } from '../../assets/icons/icon-arrow-left.svg';
import { ReactComponent as IconArrowRight } from '../../assets/icons/icon-arrow-right.svg';
import { JsonCalendar } from 'json-calendar';

interface CurrentStateDateModel {
    day: number;
    month: number;
    year: number;
}

interface monthIndexOperationModel {
    monthIndex: number;
    year: number;
}

function FieldDatetimepickerComponent(props: any) {

    const [onSelect, setOnFocusSelect] = React.useState<boolean>(false);
    const [selectLabel, setSelectLabel] = React.useState<string>("");
    const [currentStateDate, setCurrentStateDate] = React.useState<CurrentStateDateModel>({day: 0, month: 0, year: 0});
    const [monthIndexStateDate, setMonthIndexStateDate] = React.useState<monthIndexOperationModel>({ monthIndex: 0, year: 0});
    const [onMouseLeaveState, setOnMouseLeaveState] = React.useState<boolean>(true);
    const [dataSourceWeeks, setDataSourceWeeks] = React.useState<any>("");
    const date = new Date();
    const currentToday = date.getDate();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

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
        setSelectLabel(`${subItem.day} ${monthsThreeLetter[subItem.monthIndex]} ${subItem.year}`);
        setCurrentStateDate({day: subItem.day, month: subItem.monthIndex,year: subItem.year});
    }

    function goPreviousMonth() {
        if(monthIndexStateDate.monthIndex === 0) {
            setMonthIndexStateDate({monthIndex: 11, year: monthIndexStateDate.year - 1});
            return;
        }
        setMonthIndexStateDate({monthIndex: monthIndexStateDate.monthIndex - 1, year: monthIndexStateDate.year}); 
    }

    function goNextMonth() {
        if(monthIndexStateDate.monthIndex === 11) {
            setMonthIndexStateDate({monthIndex: 0, year: monthIndexStateDate.year + 1});
            return;
        }
        setMonthIndexStateDate({monthIndex: monthIndexStateDate.monthIndex + 1, year: monthIndexStateDate.year}); 
    }

    const onMouseLeaveChange = () => {
        setOnMouseLeaveState(true);
    }

    const onMouseEnterChange = () => {
        setOnMouseLeaveState(false);
    }

    return(
        <div className='input-datetime-container'>
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
                            <div className='month-year-changer'>{`${monthsThreeLetter[monthIndexStateDate.monthIndex]} ${monthIndexStateDate.year}`}</div>
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