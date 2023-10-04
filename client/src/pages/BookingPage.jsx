import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "../Image";

export default function BookingPage() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    axios
      .get("/bookings/" + id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (data === null) {
    return <div>Sorry No booking Found</div>;
  }
  if (showAllPhotos) {
    return (
      <div className="absolute inset-0  bg-black  min-h-screen h-full ">
        <div className=" bg-black p-8 grid  gap-4">
          <div>
            <h2 className="pt-16 md:text-2xl md:p-0 md:mr-48 text-white ">
              Photos of {data.place.title}
            </h2>
            <button
              className="fixed flex top-8 right-12  gap-1 py-2 px-4 rounded-2xl bg-gray-300 shadow shadow-gray-500 "
              onClick={() => setShowAllPhotos(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              Close photos
            </button>
          </div>
          <div className=" grid grid-cols-2 gap-6 mt-4">
            {data.place?.addedPhotos.length > 0 &&
              data.place.addedPhotos.map((photo, index) => (
                <div key={index}>
                  {photo.includes("https://") ? (
                    <a target="_blank" href={photo}>
                      <Image src={photo} alt="" />
                    </a>
                  ) : (
                    <a
                      target="_blank"
                      href={`http://localhost:4000/uploads/${photo}`}
                    >
                      <img
                        src={`http://localhost:4000/uploads/${photo}`}
                        alt=""
                      />
                    </a>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-4 lg:mx-8   md:mx-3  lg:px-8 pt-8">
      <h1 className="text-l md:text-4xl">{data.place.title}</h1>
      <a
        target="_black"
        href={`https://maps.google.com/?q=${data.place.address}`}
        className="flex gap-1 my-3 font-semibold underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>

        {data.place.address}
      </a>
      <div className="bg-gray-200 p-6 mx-1 my-6  rounded-2xl md:flex items-center justify-between">
        <div>
          <h2 className="md:text-xl mb-3">Your booking information:</h2>
          <div className="md:flex items-center gap-1  text-gray-500">
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
              {differenceInCalendarDays(
                new Date(data.checkOut),
                new Date(data.checkIn)
              )}{" "}
              nights:{" "}
            </div>
            <div className="flex">
              <div className="flex text-sm  items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
                {format(new Date(data.checkIn), "yyyy-MM-dd")}
              </div>
              &rarr;
              <div className="flex text-sm gap-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
                {format(new Date(data.checkOut), "yyyy-MM-dd")}
              </div>{" "}
            </div>
          </div>
        </div>
        <div className="bg-primary mt-3 md:mt-0 text-white p-6 rounded-2xl">
          Total Price :<div className="text-3xl">${data.price}</div>
        </div>
      </div>
      <div className="relative">
        <div className="rounded-2xl overflow-hidden grid gap-2 grid-cols-[2fr_1fr]">
          <div>
            {data.place.addedPhotos?.[0] && (
              <div>
                <Image
                  onClick={() => setShowAllPhotos(true)}
                  src={data.place.addedPhotos[0]}
                  className="cursor-pointer aspect-square object-cover"
                />
              </div>
            )}
          </div>
          <div className="grid">
            {data.place.addedPhotos?.[1] && (
              <Image
                onClick={() => setShowAllPhotos(true)}
                className=" cursor-pointer aspect-square object-cover"
                src={data.place.addedPhotos[1]}
              />
            )}
            <div className="overflow-hidden">
              {data.place.addedPhotos?.[2] && (
                <Image
                  onClick={() => setShowAllPhotos(true)}
                  className="cursor-pointer aspect-square object-cover relative top-2"
                  src={data.place.addedPhotos[2]}
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex gap-1 absolute bottom-3 right-3 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
              clipRule="evenodd"
            />
          </svg>
          Show more photos
        </button>
      </div>
    </div>
  );
}
