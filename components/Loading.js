import { Circle } from "better-react-spinkit";
import Image from "next/image";
import styled from "styled-components";

const Loading = () => {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <Load
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
          alt="Loading"
          width={200}
          height={200}
        />
        <Circle color="#3CBC2B" size={60} />
      </div>
    </center>
  );
};

export default Loading;

const Load = styled(Image)`
  margin-bottom: 10;
`;
