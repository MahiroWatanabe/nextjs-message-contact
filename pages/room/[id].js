import GroupChatScreen from "@/components/GroupChatScreen";
import Sidebar from "@/components/Sidebar";
import { BooleanProvider } from "@/contexts/displayContext";
import { db } from "@/firebase";
import Head from "next/head";
import styled from "styled-components";

const RoomChatPage = ({ chat, messages }) => {
  return (
    <BooleanProvider>
      <Container>
        <Head>
          <title>Group chat {chat.groupname}</title>
        </Head>
        <Sidebar />
        <ChatContainer>
          <GroupChatScreen chat={chat} messages={messages} />
        </ChatContainer>
      </Container>
    </BooleanProvider>
  );
};

export default RoomChatPage;

export const getServerSideProps = async (context) => {
  const ref = db.collection("room").doc(context.query.id);
  const messageRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messageRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
};

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
