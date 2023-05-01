import { auth, db } from "@/firebase";
import { Avatar, IconButton } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { MoreVert, AttachFile } from "@mui/icons-material";
import { useCollection } from "react-firebase-hooks/firestore";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import getRecipientEmail from "@/utils/getRecipientEmail";
import TimeAgo from "timeago-react";

const ChatScreen = ({ chat, messages }) => {
  const [user] = useAuthState(auth);

  //相手のuserの情報を取得
  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, user))
  );

  const recipient = recipientSnapshot?.docs?.[0].data();
  const recipientEmail = getRecipientEmail(chat.users, user);

  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient?.photoURL} />
        ) : (
          <Avatar>{recipientEmail[0]}</Avatar>
        )}
        <HeaderIcons>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </HeaderIcons>
      </Header>
    </Container>
  );
};

export default ChatScreen;

const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderIcons = styled.div``;
