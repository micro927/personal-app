import { useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import Datepicker from 'tailwind-datepicker-react';

function DatePickerInput({
  defaultDate,
  setValueFunction,
}: {
  defaultDate: Date;
  setValueFunction: (date: Date) => void;
}) {
  const [show, setShow] = useState<boolean>(false);
  const handleClose = (state: boolean) => {
    setShow(state);
  };
  return (
    <Datepicker
      options={{
        autoHide: true,
        todayBtn: false,
        clearBtn: false,
        maxDate: new Date('2100-01-01'),
        minDate: new Date('2023-01-01'),
        theme: {
          background: '',
          todayBtn: '',
          clearBtn: '',
          icons: '',
          text: '',
          disabledText: 'opacity-20',
          input:
            '!input !input-md !input-bordered !text-base-content w-full cursor-pointer',
          inputIcon: 'hidden',
          selected: 'bg-secondary text-secondary-content',
        },
        icons: {
          prev: () => <FiArrowLeft />,
          next: () => <FiArrowRight />,
        },
        datepickerClassNames: 'fixed bottom-0 right-1/2 translate-x-1/2 z-50',
        defaultDate,
        language: 'en',
        disabledDates: [],
        weekDays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        inputNameProp: 'date-for-select-input',
        inputIdProp: 'date-picker',
        inputPlaceholderProp: 'Select Date',
        inputDateFormatProp: {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        },
      }}
      onChange={setValueFunction}
      show={show}
      setShow={handleClose}
    />
  );
}

export default DatePickerInput;
