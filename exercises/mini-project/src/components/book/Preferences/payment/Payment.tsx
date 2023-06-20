import sslIcon from "../../../../images/ssl.png";
import lockIcon from "../../../../images/lock.png";
import { NavLink } from "react-router-dom";
import {
  bookingSliceActions
} from "../../../../features/booking/Booking";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { RootState } from "../../../../app/store";
import { useEffect, useState } from "react";
import "./Payment.scss";

function Payment() {
  const dispatch = useAppDispatch();
  const updateState = (key: string, value: string | string[] | number) => {
    dispatch(bookingSliceActions.updateState({ key, value }));
  };
  const [isInvalid, setIsInvalid] = useState<boolean>(true);
  const [checkbox, setCheckbox] = useState<boolean>(false);

  const bookingState = useAppSelector(
    (state: RootState) => state.bookingStatus
  );

  function formatExpirationDate(input: any) {
    const value = input.value.replace(/\D/g, '');
  
    if (value.length > 2) {
      input.value = value.slice(0, 2) + '/' + value.slice(2);
    } else {
      input.value = value;
    }
    input.value = input.value.length > 5 ? input.value.slice(0, 5) : input.value;
    setExpiryValue(input.value)
  }

  function formatCreditCardNumber(input: React.ChangeEvent<HTMLInputElement>) {
    let value = input.target.value.replace(/\D/g, '');
  
    value = value.replace(/(\d{4})(?=\d)/g, '$1-');
  
    value = value.length > 19 ? value.substring(0, 19): value;
    setCreditNumber(value)
  }

  function formatPhoneNumber(input: React.ChangeEvent<HTMLInputElement>) {
    var phoneNumber = input.target.value.replace(/\D/g, '');
    
    if (phoneNumber.length > 3) {
      phoneNumber = phoneNumber.slice(0, 3) + '-' + phoneNumber.slice(3);
    }
    if (phoneNumber.length > 7) {
      phoneNumber = phoneNumber.slice(0, 7) + '-' + phoneNumber.slice(7);
    }
    
    phoneNumber = phoneNumber.length > 12 ? phoneNumber.substring(0,12) : phoneNumber;
    setPhone(phoneNumber)
  }

  useEffect(() => {
    if (
      bookingState.cleaningType &&
      bookingState.frequencyType &&
      bookingState.date &&
      bookingState.startTime &&
      bookingState.numberOfHours &&
      (bookingState.numberOfBedrooms > 0 || bookingState.numberOfWashrooms > 0) &&
      bookingState.address &&
      bookingState.cardHolderName &&
      bookingState.cvv &&
      bookingState.creditCardNumber &&
      bookingState.expiryDate &&
      bookingState.emailAddress &&
      bookingState.phoneNumber &&
      bookingState.zipCode &&
      checkbox
    ) {
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
    }
  }, [bookingState, checkbox]);

  const allowDataPost = () => {
    dispatch(bookingSliceActions.setDataPosted(true))
  }

  const [creditNumber, setCreditNumber] = useState("");
  const [expiryValue, setExpiryValue] = useState("");
  const [cvv, setCvv] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");

  return (
    <div className="payments__section">
      <div className="payments__section-header">
        <p className="headline">Payment Method</p>
        <div className="img__logo"> 
        <img className="payment__logo" src={sslIcon} alt="" />
        <div className="text"><p>256 bit secure</p><p>SSL Encryption</p></div>
        </div>
      </div>
      <p className="card__details-title">Credit Card details</p>
      <form className="payment__form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}"
          title="Please enter valid credit card number (XXXX-XXXX-XXXX-XXXX)"
          placeholder="Card number"
          value={creditNumber}
          className="card__number card-input"
          required
          onChange={(e) => formatCreditCardNumber(e)}
          onBlur={(e) => updateState("creditCardNumber", e.target.value)}
        />
        <input
          type="text"
          pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
          title="Please enter in MM/YY format"
          placeholder="MM/YY"
          value={expiryValue}
          className="card__expiry card-input"
          onChange={(e) => formatExpirationDate(e.target)}
          required
          onBlur={(e) => updateState("expiryDate", e.target.value)}
        />
        <input
          type="password"
          pattern="[0-9]{3}"
          title="Please enter three digit CVV (XXX) written in back of your card"
          placeholder="CVV"
          value={cvv}
          className="card__cvv card-input"
          onChange={(e) => setCvv(e.target.value.length > 3 ? e.target.value.slice(0,3): e.target.value)}
          required
          onBlur={(e) => updateState("cvv", e.target.value)}
        />
        <input
          type="text"
          pattern="[A-Za-z ]{1,50}"
          title="Please enter a valid name (containing A-Za-z characters)"
          placeholder="Name as on Card"
          className="card__holder-name card-input"
          required
          onBlur={(e) => updateState("cardHolderName", e.target.value)}
        />
        <p className="personal__details-title">Personal Details</p>
        <input
          type="email"
          placeholder="Email Address"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          className="personal__email card-input"
          required
          onBlur={(e) => updateState("emailAddress", e.target.value)}
        />
        <input
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          title="Please enter a valid mobile number (XXX-XXX-XXXX)"
          placeholder="Phone Number"
          value={phone}
          className="personal__phone card-input"
          required
          onChange={(e) => formatPhoneNumber(e)}
          onBlur={(e) => updateState("phoneNumber", e.target.value)}
        />
        <input
          type="text"
          placeholder="Your Full Address"
          pattern="^[a-zA-Z0-9\s,'-]*$"
          title="Please enter a valid address containing A-Za-z0-9,#"
          className="personal__address card-input"
          required
          onBlur={(e) => updateState("address", e.target.value)}
        />
        <input
          type="text"
          pattern="[0-9]{5}"
          title="Please enter a valid 5 digit zip code"
          value={zip}
          placeholder="10023"
          className="personal__zip card-input"
          onChange={(e) => setZip(e.target.value.length > 5 ? e.target.value.slice(0, 5) : e.target.value)}
          required
          onBlur={(e) => updateState("zipCode", e.target.value)}
        />
        <div className="terms__conditions">
          <input
            className="check-box"
            type="checkbox"
            onClick={() => setCheckbox((checkbox) => !checkbox)}
            required
          />
          I read and agree to the{" "}
          <a href="" className="terms-link">
            terms & conditions
          </a>
        </div>
        <NavLink to="/confirmation" className="booking__btn">
          <button
            type="submit"
            onClick={allowDataPost}
            className={`book-btn ${
              isInvalid ? "book__disabled-btn" : "book__enabled-btn"
            }`}
            disabled={isInvalid}
          >
            <img className="lock__icon" src={lockIcon} alt="lock-icon" />
            Complete Booking via Secure Server
          </button>
        </NavLink>
      </form>
    </div>
  );
}

export default Payment;
