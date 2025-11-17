import { Center, Spinner } from "@chakra-ui/react";

export default function Loader() {
  return (
    <Center h="50vh">
      <Spinner size="xl" color="brand.500" />
    </Center>
  );
}
