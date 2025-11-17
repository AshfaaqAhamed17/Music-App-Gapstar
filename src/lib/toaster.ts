import { createToaster } from "@chakra-ui/react";

export const toaster = createToaster({
  placement: "bottom-start",
  pauseOnPageIdle: true,
  duration: 1200,
  overlap: false,
});
