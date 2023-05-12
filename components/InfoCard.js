import Image from "next/legacy/image";
import styled from "styled-components";

const InfoCard = ({
  alias,
  categories,
  image_url,
  is_closed,
  location,
  rating,
  review_count,
  url,
}) => {
  return (
    <Container>
      <ImageContainer>
        <Image
          src={image_url}
          alt=""
          width={100}
          height={100}
          layout="fill"
          objectFit="cover"
        />
      </ImageContainer>
      <InformationContainer></InformationContainer>
    </Container>
  );
};

export default InfoCard;

const Container = styled.div`
  display: flex;
  border-bottom: solid 1px whitesmoke;
  padding: 10px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InformationContainer = styled.div``;
