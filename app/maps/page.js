"use client";

import { ImCross } from "react-icons/im";
import { FaLocationArrow } from "react-icons/fa";
import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { RotatingLines } from "react-loader-spinner";
import { airporte } from "../database";

const key = "AIzaSyDKCETHjm9wpfpZ0U37wmctYQIxHdel800";

const page = () => {
  useEffect(() => {
    console.log(key);
  }, []);

  // hook from the NPM package
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: key,
    libraries: ["places"],
  });

  const google = window.google;

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: 40.6892494,
    lng: -74.0466944,
  };

  const [map, setMap] = useState(null /** @type google.maps.map*/);
  const [directionResponse, setDirectionResponse] = useState();
  const [distance, setDistance] = useState("");
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [display, setDisplay] = useState(true);
  const [display2, setDisplay2] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filteredData2, setFilteredData2] = useState([]);

  async function calcRoute() {
    if (origin === "" || destination === "") {
      return;
    }
    /* eslint-disable no-undef */
    const directionService = new google.maps.DirectionsService();
    const results = await directionService.route({
      origin: origin,
      destination: destination,
      /* eslint-disable no-undef */
      travelMode: google.maps.TravelMode.WALKING,
    });

    setDirectionResponse(results);
    console.log(results);
    setDistance(results.routes[0].legs[0].distance.text);
  }

  function clearRoute() {
    setDirectionResponse(null);
    setDistance("");
    originRef.current.value = "";
    destinationRef.current.value = "";
    setOrigin();
    setDestination();
    // window.location.reload();
  }

  /** @type React.MutableRefObject<HTMLInputElement>*/
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  const handleOrigin = (e) => {
    setOrigin(e.target.value);
  };

  const handleDestination = (e) => {
    setDestination(e.target.value);
  };

  const searchBox1Display = display ? "none" : "";
  const searchBox2Display = display2 ? "none" : "";

  const displaySearchBox = () => {
    setDisplay(!display);
  };

  const displaySearchBox2 = () => {
    setDisplay2(!display2);
  };

  function selectEntry(name) {
    setOrigin(name);
    setDisplay(!display);
    console.log(origin);
  }

  function selectEntry2(name) {
    setDestination(name);
    setDisplay2(!display2);
    console.log(destination);
  }

  const handleFilter = (e) => {
    setOrigin(e.target.value);
    const newFilter = airporte.filter((value) => {
      return value.name.toLowerCase().includes(origin.toLowerCase());
      console.log(origin);
    });
    return setFilteredData(newFilter);
  };

  const handleFilter2 = (e) => {
    setDestination(e.target.value);
    const newFilter2 = airporte.filter((value) => {
      return value.name.toLowerCase().includes(destination.toLowerCase());
    });
    return setFilteredData2(newFilter2);
  };

  return (
    <div className="">
      <div className="flex flex-col justify-center items-center">
        <header className="w-full flex justify-center items-center flex-col mt-10">
          <h1 className="head_text">
            Explore the world with
            <br className="max-md:hidden" />
            <span className="orange_gradient"> Stream Maps </span>
          </h1>
          <h2 className="desc"> Fly over the world </h2>
        </header>
      </div>

      <div className="App">
        <div className="search-main">
          <div className="searchFeature1">
            <input
              type="text"
              className="url_input peer w-4/5"
              placeholder="From ✈"
              ref={originRef}
              value={origin}
              onChange={handleFilter}
              onClick={displaySearchBox}
            />
            <div
              className="searchBox1"
              style={{ display: `${searchBox1Display}` }}
            >
              <p className="searchElement">
                {" "}
                {filteredData.map((a) => (
                  <p
                    className="searchElementp"
                    onClick={() => {
                      selectEntry(a.name);
                    }}
                  >
                    {" "}
                    {a.name}{" "}
                  </p>
                ))}
              </p>
            </div>
          </div>

          <div className="searchFeature1">
            <input
              type="text"
              className="url_input peer w-4/5 mt-4"
              placeholder="To ✈"
              ref={destinationRef}
              onChange={handleFilter2}
              value={destination}
              onClick={displaySearchBox2}
            />
            <div
              className="searchBox1"
              style={{ display: `${searchBox2Display}` }}
            >
              <p className="searchElement">
                {" "}
                {filteredData2.map((a) => (
                  <p
                    p
                    className="searchElementp"
                    onClick={() => {
                      selectEntry2(a.name);
                    }}
                  >
                    {" "}
                    {a.name}{" "}
                  </p>
                ))}
              </p>
            </div>
          </div>

          <div className="button-container">
            <button className="btn-a" onClick={clearRoute}>
              {" "}
              <ImCross color="white" />{" "}
            </button>
            <button className="btn-b" onClick={calcRoute}>
              {" "}
              Fly ✈{" "}
            </button>
            <button className="btn-c" onClick={() => map.panTo(center)}>
              {" "}
              <FaLocationArrow color="white" />{" "}
            </button>
          </div>

          <div className="distance-Calculator">
            {distance && <h3> Distance: {distance} </h3>}
          </div>
        </div>
        <div className="map-main">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={15}
              onLoad={(map) => {
                setMap(map);
              }}
            >
              <Marker position={center} />
              {directionResponse && (
                <DirectionsRenderer directions={directionResponse} />
              )}
              <DirectionsRenderer directions={directionResponse} />
            </GoogleMap>
          ) : (
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
