import { auth } from "@/firebase";
import { Avatar } from "@mui/material";
import moment from "moment/moment";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";

const Message = ({ user, message }) => {
  const [userLoggedIn] = useAuthState(auth);
  const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;
  return (
    <Container>
      <TypeOfMessage>
        <UserInfomation>
          <UserImage>
            <Avatar src={message.photoURL} sx={{ width: 24, height: 24 }} />
          </UserImage>
          <UserName>{user}</UserName>
        </UserInfomation>
        {message.message}
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </Timestamp>
      </TypeOfMessage>
    </Container>
  );
};

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;
`;

const Reciever = styled(MessageElement)`
  text-align: left;
  background-color: whitesmoke;
`;

const Timestamp = styled.span`
  color: gray;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`;

const UserName = styled.p`
  color: gray;
  font-size: 9px;
`;

const UserInfomation = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const UserImage = styled.div`
  padding-right: 5px;
`;
