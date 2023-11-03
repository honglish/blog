import {
  Card as ChakraCard,
  CardHeader,
  Heading,
  CardBody,
  Divider,
  Text,
} from "@chakra-ui/react";
import { Post } from "../../graphql/generated";

export const Card = ({ id, title, body }: Post) => (
  <ChakraCard key={id} variant="elevated" minH="150px">
    <CardHeader wordBreak="break-all">
      <Heading size="md">{title}</Heading>
    </CardHeader>
    <Divider />
    <CardBody>
      <Text textAlign="left" size="sm">
        {body}
      </Text>
    </CardBody>
  </ChakraCard>
);

export default Card;
