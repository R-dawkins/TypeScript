import axios from "axios";
const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;
const GOOGLE_API_KEY = "";

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

console.log(google);

function serachAddressHandler(event: Event) {
  event.preventDefault();
  const enterdAddress = addressInput.value;

  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enterdAddress
      )}&key=${GOOGLE_API_KEY}&language=ko`
    )
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location ");
      }
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map")!, {
        center: coordinates,
        zoom: 8,
      });
      console.log(coordinates);
      new google.maps.Marker({
        map: map,
        position: coordinates,
      });
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener("submit", serachAddressHandler);
