"use client";
 
import { Spinner } from "@/components/spinner";

import PageTitle from "@/components/page-title";
// import { Button } from '@/components/ui/button'
import {
  Box,
  Button,
  Dialog,
  Flex,
  Switch,
  Text,
  TextField,
} from "@radix-ui/themes";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mode } from "@mui/icons-material";
import { Info, Plus, Search } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Model from "./_components/model";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import CustomSiderTrigger from "../../_components/CustomSiderTrigger";

function page() {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [name, setName] = useState("");
  const [enableChat, setEnableChat] = useState(true);
  const [allowParticipation, setAllowParticipation] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("my-groups");
  const [filteredMyGroups, setFilteredMyGroups] = useState([]);
  const [suggestedGroups, setSuggestedGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <CustomSiderTrigger name={"Groups"} />
       
      <PageTitle title="Study Groups" />
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row">
        <div className="flex flex-1 gap-2">
          <TextField.Input
            size="3"
            pr="3"
            type="text"
            placeholder="Search Group..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <MagnifyingGlassIcon height="16" width="16" />

          <Box maxWidth="300px">
            <TextField.Root size="3" placeholder="Search the docs…" />
          </Box>
          {/* <TextField.Root placeholder="Search the docs…">
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root> */}
          {/* <Input
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          /> */}
          {/* <Button variant="secondary">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button> */}
        </div>
        
        <Model>
           <Button  onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Group
          </Button>
        </Model>
         
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="my-groups">My Groups</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
        </TabsList>
        <TabsContent value="my-groups" className="space-y-4">
          <ScrollArea className="h-full">
            {filteredMyGroups.length === 0 ? (
              <Card>
                <CardContent className="flex h-[200px] flex-col items-center justify-center space-y-4">
                  <Info className="h-8 w-8 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    You haven&apos;t joined any groups yet
                  </p>
                  <Button variant="secondary" asChild>
                    <Link href="/dashboard/groups?tab=discover">
                      Discover Groups
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {/* {filteredMyGroups.map((group) => (
                  <GroupCard key={group._id} group={group} action="view" />
                ))} */}
              </div>
            )}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="discover" className="space-y-4">
          <ScrollArea className="h-[600px] pr-4">
            {suggestedGroups.length === 0 ? (
              <Card>
                <CardContent className="flex h-[200px] flex-col items-center justify-center">
                  <Info className="h-8 w-8 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    No suggested groups available
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {/* {suggestedGroups.map((group) => (
                  <GroupCard key={group._id} group={group} action="join" />
                ))} */}
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
    
  );
}

export default page;
