import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Sidebar,
  Search,
  ConversationList,
  Conversation,
  Avatar,
  ConversationHeader,
  VoiceCallButton,
  InfoButton,
  TypingIndicator,
  MessageSeparator,
  ExpansionPanel,
  VideoCallButton,
  Button,
} from "@chatscope/chat-ui-kit-react";
import { useContext, useState } from "react";
import { LogoutOutlined } from "@mui/icons-material";
import { auth, signOut } from "../config/db/firebase";
import User from "../context/user";

function Chat() {
  const user = useContext(User)
  console.log(user);
  const signout = () => {
    signOut(auth)
      .then(() => {
        console.log("Signout");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const colorArr = ["FF5733", "33FF57", "5733FF", "FFD700", "00CED1"];
  const [messageInputValue, setMessageInputValue] = useState("");
  return (
    <div
      style={{
        height: "600px",
        position: "relative",
      }}
    >
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false}>
          <Search placeholder="Search..." /> <Button onClick={()=>signout()}><LogoutOutlined/></Button>
          <ConversationList>
            <Conversation
              name="Lilly"
              lastSenderName="Lilly"
              info="Yes i can do it for you"
            >
              <Avatar
                src={`https://ui-avatars.com/api/?background=random&color=fff&name=lilly+Ico`}
                name="Lilly"
                status="available"
              />
            </Conversation>
            <Conversation
              name="Lilly"
              lastSenderName="Lilly"
              info="Yes i can do it for you"
            >
              <Avatar
                src={`https://ui-avatars.com/api/?background=random&color=fff&name=eilly+Ico`}
                name="Lilly"
                status="available"
              />
            </Conversation>

          </ConversationList>
        </Sidebar>

        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar
              src={`https://ui-avatars.com/api/?background=random&color=fff&name=zoe+Ico`}
              name="Zoe"
            />
            <ConversationHeader.Content
              userName="Zoe"
              info="Active 10 mins ago"
            />
            <ConversationHeader.Actions>
              <VoiceCallButton />
              <VideoCallButton />
              <InfoButton />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList
            typingIndicator={<TypingIndicator content="Zoe is typing" />}
          >
            <MessageSeparator content="Saturday, 30 November 2019" />

            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "incoming",
                position: "single",
              }}
            >
              <Avatar
                src={`https://ui-avatars.com/api/?background=random&color=fff&name=zoe+Ico`}
                name="Zoe"
              />
            </Message>

          </MessageList>
          <MessageInput
            placeholder="Type message here"
            value={messageInputValue}
            onChange={(val) => setMessageInputValue(val)}
            onSend={() => setMessageInputValue("")}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default Chat;
