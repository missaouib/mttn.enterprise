import React, {useEffect, useState} from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider, KeyboardDatePicker,
} from '@material-ui/pickers';

function DatePickerField(props) {
    const [selectedDate, setSelectedDate] = useState(props.initValue);

    useEffect(()=>{
        setSelectedDate(props.initValue)
    }, [props.initValue])

    function handleDateChange(date) {
        setSelectedDate(date);
        props.onChange(date);
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                autoOk
                label="Date of document"
                value={selectedDate}
                inputVariant="outlined"
                onChange={date => handleDateChange(date)}
                InputAdornmentProps={{position: "start"}}
                format="dd-MM-yyyy"
                variant="outlined"/>
        </MuiPickersUtilsProvider>
    );
}

export default DatePickerField;