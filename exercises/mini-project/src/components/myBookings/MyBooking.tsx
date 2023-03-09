import "./MyBookings.scss";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useEffect } from "react";
import { RootState } from "../../app/store";
import Box from "@mui/material/Box";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { getBookingDetails } from "../../features/booking/BookingDetails";
import Header from "../header/Header";
import { Backdrop, CircularProgress } from "@mui/material";
import { Authenticator } from "@aws-amplify/ui-react";
import {
  BookingInfo,
  bookingSliceActions,
} from "../../features/booking/Booking";

export default function MyBookings() {
  const reduxDispatch = useAppDispatch();
  const user_id = useAppSelector((state)=>state.bookingStatus.userId)
  const bookingDetails = useAppSelector(
    (state: RootState) => state.bookingDetails.userBookingDetails
  );

  useEffect(() => {
    console.log("Data fetching...")
    reduxDispatch(getBookingDetails());
  }, [reduxDispatch, user_id]);

  const isBookingLoading = useAppSelector(
    (state: RootState) => state.bookingDetails.isLoading
  );

  const rows: GridRowsProp = bookingDetails.map(
    (booking: BookingInfo, index: number) => ({
      id: index + 1,
      bookingId: booking.booking_id,
      date: booking.date,
      frequency: booking.cleaning_frequency,
      time: booking.start_time,
      price: booking.booking_amt,
      type: booking.cleaning_type,
      duration: booking.time_slot,
      extras: booking.extras
    })
  );

  const columns: GridColDef[] = [
    { field: "bookingId", headerName: "Booking ID", width: 150 },
    { field: "type", headerName: "Cleaning Type", width: 150 },
    { field: "frequency", headerName: "Frequency", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "time", headerName: "Time", width: 150 },
    { field: "duration", headerName: "Duration (In hrs)", width: 150 },
    { field: "price", headerName: "Price ($)", width: 150 },
    { field: "extras", headerName: "Extras", width: 300 }
  ];

  console.log("myBooking", bookingDetails);
  return (
    <Authenticator>
      {({ signOut, user }) => {
        reduxDispatch(bookingSliceActions.updateUserSubId(user?.username));
        return (
          <>
            <Header signOut={signOut} />
            {isBookingLoading !== false ? (
              <>
                <Backdrop
                  sx={{
                    color: "#6ac0d0",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={isBookingLoading}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </>
            ) : (
              <Box sx={{ height: 400, width: "70%", margin: "auto" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  checkboxSelection
                  disableRowSelectionOnClick
                />
              </Box>
            )}
          </>
        );
      }}
    </Authenticator>
  );
}
