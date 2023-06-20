import {
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { executeBookingAsync } from "../../features/booking/Booking";
import { RootState } from "../../app/store";
import { useEffect } from "react";

const Completion = () => {
  const navigate = useNavigate();
  console.log("Page Loaded");
  const reduxDispatch = useAppDispatch();
  const bookingStatus = useAppSelector(
    (state: RootState) => state.bookingStatus
  );

  useEffect(() => {
    if(!bookingStatus.dataPosted) {
      navigate("/");
    } else {
      reduxDispatch(executeBookingAsync());
    }
  }, [])

  return (
      <div>
        <Card variant="outlined" style={{width: 'fit-content', margin: 'auto'}}>
          <CardContent>
            <Typography variant="h5" component="h2" style={{color: '#6ac0d0'}}>
              Order Summary
            </Typography>
            <Typography variant="body1" component="p">
              Issued For: {bookingStatus.cardHolderName}
            </Typography>
            <Typography variant="body1" component="p">
              Cleaning Type: {bookingStatus.cleaningType}
            </Typography>
            <Typography variant="body1" component="p">
              Frequency Type: {bookingStatus.frequencyType}
            </Typography>
            <Typography variant="body1" component="p">
              Address: {bookingStatus.address}
            </Typography>
            <Typography variant="body1" component="p">
              Start Time: {bookingStatus.startTime}
            </Typography>
            <Typography variant="body1" component="p">
              Date: {bookingStatus.date}
            </Typography>
            <Typography variant="body1" component="p">
              Total Amount: $ {bookingStatus.netAmount}
            </Typography>
          </CardContent>
          <Grid item sm={8} textAlign="center" paddingBottom={2}>
            <NavLink to="/mybookings">
              <Button size="large" variant="contained" style={{backgroundColor: '#6ac0d0', fontWeight: 'bold'}}>
                VIEW BOOKINGS
              </Button>
            </NavLink>
          </Grid>
        </Card>
      </div>
  );
};

export default Completion;
