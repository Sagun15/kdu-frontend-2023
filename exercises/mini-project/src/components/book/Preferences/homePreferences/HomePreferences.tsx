import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { bookingSliceActions } from "../../../../features/booking/Booking";
import { RootState } from "../../../../app/store";
import { useEffect, useState } from "react";
import bedroomImg from "../../../../images/bedroom.png";
import bathroomImg from "../../../../images/bathroom.png";
import "./HomePreferences.scss";

export interface extraState {
  addOn: string;
  rate: number;
}

function HomePreferences() {
  const [bedrooms, setBedrooms] = useState(0);
  const [currBedrooms, setCurrBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [currBathrooms, setCurrBathrooms] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [addOns, setAddOns] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const bookSelector = useAppSelector((state: RootState) => state.book);
  const rooms = bookSelector.roomType;
  const extras = bookSelector.extras;
  const bedroomRate = 75, bathroomRate = 90;
  const [netAmount, setNetAmount] = useState(0);

  console.log(rooms);

  const updateState = (key: string, value: string | string[] | number) => {
    dispatch(bookingSliceActions.updateState({key, value}))
  }

  const updateStateWithAmt = (key: string, value: string | string[] | number, amount: number) => {
    dispatch(bookingSliceActions.updateStateWithAmt({key, value, amount}))
  }

  const updateAddOns = (value: extraState) => {
    const exists = addOns.find(choice => choice === value.addOn);
    if(exists !== undefined) {
      setNetAmount(-value.rate);
      setAddOns(addOns => addOns.filter(choice => choice !== value.addOn))
    } else {
      setNetAmount(value.rate);
      setAddOns(addOns => [...addOns, value.addOn])
    }
    console.log(value.rate, netAmount)
  }

  function handleOptionClick(optionValue: string) {
    const index = selectedOptions.indexOf(optionValue);
    if (index > -1) {
      const newSelectedOptions = [...selectedOptions];
      newSelectedOptions.splice(index, 1);
      setSelectedOptions(newSelectedOptions);
    } else {
      setSelectedOptions([...selectedOptions, optionValue]);
    }
  }
  
  useEffect(() => {
    updateStateWithAmt("extras", addOns, netAmount);
  }, [addOns])

  useEffect(() => {
    updateStateWithAmt("numberOfBedrooms", bedrooms, (bedrooms-currBedrooms)*bedroomRate);
    setCurrBedrooms(bedrooms);
  }, [bedrooms])

  useEffect(() => {
    updateStateWithAmt("numberOfBathrooms", bathrooms, (bathrooms-currBathrooms)*bathroomRate);
    setCurrBathrooms(bathrooms);
  }, [bathrooms])

  return (
    <div className="booking__home-options">
      <p className="booking__home-title">Tell us about your home</p>
      <div className="room__options">
        <div className="room-option">
          <img className="room-img" src={bedroomImg} alt="room-img" />
          <p className="room__option-title">Bedrooms</p>
          <div className="room__option-ctrls">
            <button className="decrease__ctrl-btn ctrl-btn" onClick={() => setBedrooms(bedrooms => bedrooms > 0 ? bedrooms - 1 : 0)}>-</button>
            <p className="quantity" onChange={() => updateState("numberOfBedrooms", bedrooms)}>{bedrooms}</p>
            <button className="increase__ctrl-btn ctrl-btn" onClick={() => setBedrooms(bedrooms => bedrooms + 1)}>+</button>
          </div>
        </div>
        <div className="room-option">
          <img className="room-img" src={bathroomImg} alt="room-img" />
          <p className="room__option-title">Bathroom</p>
          <div className="room__option-ctrls">
            <button className="decrease__ctrl-btn ctrl-btn" onClick={() => setBathrooms(bathrooms => bathrooms > 0 ? bathrooms - 1 : 0)}>-</button>
            <p className="quantity" onChange={() => updateState("numberOfWashrooms", bathrooms)}>{bathrooms}</p>
            <button className="increase__ctrl-btn ctrl-btn" onClick={() => setBathrooms(bathrooms => bathrooms + 1)}>+</button>
          </div>
        </div>
      </div>
      <p className="extra__title">Need any extras?</p>
      <div className="extra__options">
        {extras.map((option) => (
          <div className={`extra__option ${selectedOptions.includes(option.type) ? 'selected' : ''}`} onClick={() => {updateAddOns({addOn: option.type, rate: option.rate}); handleOptionClick(option.type)}}>
            <img
              className="extra__option-img"
              src={option.url}
              alt={`${option.type}-img`}
            />
            <p className="extra__option-title">{option.type}</p>
          </div>
        ))}
      </div>
      <p className="additional__requisites">
        Do you have any special requirements?
        <span className="optional">(optional)</span>
      </p>
      <textarea className="optional__req" rows={7} onBlur={(e) => updateState("additionalReq",e.target.value)} />
    </div>
  );
}

export default HomePreferences;
