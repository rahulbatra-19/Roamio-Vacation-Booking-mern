import { Link } from "react-router-dom";
import Header from "../Header";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import Image from "../Image";

export function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const { search } = useContext(UserContext);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return places.filter(
      (item) =>
        regex.test(item.title) ||
        regex.test(item.description) ||
        regex.test(item.extraInfo) ||
        regex.test(item.address)
    );
  };
  useEffect(() => {
    if (search.length > 0) {
      setFilteredPlaces(filterPrompts(search));
    } else {
      setFilteredPlaces([]);
    }
  }, [search]);

  return (
    <div className="mt-8 grid gap-x-7 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredPlaces.length > 0
        ? filteredPlaces.map((place, index) => (
            <Link to={"/place/" + place._id} key={index}>
              <div className="bg-gray-500 rounded-2xl flex ">
                {place.addedPhotos?.[0] ? (
                  <Image
                    src={place.addedPhotos[0]}
                    alt="no image"
                    className="rounded-2xl object-cover aspect-square"
                  />
                ) : (
                  <img alt="no image" className=""></img>
                )}
              </div>
              <h2 className="font-bold leading-4 mt-3">{place.title}</h2>
              <h3 className="text-sm  text-gray-500 leading-4">
                {place.address}
              </h3>
              <div className="mt-1">
                {" "}
                <span className="font-bold">${place.price}</span> per night
              </div>
            </Link>
          ))
        : places.length > 0 &&
          places.map((place, index) => (
            <Link to={"/place/" + place._id} key={index}>
              <div className="bg-gray-500 rounded-2xl flex ">
                {place.addedPhotos?.[0] ? (
                  <Image
                    src={place.addedPhotos[0]}
                    alt="no image"
                    className="rounded-2xl object-cover aspect-square"
                  />
                ) : (
                  <img alt="no image" className=""></img>
                )}
              </div>
              <h2 className="font-bold leading-4 mt-3">{place.title}</h2>
              <h3 className="text-sm  text-gray-500 leading-4">
                {place.address}
              </h3>
              <div className="mt-1">
                {" "}
                <span className="font-bold">${place.price}</span> per night
              </div>
            </Link>
          ))}
    </div>
  );
}
