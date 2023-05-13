const apiKey =
  "Ldsee6GjbpxFrAu4qKOwonE34T2S-XXvGBr_m4-k-nRInECuTdwFrif93xWUlw4x56BNXCZRkPcuMjEAzwTO9NzNAxvPIsEHo1E6kytt3-Pf7q3Zf7C9o_K1Z4ZdZHYx";

const handler = async (req, res) => {
  const { location } = req.query;

  const apiUrl = `https://api.yelp.com/v3/businesses/search?location=${location}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

export default handler;

// const apiKey =
//   "Ldsee6GjbpxFrAu4qKOwonE34T2S-XXvGBr_m4-k-nRInECuTdwFrif93xWUlw4x56BNXCZRkPcuMjEAzwTO9NzNAxvPIsEHo1E6kytt3-Pf7q3Zf7C9o_K1Z4ZdZHYx";

// const API_BASE_URL = "https://cors-anywhere.herokuapp.com/";

// const getRestaurant = async (location) => {
//   const apiUrl = `${API_BASE_URL}https://api.yelp.com/v3/businesses/search?location=${location}`;

//   return fetch(apiUrl, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${apiKey}`,
//     },
//   }).then((response) => response.json());
// };

// export default getRestaurant;
