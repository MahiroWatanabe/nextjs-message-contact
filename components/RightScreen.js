import BooleanContext from "@/contexts/displayContext";
import { useContext, useState } from "react";
import styled from "styled-components";
import { Close, Search } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import getRestaurant from "@/pages/api/restaurant";
import InfoCard from "./InfoCard";
import { useRouter } from "next/router";

const RightScreen = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const { displayright, toggleBooleanValue } = useContext(BooleanContext);
  const [restaurants, setRestaurants] = useState([]);

  const handleSearch = async (location) => {
    // const results = await getRestaurant(location);
    // setRestaurants(results.businesses);
    try {
      const response = await fetch(`/api/restaurant?location=${location}`);
      if (response.ok) {
        const data = await response.json();
        setRestaurants(data.businesses);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error(error);
    }
    setLocation("");
  };

  const handleClose = () => {
    const currentUrl = router.asPath;
    const urlWithoutQueryParam = currentUrl.split("?")[0];
    toggleBooleanValue();
    router.push({
      pathname: urlWithoutQueryParam,
    });
  };

  return (
    displayright && (
      <Container>
        <IconContainer>
          <RestaurantTitle>Restaurant</RestaurantTitle>
          <CloseIconButton>
            <CloseIcon
              onClick={() => handleClose()}
              style={{ fontSize: "30px" }}
            />
          </CloseIconButton>
        </IconContainer>

        <EnterInformation>
          <InputInformation
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search location"
          />
          <IconButton
            onClick={() => {
              handleSearch(location);
            }}
          >
            <Search />
          </IconButton>
        </EnterInformation>
        <hr style={{ borderColor: "#fafafa" }} />
        <RestaurantInformation>
          {Object?.entries(restaurants).map(([key, restaurant]) => (
            <InfoCard key={restaurant.alias} {...restaurant} />
          ))}
        </RestaurantInformation>
      </Container>
    )
  );
};

export default RightScreen;

const Container = styled.div`
  min-width: 400px;
  max-width: 450px;
  height: 100vh;
  position: relative;
  overflow-y: scroll;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 10px;
`;

const RestaurantTitle = styled.h2`
  text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);
`;

const CloseIconButton = styled(IconButton)`
  cursor: pointer;
`;

const CloseIcon = styled(Close)``;

const InputInformation = styled.input`
  outline: none;
  border: none;
`;

const EnterInformation = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px black;
  border-radius: 9999px;
  padding: 5px 10px;
  margin: 0 auto;
  margin-bottom: 30px;
`;

const RestaurantInformation = styled.div`
  display: flex;
  flex-direction: column;
`;
