import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PhotosUploader from "../PhotosUploader";
import GetLabel from "../GetLabel";

export default function ListingPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState("");
  const [price, setPrice] = useState(100);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      const {
        title,
        address,
        addedPhotos,
        description,
        perks,
        checkIn,
        extraInfo,
        checkOut,
        maxGuests,
        price,
      } = data;
      console.log(perks);
      setTitle(title);
      setAddress(address);
      setAddedPhotos(addedPhotos);
      setDescription(description);
      setPerks(perks);
      setCheckIn(checkIn);
      setExtraInfo(extraInfo);
      setCheckOut(checkOut);
      setMaxGuests(maxGuests);
      setPrice(price);
    });
  }, [id]);

  function handleCbClick(e) {
    const { checked, name } = e.target;
    if (checked) {
      setPerks([...perks, name]);
    } else {
      setPerks([...perks.filter((selectedName) => selectedName != name)]);
    }
  }
  async function savePlace(ev) {
    ev.preventDefault();
    await axios.put("/places", {
      id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    navigate(-1);
  }

  return (
    <div>
      <div>
        <form onSubmit={savePlace}>
          <h2 className="text-2xl mt-4">Title</h2>
          <p className="text-gray-500 text-sm">
            title for your place. should be short and catchy{" "}
          </p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title ,For example: My lovely apartment"
          />
          <h2 className="text-2xl mt-4 ">Address</h2>
          <input
            type="text"
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <h2 className="text-2xl mt-4">Photos</h2>
          <p className="text-gray-500 text-sm">more is better</p>
          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

          <h2 className="text-2xl mt-4">Description</h2>
          <p className="text-gray-500 text-sm">description for the place</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <h2 className="text-2xl mt-4">Perks</h2>
          <p className="text-gray-500 text-sm">perks of the place</p>
          <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 ">
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer ">
              <input
                type="checkbox"
                name="wifi"
                onChange={handleCbClick}
                checked={perks.includes("wifi")}
              />
            
              <GetLabel label={"WIFI"} />

              <span>Wifi</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer ">
              <input
                type="checkbox"
                name="parking"
                onChange={handleCbClick}
                checked={perks.includes("parking")}
              />
              
              <GetLabel label={"PARKING"} />

              <span>Free parking spot</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer ">
              <input
                type="checkbox"
                name="tv"
                onChange={handleCbClick}
                checked={perks.includes("tv")}
              />
            
              <GetLabel label={"TV"} />

              <span>Tv</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer ">
              <input
                type="checkbox"
                name="pets"
                onChange={handleCbClick}
                checked={perks.includes("pets")}
              />
             
              <GetLabel label={"PETS"} />

              <span>Pets</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer ">
              <input
                type="checkbox"
                name="entrance"
                onChange={handleCbClick}
                checked={perks.includes("entrance")}
              />
            
              <GetLabel label={"ENTRANCE"} />

              <span>Private entrance</span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer ">
              <input
                type="checkbox"
                name="radio"
                onChange={handleCbClick}
                checked={perks.includes("radio")}
              />
             
              <GetLabel label={"RADIO"} />

              <span>Radio</span>
            </label>
          </div>
          <h2 className="text-2xl mt-4">Extra Info</h2>
          <p className="text-gray-500 text-sm">house rules, etc</p>
          <textarea
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          />
          <h2 className="text-2xl mt-4">Check in&out times</h2>
          <p className="text-gray-500 text-sm">
            add check in and out times, remember to have some time window for
            cleaning the room between guests
          </p>
          <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mt-2 -mb-1">Check in time</h3>
              <input
                type="text"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                placeholder="14:00"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check out time</h3>
              <input
                type="text"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                placeholder="11:00"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Number of guests</h3>
              <input
                type="number"
                placeholder="3"
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Price per night</h3>
              <input
                type="number"
                placeholder="100"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <button className="primary my-4">Save</button>
        </form>
      </div>
    </div>
  );
}
