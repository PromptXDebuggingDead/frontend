import {
  Box,
  Button,
  Tooltip,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  useToast,
  Spinner,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ChatLoading from "./ChatLoading";
// import UserListItem from "../userAvatar/UserListItem";
import { setSelectedChat, setChats } from "../../redux/features/chatSlice";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChats, setLoadingChats] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { chats } = useSelector((state) => state.chat);

  const handleSearch = async () => {
    if (!search) {
      toast({ title: "Please enter a search term", status: "warning", duration: 3000 });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({ title: "Error fetching results", status: "error", duration: 3000 });
    }
  };

  const accessChat = async (userID) => {
    try {
      setLoadingChats(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.post("/api/chat/", { userID }, config);
      if (!chats.find((c) => c._id === data._id)) {
        dispatch(setChats([data, ...chats]));
      }
      dispatch(setSelectedChat(data));
      setLoadingChats(false);
    } catch (error) {
      setLoadingChats(false);
      toast({ title: "Error accessing chat", status: "error", duration: 3000 });
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" bg="white" w="100%" p={4}>
      <Tooltip label="Search users to chat">
        <Button variant="ghost" onClick={onOpen}>
          <i className="fas fa-search"></i>
          <Text display={{ base: "none", md: "flex" }} px="4">
            Search User
          </Text>
        </Button>
      </Tooltip>

      <Text fontSize="2xl" fontFamily="Work sans">Talk-A-Tive</Text>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input placeholder="Search here..." value={search} onChange={(e) => setSearch(e.target.value)} />
              <Button onClick={handleSearch}>GO</Button>
            </Box>
            {loading ? <ChatLoading /> : searchResult.map((usr) => (
              // <UserListItem key={usr._id} user={usr} handleFunction={() => { accessChat(usr._id); onClose(); }} />
              <></>
            ))}
            {loadingChats && <Spinner />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default SideDrawer;