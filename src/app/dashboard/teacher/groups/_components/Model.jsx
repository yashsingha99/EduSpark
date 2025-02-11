"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import {
  Button,
  Dialog,
  Flex,
  Switch,
  Text,
  TextField,
} from "@radix-ui/themes";
import { Spinner } from "@/components/spinner";
// 
// const Model = ({ isOpen, onClose }) => {
const Model = ( { children }) => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [name, setName] = useState("");
  const [enableChat, setEnableChat] = useState(true);
  const [allowParticipation, setAllowParticipation] = useState(true);
  const [section, setSection] = useState("");

  const handleCreateGroup = async () => {
    setLoading(true);
    // await createGroup(groupName, description);
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle group creation logic here
    onClose();
  };

  return (
    <Dialog.Root>
       <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Create new Group</Dialog.Title>
        <Flex direction="column" gap="4" mt="4">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Group Name
            </Text>
            <TextField.Input
              type="text"
              placeholder="abcd-1234"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Select Section
            </Text>
            <TextField.Input
              type="text"
              placeholder="Roger Dunn"
              value={section}
              onChange={(e) => setSection(e.target.value)}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Description
            </Text>
            <TextField.Input
              type="text"
              placeholder="Roger Dunn"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </Flex>

        <Flex gap="3" mt="6" justify="end">
          <Dialog.Close>
            <Button
              variant="soft"
              color="gray"
              // onClick={() => {
              //   setRoomName("");
              //   setName("");
              //   setEnableChat(true);
              //   setAllowParticipation(true);
              // }}
            >
              Cancel
            </Button>
          </Dialog.Close>
          <Button size={"3"}
          disabled={!(groupName && section && description) || loading} >
            {loading ? (
              <Flex gap="2" align="center">
                <Spinner />
                <Text>Creating...</Text>
              </Flex>
            ) : (
              "Create"
            )}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Model;
