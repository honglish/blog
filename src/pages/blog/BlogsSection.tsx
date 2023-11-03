import {
  Heading,
  Grid,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import FormSection from "../forms/FormSection";
import PostsSection from "../posts/current/PostsSection";
import QueuedSection from "../posts/queued/QueuedSection";

export const BlogsSection = () => {
  return (
    <Grid gap="16px" p="16px">
      <Heading>Blogs page</Heading>
      <Box>
        Feel free to add as many posts as you would like and don't forget to
        submit all your posts at the end!!
      </Box>
      <Grid templateColumns="minmax(500px, 1fr) 1fr" gap="24px">
        <FormSection />
        <Tabs isFitted borderRadius="8px" bgColor="gray.100">
          <TabList>
            <Tab>Queued Posts</Tab>
            <Tab>Current Posts</Tab>
          </TabList>
          <TabPanels overflowY="auto" h="650px">
            <TabPanel>
              <QueuedSection />
            </TabPanel>
            <TabPanel>
              <Heading mb="8px">Current Posts</Heading>
              <PostsSection />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Grid>
    </Grid>
  );
};

export default BlogsSection;
