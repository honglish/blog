import { Badge as ChakraBadge } from "@chakra-ui/react";

export enum Status {
  Queued = "queued",
  Uploaded = "uploaded",
  Error = "error",
}

export type BadgeProps = {
  status: Status;
};

export const Badge = ({ status }: BadgeProps) => {
  let badgeColor = "yellow";
  switch (status) {
    case Status.Uploaded:
      badgeColor = "green";
      break;
    case Status.Queued:
      badgeColor = "yellow";
      break;
    case Status.Error:
      badgeColor = "red";
      break;
    default:
      badgeColor = "yellow";
  }
  return (
    <ChakraBadge
      colorScheme={badgeColor}
      variant="solid"
      h="20px"
      borderRadius="8px"
    >
      {status}
    </ChakraBadge>
  );
};

export default Badge;
