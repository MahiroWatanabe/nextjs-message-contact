import { Avatar, Button, IconButton } from "@mui/material";
import styled from "styled-components";
import {
  Chat,
  SearchOutlined,
  MoreVert,
  GroupAdd,
  Person,
  Restaurant,
  Flight,
} from "@mui/icons-material";
import EmailValidator from "email-validator";
import { auth, db } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import ChatUser from "./Chat";
import { useContext, useState } from "react";
import GroupChat from "./GroupChat";
import getRandomColor from "@/utils/getRandomColor";
import BooleanContext from "@/contexts/displayContext";
import { useRouter } from "next/router";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [changemode, setChangemode] = useState(true);
  const { displayright, toggleBooleanValue } = useContext(BooleanContext);
  const currentUrl = router.asPath;

  const useChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);

  const useGroupChatRef = db
    .collection("room")
    .where("users", "array-contains", user.email);

  const [chatSnapshot] = useCollection(useChatRef);
  const [chatGroupSnapshot] = useCollection(useGroupChatRef);

  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );

    if (!input) return null;
    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  // chatがある場合はtrueを返す
  const chatAlreadyExists = (recipientEmail) =>
    !!chatSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  const createGroupChat = () => {
    const input = prompt("Please enter email addresses separated by commas");
    const groupname = prompt("Please enter group name");
    if (!input) return null;
    const inputArray = input.split(",");
    if (!input || !groupname) return null;
    if (
      inputArray.every((input) => {
        return EmailValidator.validate(input) && input !== user.email;
      })
    ) {
      alert("All email addresses are valid.");
      db.collection("room").add({
        groupname: groupname,
        users: [...inputArray, user.email],
        iconColor: getRandomColor(),
      });
    } else {
      alert("Please enter valid email addresses.");
    }
  };

  const updatePath = () => {
    const urlWithoutQueryParam = currentUrl.split("?")[0];
    router.push({
      pathname: urlWithoutQueryParam,
    });
  };

  const handleRestaurant = () => {
    toggleBooleanValue();
    {
      displayright
        ? updatePath()
        : router.push({
            pathname: currentUrl,
            query: { service: "restaurant" },
          });
    }
  };

  const handleTrip = () => {
    toggleBooleanValue();
    {
      displayright
        ? updatePath()
        : router.push({
            pathname: currentUrl,
            query: { service: "trip" },
          });
    }
  };

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
        <IconsContainer>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchOutlined />
        <SearchInput placeholder="Search in chats" />
      </Search>
      <SideBarButton onClick={changemode ? createChat : createGroupChat}>
        Start a new chat
      </SideBarButton>
      <SideBarGroupButton onClick={() => setChangemode(!changemode)}>
        <div style={{ paddingRight: "6px" }}>
          {changemode ? <GroupAdd /> : <Person />}
        </div>
        Change {changemode ? "group chat" : "private chat"}
      </SideBarGroupButton>
      {changemode
        ? chatSnapshot?.docs.map((chat) => (
            <ChatUser key={chat.id} id={chat.id} users={chat.data().users} />
          ))
        : chatGroupSnapshot?.docs.map((chat) => (
            <GroupChat
              key={chat.id}
              id={chat.id}
              name={chat.data().groupname}
              users={chat.data().users}
              iconColor={chat.data().iconColor}
            />
          ))}
      <SubApps>
        <SubAppsTitle>Service</SubAppsTitle>
        <IconButton className="subapps">
          <Restaurant onClick={() => handleRestaurant()} />
        </IconButton>
        <IconButton className="subapps">
          <Flight onClick={() => handleTrip()} />
        </IconButton>
      </SubApps>
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  position: relative;
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 250px;
  max-width: 300px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const SideBarButton = styled(Button)`
  width: 100%;
  /* &&&で優先度を上げる */
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
    :hover {
      background-color: #d9d9d9;
    }
  }
`;

const SideBarGroupButton = styled(Button)`
  width: 100%;
  /* &&&で優先度を上げる */
  &&& {
    display: flex;
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
    :hover {
      background-color: #d9d9d9;
    }
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
  padding-left: 5px;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  margin: 10px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;

const SubApps = styled.div`
  position: absolute;
  bottom: 0%;
  width: 100%;
  height: 25%;
  background-color: whitesmoke;
  border: solid 1px #d1d1d1;
  padding-left: 10px;
`;

const SubAppsTitle = styled.h2`
  margin-bottom: 5px;
  text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);
`;
