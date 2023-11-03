import { ChakraProvider, Box, createStandaloneToast } from "@chakra-ui/react";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
import { client } from "./api/client";
import BlogsSection from "./pages/blog/BlogsSection";
import { Provider } from "mobx-react";
import { stores } from "./stores";

const { ToastContainer } = createStandaloneToast();

export const App = () => (
  <ApolloHooksProvider client={client}>
    <Provider {...stores}>
      <ChakraProvider>
        <Box textAlign="center" fontSize="xl" bgColor="gray.200" h="100vh">
          <BlogsSection />
          <ToastContainer />
        </Box>
      </ChakraProvider>
    </Provider>
  </ApolloHooksProvider>
);
