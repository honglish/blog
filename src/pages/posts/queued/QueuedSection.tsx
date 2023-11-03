import { observer } from "mobx-react";
import { Grid, Flex, Button, Progress, Text } from "@chakra-ui/react";
import { Card } from "../../../components/card/Card";
import { Badge } from "../../../components/badge/Badge";
import { useStores } from "../../../stores";

const QueuedSection = () => {
  const { blogsStore } = useStores();
  const { progressBarStatus, showProgressBar, queuedBlogs, totalQueued } =
    blogsStore;
  let noPostsQueued = Object.entries(queuedBlogs)?.length === 0;

  return (
    <Grid gap="16px">
      {noPostsQueued ? (
        <Text fontSize="sm">Add some posts and they will be queued up</Text>
      ) : (
        <Grid overflowY="scroll" maxH="570px" gap="16px" p="16px">
          {showProgressBar && (
            <Progress hasStripe mb="16px" value={progressBarStatus} />
          )}
          {Object.entries<Record<string, any>>(queuedBlogs)?.map(
            ([key, value]) => (
              <Grid key={key}>
                <Flex justifyContent="space-between" pb="8px">
                  <Flex gap="8px" alignItems="center" pb="8px">
                    Status: <Badge status={value?.status} />
                  </Flex>
                  <Button
                    variant="outline"
                    h="36px"
                    borderRadius="24px"
                    onClick={() => blogsStore?.removeFromQueue(key)}
                  >
                    x
                  </Button>
                </Flex>
                <Card {...value} />
              </Grid>
            )
          )}
        </Grid>
      )}
      <Button
        position="relative"
        bottom="0"
        colorScheme="teal"
        onClick={blogsStore?.processQueue}
        isDisabled={totalQueued === 0}
      >
        Submit Post(s)
      </Button>
    </Grid>
  );
};

export default observer(QueuedSection);
