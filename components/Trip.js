import BooleanContext from "@/contexts/displayContext";
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { useContext } from "react";
import styled from "styled-components";

const Trip = () => {
  const router = useRouter();
  const { displayright, toggleBooleanValue } = useContext(BooleanContext);

  const handleClose = () => {
    const currentUrl = router.asPath;
    const urlWithoutQueryParam = currentUrl.split("?")[0];
    toggleBooleanValue();
    router.push({
      pathname: urlWithoutQueryParam,
    });
  };

  return (
    <Container>
      <IconContainer>
        <RestaurantTitle>Trip</RestaurantTitle>
        <CloseIconButton>
          <CloseIcon
            onClick={() => handleClose()}
            style={{ fontSize: "30px" }}
          />
        </CloseIconButton>
      </IconContainer>
    </Container>
  );
};

export default Trip;

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
