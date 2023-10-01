import { differenceInCalendarDays } from "date-fns";
import { useState } from "react";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }
  return (
    <div className="bg-white shadow shadow-gray-500 p-4 mt-8 sticky top-10 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border border-gray-400 rounded-2xl mt-4">
        <div className="flex">
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
          <div className="  py-3 px-4 border-l border-gray-400 ">
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
      <button className="primary mt-4">Reserve</button>
      {numberOfNights > 0 && (
        <>
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
