import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import "./Preferences.scss";
import HomePreferences from "./homePreferences/HomePreferences";
import Timings from "./timings/Timings";
import Payment from "./payment/Payment";
import { bookingSliceActions } from "../../../features/booking/Booking";

function Preferences() {
  const bookSelector = useAppSelector((state: RootState) => state.book);
  const [cleaningOption, setCleaningOption] = useState("");
  const [frequencyChoice, setFrequencyChoice] = useState<number>(0);
  const [curFrequencyChoice, setCurFrequencyChoice] = useState<number>(0);
  const [cleaningRate, setCleaningRate] = useState<number>(0);
  const [currentCleaningRate, setCurrentCleaningRate] = useState<number>(0);
  const [frequencyOption, setFrequencyOption] = useState("");
  const dispatch = useAppDispatch();
  const cleaningTypes = bookSelector.cleaningType;
  const frequencyTypes = bookSelector.frequencyType;

  const updateStateWithAmt = (
    key: string,
    value: string | string[] | number,
    amount: number
  ) => {
    if (key === "cleaningType") {
      setCleaningRate(amount);
    } else {
      setFrequencyChoice(amount);
    }
    dispatch(bookingSliceActions.updateState({ key, value }));
  };

  useEffect(() => {
    let amount = cleaningRate - currentCleaningRate;
    setCurrentCleaningRate(
      (currentCleaningRate) => currentCleaningRate + amount
    );
    dispatch(bookingSliceActions.updateNetAmount({ amount }));
  }, [cleaningRate]);
  useEffect(() => {
    let amount = frequencyChoice - curFrequencyChoice;
    setCurFrequencyChoice((curFrequencyChoice) => curFrequencyChoice + amount);
    dispatch(bookingSliceActions.updateNetAmount({ amount }));
  }, [frequencyChoice]);

  const throwError = () => {
    throw new Error("A error issued");
  };

  return (
    <div className="booking__preferences">
      <p className="booking__preferences-title">Cleaning Preferences</p>
      <div className="booking__preferences__options">
        <p className="cleaning-options-title" onClick={throwError}>
          What type of cleaning?
        </p>
        <div className="cleaning-options">
          {cleaningTypes.map((option) => (
            <p
              className={`cleaning-option ${
                cleaningOption === option.type ? "selected" : ""
              }`}
              onClick={() => {
                updateStateWithAmt("cleaningType", option.type, option.rate);
                setCleaningOption(option.type);
              }}
            >
              {option.type}
            </p>
          ))}
        </div>
        <div className="frequency-options">
          <p className="frequency-options-title">
            How often would you like cleaning?
          </p>
          {frequencyTypes.map((option) => (
            <p
              className={`frequency-option ${
                frequencyOption === option.type ? "selected" : ""
              }`}
              onClick={() => {
                updateStateWithAmt("frequencyType", option.type, option.rate);
                setFrequencyOption(option.type);
              }}
            >
              {option.type}
            </p>
          ))}
        </div>
      </div>
      <HomePreferences />
      <Timings />
      <Payment />
    </div>
  );
}

export default Preferences;
