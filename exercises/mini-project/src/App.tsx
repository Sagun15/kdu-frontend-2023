import { Amplify } from "aws-amplify";

import "@aws-amplify/ui-react/styles.css";
import awsExports from "./config/aws-exports";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import { useAppDispatch } from "./app/hooks";
import { fetchBookRequisites } from "./features/static/Book";
import Book from "./components/book/Book";
import MyBookings from "./components/myBookings/MyBooking";
import Completion from "./components/completion/Completion";
import MainHeader from "./components/header/MainHeader";
import { Authenticator } from "@aws-amplify/ui-react";
import ReactGA from 'react-ga';

Amplify.configure(awsExports);

const TRACKING_ID = "UA-259459516-1"; // OUR_TRACKING_ID
  ReactGA.initialize(TRACKING_ID);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    dispatch(fetchBookRequisites());
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route
          index
          element={
            <>
              <MainHeader />
              <Book />
            </>
          }
        />
        <Route path="/confirmation" element={<Authenticator><Completion /></Authenticator>} />
        <Route path="/mybookings" element={<MyBookings />} />
      </Routes>
    </div>
  );
}

export default App;
