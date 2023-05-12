const fetch = require("node-fetch");

const apiKey =
  "Ldsee6GjbpxFrAu4qKOwonE34T2S-XXvGBr_m4-k-nRInECuTdwFrif93xWUlw4x56BNXCZRkPcuMjEAzwTO9NzNAxvPIsEHo1E6kytt3-Pf7q3Zf7C9o_K1Z4ZdZHYx";

const API_BASE_URL = "https://cors-anywhere.herokuapp.com/";

const getRestaurant = async (location) => {
  const apiUrl = `${API_BASE_URL}https://api.yelp.com/v3/businesses/search?location=${location}`;

  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      Origin: "localhost",
      withCredentials: true,
    },
  }).then((response) => response.json());
};

export default getRestaurant;
