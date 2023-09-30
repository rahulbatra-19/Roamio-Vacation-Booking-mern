import { Link } from "react-router-dom";
import Header from "../Header";
import { useEffect, useState } from "react";
import axios from "axios";

export function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);
  return (
    <div className="mt-8 grid gap-x-7 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place, index) => (
          <div key={index}>
            <div className="bg-gray-500 rounded-2xl flex ">
              {place.addedPhotos?.[0] ? (
                <img
                  src={"http://localhost:4000/uploads/" + place.addedPhotos[0]}
                  alt="no image"
                  className="rounded-2xl object-cover aspect-square"
                />
              ) : (
                <img alt="no image" className=""></img>
              )}
            </div>
            <h2 className="font-bold leading-4">{place.title}</h2>
            <h3 className="text-sm  text-gray-500 leading-4">
              {place.address}
            </h3>
            <div className="mt-1">
              {" "}
              <span className="font-bold">${place.price}</span> per night
            </div>
          </div>
        ))}
    </div>
  );
}
