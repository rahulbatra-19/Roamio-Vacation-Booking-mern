import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router-dom";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState();
  const { user } = useContext(UserContext);
  const [redirect, setRedirect] = useState("");
  const [isButtonDisabled, setIsButtonDiabled] = useState(true);
  const [numberOfNights, setNumberOfNights] = useState(0);
  useEffect(() => {
    if (checkIn && checkOut) {
      let nights = differenceInCalendarDays(
        new Date(checkOut),
        new Date(checkIn)
      );
      setNumberOfNights(nights);
      console.log(numberOfNights);
      setIsButtonDiabled(false);
    }
  }, [checkIn, checkOut]);

  async function book() {
    if (user === null) {
      alert("Please login!");
      setRedirect("/login");
      return;
    }
    if (name == "" || phone == "") {
      alert("Please fill in name and phone number!!");
      return;
    }
    const data = {
      user: user._id,
      checkIn,
      checkOut,
      name,
      phone,
      place: place._id,
      numberOfGuests,
      price: place.price * numberOfNights,
    };
    const response = await axios.post("/bookings", data);
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow shadow-gray-500 p-4 mt-8 sticky top-10 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border border-gray-400 rounded-2xl mt-4">
        <div className="lg:flex md:grid md:grid-cols-2">
          <div className=" py-3 px-4">
            <label htmlFor="check-in" className="text-sm font-bold">
              CHECK-IN:
            </label>
            <input
              type="date"
              id="check-in"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l border-gray-400 ">
            <label htmlFor="check-out" className="text-sm font-bold">
              CHECKOUT:
            </label>
            <input
              type="date"
              id="check-out"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="px-4 border-t border-gray-400 ">
            <label htmlFor="check-out" className="text-sm font-bold">
              Guests
            </label>
            <input
              type="number"
              className="border-none text-sm "
              placeholder="1 guest "
              id="check-out"
              value={numberOfGuests}
              onChange={(ev) => setNumberOfGuests(ev.target.value)}
            />
          </div>
        </div>
      </div>
      {numberOfNights > 0 && (
        <>
          <div className="my-3">
            <label htmlFor="name" className="font-bold">
              Your Full Name:
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />

            <label htmlFor="phone" className="font-bold">
              Your Phone Number:
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+91 1110000000"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </div>
          <button
            className="primary mt-4 "
            disabled={isButtonDisabled}
            onClick={book}
          >
            Reserve
          </button>
          <div className="text-center text-sm my-4 text-gray-500">
            You won't be charged yet
          </div>
          <div className="flex justify-between p-3 my-3">
            <span className="underline text-gray-500 ">
              ${place.price} x {numberOfNights} nights
            </span>
            <span className=" text-gray-500">
              ${place.price * numberOfNights}
            </span>
          </div>
          <div className="flex justify-between p-3 border-t border-gray-400 font-seminormal">
            <span className="">Total before taxes</span>
            <span> ${place.price * numberOfNights} </span>
          </div>
        </>
      )}
    </div>
  );
}
