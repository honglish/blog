import { useState } from "react";
import { Grid, Skeleton, SimpleGrid } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../../../api/query";
import { Post } from "../../../graphql/generated";
import { Pagination } from "../../../components/pagination/Pagination";
import { Card } from "../../../components/card/Card";

const limitPage = 4;

export const PostsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { page: currentPage, limit: limitPage },
  });
  if (error) return <Grid>Error: {error.message}</Grid>;

  const posts = data?.posts?.data;
  const totalPages = Math.ceil(data?.posts?.meta?.totalCount / limitPage);

  return (
    <Grid gap="16px" templateRows="minmax(800px, 1fr) auto">
      <SimpleGrid spacing={4} fontSize="sm">
        {loading ? (
          <Grid gap="16px" templateRows={`repeat(${limitPage}, 1fr)`}>
            {Array.from({ length: limitPage }, (_, index) => (
              <Skeleton key={index} />
            ))}
          </Grid>
        ) : (
          posts?.map((rest: Post) => (
            <div key={rest?.id}>
              <Card {...rest} />
            </div>
          ))
        )}
      </SimpleGrid>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Grid>
  );
};

export default PostsSection;
