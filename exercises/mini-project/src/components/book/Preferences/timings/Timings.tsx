import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { RootState } from "../../../../app/store";
import { bookingSliceActions } from "../../../../features/booking/Booking";
import { useEffect, useState } from "react";
import "./Timings.scss";

function Timings() {
  const dispatch = useAppDispatch();
  const [selectedOption, setSelectedOption] = useState('');
  const perHourRate = 50;
  const [hours, setHours] = useState<number>(0);
  const [currHours, setCurrHours] = useState<number>(0);
  const bookSelector = useAppSelector((state: RootState) => state.book);
  const timings = bookSelector.timings;

  const updateState = (key: string, value: string | string[] | number) => {
    dispatch(bookingSliceActions.updateState({key, value}))
  }

  const setDay = (date: string) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const selectedDate = new Date(date);
    updateState("day", days[selectedDate.getDay()]);
  }

  useEffect(() => {
    updateState("numberOfHours", hours);
    dispatch(bookingSliceActions.updateNetAmount({amount: (hours-currHours) * perHourRate}))
    setCurrHours(hours)
  }, [hours])

  return (
    <div className="timings">
      <p className="timings__title">Choose hours and dates</p>
      <div className="hours">
        <p className="hours__title">How may hours?</p>
        <div className="hours__ctrls">
          <button className="hours__ctrl hour__dec-ctrl" onClick={(e) => setHours((hours) => hours > 0 ? hours - 1 : 0)}>-</button>
          <p className="hours__value">{hours}</p>
          <button className="hours__ctrl hour__inc-ctrl" onClick={(e) => setHours((hours) => hours + 1)}>+</button>
        </div>
        <p className="hours__description">
          Here is what we think the best based on your preferences. Feel free to
          change it if you want
        </p>
      </div>
      <div className="date">
        <p className="date__title">Choose a date?</p>
        <input className="date__chooser" type="date" onChange={(e) => {updateState("date", e.target.value); setDay(e.target.value)}} />
      </div>
      <div className="timing">
        <p className="timing__title">When do you like to start?</p>
        <div className="times">
        {timings.map((time) => (
          <p className={`time ${selectedOption === time ? 'selected' : ''}`} onClick={() => {updateState("startTime", time); setSelectedOption(time);}}>{time}</p>
        ))}
        </div>
      </div>
    </div>
  );
}

export default Timings;
