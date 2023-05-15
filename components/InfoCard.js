import Image from "next/legacy/image";
import styled from "styled-components";
import { Star, Reviews } from "@mui/icons-material";
import Link from "next/link";

const InfoCard = ({
  alias,
  categories,
  image_url,
  is_closed,
  location,
  rating,
  review_count,
  url,
  name,
}) => {
  return (
    <Container>
      <ImageContainer>
        <StyledImage src={image_url} alt="" layout="fill" objectFit="cover" />
      </ImageContainer>

      <InformationContainer>
        <NameContainer>
          <Link href={url} target="_blank">
            <TitleStyle>{name}</TitleStyle>
          </Link>
        </NameContainer>
        <p style={{ fontSize: 8 }}>
          {Object.entries(location.display_address)
            .map(([key, value]) => `${value}`)
            .slice(0, -1)
            .join(" ")
            .replace(/,/g, " ")}
        </p>
        <BottomInformation>
          {is_closed ? <Closed>Closed</Closed> : <Open>Open</Open>}
          <IconContainer>
            <RateContainer>
              <Star style={{ color: "yellow", fontSize: 22 }} />
              <p style={{ fontSize: 12 }}>{rating}</p>
            </RateContainer>

            <ReviewContainer>
              <Reviews style={{ fontSize: 16 }} />
              <p style={{ fontSize: 12 }}>{review_count}</p>
            </ReviewContainer>
          </IconContainer>
        </BottomInformation>
      </InformationContainer>
    </Container>
  );
};

export default InfoCard;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: solid 1px whitesmoke;
  padding: 25px;
  opacity: 1;
  transition: all 200ms ease-out;
  :hover {
    scale: 1.05;
    opacity: 90%;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 150px !important;
  height: 150px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10%;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100px !important;
    height: 100px !important;
  }
`;

const StyledImage = styled(Image)`
  /* width: 150px;
  height: 150px; */
`;

const InformationContainer = styled.div`
  width: 200px;
  margin-left: 10px;
`;

const NameContainer = styled.h5`
  margin-top: 10px;
  margin-bottom: -5px;
`;

const TitleStyle = styled.span`
  :hover {
    color: purple;
  }
`;

const BottomInformation = styled.div`
  display: flex;
  align-items: center;
`;

const Closed = styled.p`
  font-size: 12px;
  color: red;
  font-weight: bold;
`;

const Open = styled.p`
  font-size: 12px;
  color: green;
  font-weight: bold;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RateContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
`;

const ReviewContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
