import { createStandaloneToast } from "@chakra-ui/react";
import { runInAction, makeAutoObservable, reaction } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { Post } from "../graphql/generated";
import { Status } from "../components/badge/Badge";
import { client } from "../api/client";
import { CREATE_POSTS } from "../api/mutation";

const { toast } = createStandaloneToast();

export interface QueuedPost extends Post {
  status?: Status;
}

export interface QueuedList {
  [key: string]: QueuedPost;
}

export class BlogsStore {
  queuedBlogs: QueuedList = {};
  totalQueued: number = 0;
  progressBarStatus: number = 0;
  showProgressBar: boolean = false;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.queuedBlogs,
      () => {
        this.getTotalQueued();
      }
    );

    reaction(
      () => this.progressBarStatus,
      () => {
        if (this.totalQueued <= this.progressBarStatus) {
          setTimeout(() => {
            this.clearProgress();
          }, 1000);
        }
        this.getTotalQueued();
      }
    );
  }

  getTotalQueued() {
    runInAction(
      () =>
        (this.totalQueued = Object.values(this.queuedBlogs).filter(
          ({ status }) => status === Status.Queued
        ).length)
    );
  }

  setQueuedBlogs(value: Post) {
    runInAction(
      () => (this.queuedBlogs = { ...this.queuedBlogs, [uuidv4()]: value })
    );
  }

  setQueuedStatus(id: string, status: Status) {
    runInAction(
      () => (this.queuedBlogs[id] = { ...this.queuedBlogs[id], status: status })
    );
  }

  setProgressBarStatus(count: number) {
    runInAction(
      () => (this.progressBarStatus = (count / this?.totalQueued) * 100 || 0)
    );
  }

  removeFromQueue(id: string) {
    runInAction(() => delete this?.queuedBlogs[id]);
  }

  clearProgress() {
    runInAction(() => {
      this.showProgressBar = false;
      this.setProgressBarStatus(0);
    });
  }

  processQueue = async () => {
    runInAction(() => (this.showProgressBar = true));
    let count = 1;
    for (const [id, { title, body, status }] of Object.entries(
      this?.queuedBlogs as Record<string, QueuedPost>
    )) {
      try {
        this.setProgressBarStatus(count);
        if (status === Status.Queued) {
          const { data } = await client.mutate({
            variables: { input: { title, body } },
            mutation: CREATE_POSTS,
          });
          await this.setQueuedStatus(id, Status.Uploaded);
          toast({
            title: `Blog post ${data?.createPost?.title} has been uploaded!`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          this.setProgressBarStatus(count++);
        }
      } catch (error) {
        await this.setQueuedStatus(id, Status.Error);
      }
    }
  };
}
const blogStore = new BlogsStore();

export default blogStore;
