import getRandomColor from "@/utils/getRandomColor";
import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import styled from "styled-components";

const GroupChat = ({ id, name, users, iconColor }) => {
  const router = useRouter();

  const enterGroupChat = () => {
    router.push(`/room/${id}`);
  };

  return (
    <Container onClick={enterGroupChat}>
      <UserAvatar sx={{ bgcolor: iconColor }}>{name[0]}</UserAvatar>
      <p>{name}</p>
    </Container>
  );
};

export default GroupChat;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-all;
  border-bottom: 1px solid #d6d6d6;

  :hover {
    background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
