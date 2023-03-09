import "./Book.scss";
import Preferences from "./Preferences/Preferences";
import Summary from "./Summary/Summary";

function Book() {
  return (
    <section className="booking">
      <p className="booking__title">Book your cleaning</p>
      <p className="booking__sub-title">
        Its time to book our cleaning service for your home or apartment
      </p>
      <div className="container">
        <Preferences />
        <Summary />
      </div>
    </section>
  );
}

export default Book;
