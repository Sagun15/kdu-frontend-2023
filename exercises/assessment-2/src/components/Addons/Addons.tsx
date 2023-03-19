import { ButtonGroup, Typography, Button, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { roomBookingActions } from "../../features/Rooms/RoomBookingReducer";
import { RootState } from "../../app/store";
import { useEffect, useState } from "react";
import "./Addons.scss";

export interface addonType {
  type: string;
  rate: string;
}

export const Addons = () => {
  const [selectedAddOns, setSelectedAddOns] = useState<addonType[]>([]);
  const [addOns, setAddOns] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const bookingType = useAppSelector(
    (state: RootState) => state.booking.roomType
  );
  const roomSelector = useAppSelector((state: RootState) => state.room.data);
  const updateState = (key: string, value: addonType[]) => {
    dispatch(roomBookingActions.updateRoomState({ key, value }));
  };

  useEffect(() => {
    updateState("addOns", selectedAddOns);
  }, [selectedAddOns]);

  useEffect(() => {
    setSelectedAddOns([]);
    setAddOns([]);
  }, [bookingType]);

  const updateAddons = (addOn: string, cost: string) => {
    const exists = selectedAddOns.find((choice: addonType) => choice.type === addOn);
    if (exists !== undefined) {
      setSelectedAddOns(selectedAddOns => selectedAddOns.filter(choice => choice.type !== addOn));
      setAddOns(addOns => addOns.filter(choice => choice !== addOn))
    } else {
      setSelectedAddOns([...selectedAddOns, {type: addOn, rate: cost}]);
      setAddOns([...addOns, addOn]);
    }
  };

  const isSmallerScreen = useMediaQuery("(max-width:600px)");

  return (
    <Box width="80%" margin="auto">
      <Typography
        variant="h6"
        p={2}
        width="100%"
        boxSizing="border-box"
        bgcolor="#f08a5d"
        color="#eee"
        gutterBottom
      >
        Select additional add ons / preferences
      </Typography>
      <ButtonGroup
        variant="outlined"
        color="primary"
        aria-label="room selector"
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: isSmallerScreen ? 'wrap' : '',
          gap: isSmallerScreen ? 0 : 2,
          marginBottom: 4
        }}
      >
        {roomSelector.map((roomType) => {
          return (
            roomType.name === bookingType.type &&
            roomType.addOns.map((addOn) => (
              <Button
                variant="outlined"
                style={{
                  borderColor: "#f08a5d",
                  color: "#f08a5d",
                  borderRadius: 0,
                  marginBottom: isSmallerScreen ? 4 : 0
                }}
                className={addOns.includes(addOn.name) ? 'selected' : ''}
                onClick={() => updateAddons(addOn.name, addOn.cost)}
                key={addOn.name}
              >
                {addOn.name}
              </Button>
            ))
          );
        })}
        {bookingType.type === "" && (
          <Typography variant="h6">Please choose a room type first</Typography>
        )}
      </ButtonGroup>
    </Box>
  );
};
