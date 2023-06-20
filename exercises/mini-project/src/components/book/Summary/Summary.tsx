import paintBrush from "../../../images/paint-brush.png";
import calendarIcon from "../../../images/calendar.png";
import clockIcon from "../../../images/clock.png";
import refreshIcon from "../../../images/refresh.png";
import locationInfo from "../../../images/location.png";
import "./Summary.scss";
import { useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";


function Summary() {
  const bookingState = useAppSelector((state: RootState) => state.bookingStatus);

  return (
    <div className="booking__summary">
      <p className="booking__summary-title">Booking Summary</p>
      <div className="summary__details">
        {bookingState.cleaningType !== "" && <div className="cleaning__type summary__detail">
          <img className="icon" src={paintBrush} alt="brush-icon" />
          <p className="cleaning__type-title title">{bookingState.cleaningType}</p>
        </div>}
        {bookingState.date !== "" && bookingState.startTime !== "" && <div className="booking__date summary__detail">
          <img className="icon" src={calendarIcon} alt="calendar-icon" />
          <p className="title">{bookingState.day} {bookingState.date} @ {bookingState.startTime}</p>
        </div>}
        {bookingState.numberOfHours !== 0 && <div className="duration__info summary__detail">
          <img className="icon" src={clockIcon} alt="clock-icon" />
          <p className="title">{bookingState.numberOfHours} hours</p>
        </div>}
        {bookingState.frequencyType !== "" && <div className="frequency__info summary__detail">
          <img className="icon" src={refreshIcon} alt="refresh-icon" />
          <p className="title">{bookingState.frequencyType}</p>
        </div>}
        {bookingState.address !== "" && bookingState.zipCode !== "" && <div className="location__info summary__detail">
          <img className="icon" src={locationInfo} alt="location-icon" />
          <p className="title">{bookingState.address} {bookingState.zipCode}</p>
        </div>}
      </div>
      <div className="total__cost">
        <p className="total__cost-title">Total cost</p>
        <p className="total__cost-amt">$ {bookingState.netAmount}</p>
      </div>
    </div>
  );
}

export default Summary;
