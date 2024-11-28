import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Description from "../section/Description";
import CusButton from "../section/button";

// Array of top 25 suburbs of Melbourne
export const melbourneSuburbs = [
  "Abbotsford",
  "Airport West",
  "Alphington",
  "Altona",
  "Altona Meadows",
  "Altona North",
  "Armadale",
  "Ashburton",
  "Aspendale",
  "Ascot Vale",
  "Balaclava",
  "Balwyn",
  "Balwyn North",
  "Bangholme",
  "Bayswater",
  "Beaconsfield",
  "Beaconsfield Upper",
  "Belgrave",
  "Belgrave Heights",
  "Bellfield",
  "Belmont",
  "Bentleigh",
  "Bentleigh East",
  "Blackburn",
  "Blackburn North",
  "Blackburn South",
  "Blakeville",
  "Boronia",
  "Boronia East",
  "Box Hill",
  "Box Hill North",
  "Box Hill South",
  "Brunswick",
  "Brunswick East",
  "Brunswick West",
  "Bulleen",
  "Bundoora",
  "Burwood",
  "Burwood East",
  "Camberwell",
  "Campbellfield",
  "Canada Bay",
  "Canterbury",
  "Carnegie",
  "Carlton",
  "Carlton North",
  "Caroline Springs",
  "Carrum",
  "Carrum Downs",
  "Caulfield",
  "Caulfield East",
  "Caulfield North",
  "Caulfield South",
  "Chelsea",
  "Chelsea Heights",
  "Cheltenham",
  "Cherrybrook",
  "Chirnside Park",
  "Clayton",
  "Clayton South",
  "Clifton Hill",
  "Coburg",
  "Coburg North",
  "Collingwood",
  "Coolaroo",
  "Corio",
  "Croydon",
  "Croydon Hills",
  "Dandenong",
  "Dandenong North",
  "Dandenong South",
  "Dingley Village",
  "Doncaster",
  "Doncaster East",
  "Donvale",
  "Doveton",
  "Dunkley",
  "Eaglemont",
  "East Melbourne",
  "Elsternwick",
  "Elwood",
  "Emerald",
  "Essendon",
  "Essendon North",
  "Everton",
  "Fairfield",
  "Ferntree Gully",
  "Fitzroy",
  "Fitzroy North",
  "Flemington",
  "Footscray",
  "Footscray East",
  "Forest Hill",
  "Frankston",
  "Frankston North",
  "Frankston South",
  "Glen Iris",
  "Glenroy",
  "Glen Waverley",
  "Glenroy East",
  "Greensborough",
  "Greythorn",
  "Hampton",
  "Hawthorn",
  "Hawthorn East",
  "Heidelberg",
  "Heidelberg West",
  "Highett",
  "Ivanhoe",
  "Ivanhoe East",
  "Keysborough",
  "Kew",
  "Kew East",
  "Kilsyth",
  "Kilsyth South",
  "Kensington",
  "Kooyong",
  "Laverton",
  "Lincoln",
  "Lower Plenty",
  "Malvern",
  "Malvern East",
  "Manga Hill",
  "Maribyrnong",
  "Maribyrnong West",
  "Maribyrnong East",
  "Maroondah",
  "Melbourne",
  "Middle Park",
  "Mill Park",
  "Mitcham",
  "Mont Albert",
  "Mont Albert North",
  "Mordialloc",
  "Mordialloc North",
  "Moorabbin",
  "Moorabbin East",
  "Moorabbin South",
  "Moonee Ponds",
  "Mornington",
  "Mornington Peninsula",
  "North Melbourne",
  "Northcote",
  "Northcote South",
  "Oakleigh",
  "Oakleigh East",
  "Oakleigh South",
  "Pascoe Vale",
  "Parkdale",
  "Parkville",
  "Point Cook",
  "Point Cook West",
  "Port Melbourne",
  "Preston",
  "Reservoir",
  "Richmond",
  "Richmond East",
  "Ringwood",
  "Ringwood East",
  "Ringwood North",
  "Ringwood South",
  "Rosanna",
  "Rowville",
  "Sandringham",
  "Seaford",
  "South Melbourne",
  "South Yarra",
  "Southbank",
  "Southbank West",
  "Springvale",
  "Springvale South",
  "St Kilda",
  "St Kilda East",
  "St Kilda West",
  "Sunbury",
  "Sunshine",
  "Sunshine North",
  "Surrey Hills",
  "Thornbury",
  "Toorak",
  "Truganina",
  "Upper Ferntree Gully",
  "Vermont South",
  "Viewbank",
  "West Footscray",
  "Werribee",
  "Werribee South",
  "Williamstown",
  "Windsor",
  "Woolamai",
  "Yarraville",
  // Add more suburbs as needed
];


const Form = () => {
  const [city, setCity] = useState("");
  const [suburb, setSuburb] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      // Check if access token exists in localStorage
      const accessToken = localStorage.getItem("accessToken");
      const id = localStorage.getItem("id");
      const role = localStorage.getItem("role");
      if (accessToken && id && role) {
        setIsLoggedIn(true);
        setUserData({ id, role });
      }
      setIsLoading(false); // Set isLoading to false after fetching data
    };

    fetchData();
  }, []);

  const handleSubmit = () => {
    // Validation
    if (
      // city.trim() === "" ||
      suburb.trim() === "" ||
      // postalCode.trim() === "" ||
      isNaN(postalCode)
    ) {
      alert("Please fill out all fields correctly.");
      return;
    }

    // Construct query string
    const queryString = `?location=${suburb}`;

    isLoggedIn?router.push(`/services${queryString}`):alert("You have to login to continue")

    // Navigate to "/service" route with query string
    ;
  };

  return (
    <div className="w-full flex justify-center py-10 lg:pt-[-10vh] lg:pb-[10vh]">
      <div className=" base:w-[90%] rounded-xl lg:rounded-full lg:w-[70%] bg-customwhite flex justify-center py-5 shadow-lg max-w-[1100px]">
        <div className="base:w-[90%] lg:w-[80%] grid lg:grid-cols-4 gap-6">
          {/* location */}
          <div className="flex flex-col gap-1">
            <Description text={"City"} />
            {/* <select
              className="input-class border-black border"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Select City</option>
              {citiesAustralia.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select> */}
            <input
              className="input-class border border-black"
              value={"Melbourne"}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Description text={"Suburb"} />
            {/* Suburb */}
            <select
              className="input-class border-black border"
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
            >
              <option className="input-class">Select Suburb</option>
              {melbourneSuburbs.map((suburb) => (
                <option className="input-class" key={suburb} value={suburb}>
                  {suburb}
                </option>
              ))}
            </select>
          </div>
          {/* Fuel Type  */}
          <div className="flex flex-col gap-1">
            <Description text={"Postal Code"} />
            <input
              className="input-class border-black border"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>

          <div className="flex justify-end w-full">
            {" "}
            <CusButton
              text={"Get Vendors"}
              type={"secondary"}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
