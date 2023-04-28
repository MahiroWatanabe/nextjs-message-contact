import { Avatar, Button, IconButton } from "@mui/material";
import styled from "styled-components";
import { Chat, SearchOutlined } from "@mui/icons-material";
import { MoreVert } from "@mui/icons-material";
import * as EmailValidator from "email-validate";

const Sidebar = () => {
  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );

    if (!input) return null;
    if (EmailValidator.validate(input)) {
    }
  };
  return (
    <Container>
      <Header>
        <UserAvatar />
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
      <SideBarButton onClick={createChat}>Start a new chat</SideBarButton>
    </Container>
  );
};

export default Sidebar;

const Container = styled.div``;

const SideBarButton = styled(Button)`
  width: 100%;
  /* &&&で優先度を上げる */
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
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
