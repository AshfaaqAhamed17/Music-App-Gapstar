import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  VStack,
  Text,
  Input,
  Button,
  InputGroup,
  Popover,
  Portal,
  Avatar,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";

import {
  Home as HomeIcon,
  MicVocal as MicVocalIcon,
  Star as StarIcon,
  GalleryHorizontalEnd as GalleryHorizontalEndIcon,
  ChevronLeft,
  Search,
} from "lucide-react";

const routes = [
  { label: "Home", to: "/", icon: HomeIcon },
  { label: "Favourites", to: "/favourites", icon: StarIcon },
  { label: "Albums", to: "/album", icon: GalleryHorizontalEndIcon },
  { label: "Artists", to: "/artist", icon: MicVocalIcon },
];

export default function Layout({
  children,
}: React.PropsWithChildren<Record<string, unknown>>) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // Debounce settings
  const DEBOUNCE_MS = 500;
  const MIN_QUERY_LENGTH = 2;
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced navigation on query change (search executes on change after debounce)
  useEffect(() => {
    // clear any existing timer
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }

    const q = (query || "").trim();
    if (!q || q.length < MIN_QUERY_LENGTH) {
      // do not navigate/search for very short queries
      return;
    }

    debounceRef.current = setTimeout(() => {
      navigate(`/search?q=${encodeURIComponent(q)}`);
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    };
  }, [query, navigate]);

  function doSearch() {
    const q = (query || "").trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}}`);
  }

  return (
    <Flex
      minH="100vh"
      direction={{ base: "column", md: "row" }}
      bg="bg.surface"
      color="text"
    >
      {/* Sidebar */}
      <Box
        h="96vh"
        as="nav"
        m="4"
        w={{ base: "full", md: "52" }}
        p={{ base: 4, md: 2 }}
        bg="bg.subtle"
        display={{ base: "none", md: "block" }}
        borderRadius="4xl"
        border="1px solid"
        borderColor="border.default"
        position="sticky"
        top={4}
        zIndex={1}
      >
        <VStack align="stretch">
          {routes.map((r) => {
            const Icon = r.icon;

            return (
              <NavLink key={r.to} to={r.to} end>
                {({ isActive }) => (
                  <Box
                    py="2"
                    px="4"
                    borderRadius="full"
                    cursor="pointer"
                    transition="all 0.2s ease"
                    bg={isActive ? "bg.selected" : "transparent"}
                    color={isActive ? "primary" : "text"}
                    _hover={{
                      bg: "bg.selected",
                    }}
                  >
                    <Flex align="center" gap="3">
                      {Icon && <Icon size={20} />}
                      <Text fontWeight={isActive ? "bold" : "medium"}>
                        {r.label}
                      </Text>
                    </Flex>
                  </Box>
                )}
              </NavLink>
            );
          })}
        </VStack>
      </Box>

      {/* Main Content */}
      <Box w="full" px={{ base: 4, md: 6 }} py={4} pb={{ base: 20, md: 4 }}>
        <Box mb={10}>
          <Flex w="full" align="center">
            {/* Back button */}
            <Button
              aria-label="Back"
              onClick={() => navigate(-1)}
              border="1px solid"
              borderColor="border.default"
              borderRadius="full"
              backgroundColor="bg.subtle"
              variant="ghost"
              zIndex={10}
              p={0}
              boxSize="48px"
            >
              <ChevronLeft size={24} />
            </Button>

            {/* Centered search */}
            <Box flex="1" display="flex" justifyContent="center" zIndex={10}>
              <Box w-="full">
                <InputGroup
                  startElement={<Search />}
                  w={{ base: "full", md: "500px" }}
                  h="48px"
                >
                  <Input
                    border="1px solid"
                    borderColor="border.default"
                    backgroundColor="bg.subtle"
                    _focus={{
                      border: "2px solid",
                      borderColor: "primary",
                    }}
                    borderRadius="full"
                    placeholder={`Search for a song, album or artist`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") doSearch();
                    }}
                    h="48px"
                  />
                </InputGroup>
              </Box>
            </Box>

            {/* Profile button */}
            <Popover.Root>
              <Popover.Trigger asChild>
                <Button
                  aria-label="Profile"
                  border="1px solid"
                  backgroundColor="bg.subtle"
                  borderColor="border.default"
                  borderRadius="full"
                  variant="ghost"
                  zIndex={10}
                  p={0}
                  boxSize="48px"
                >
                  <Avatar.Root shape="full" boxSize="40px">
                    <Avatar.Fallback name="Random User" />
                    <Avatar.Image src="https://picsum.photos/seed/artist1/300/300" />
                  </Avatar.Root>
                </Button>
              </Popover.Trigger>
              <Portal>
                <Popover.Positioner>
                  <Popover.Content>
                    <Popover.Arrow />
                    <Popover.Body>
                      <VStack
                        alignItems="center"
                        gap={6}
                        p={6}
                        bg="bg.surface"
                        borderRadius="lg"
                      >
                        <Avatar.Root shape="full" boxSize="60px">
                          <Avatar.Fallback name="Random User" />
                          <Avatar.Image src="https://picsum.photos/seed/artist1/300/300" />
                        </Avatar.Root>
                        <VStack align="center" gap={2}>
                          <Text fontWeight="semibold" fontSize="md">
                            Ashfaaq Ahamed
                          </Text>
                          <Text color="muted" fontSize="sm">
                            ashfaaqahamed17@gmail.com
                          </Text>
                        </VStack>
                      </VStack>
                    </Popover.Body>
                  </Popover.Content>
                </Popover.Positioner>
              </Portal>
            </Popover.Root>
          </Flex>
        </Box>

        {children ?? <Outlet />}
      </Box>

      {/* Mobile bottom app bar */}
      <Box
        display={{ base: "flex", md: "none" }}
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        zIndex="overlay"
        bg="bg.subtle"
        borderRadius="full"
        border="1px solid"
        borderColor="border.default"
        py={2}
        px={2}
        m={4}
        alignItems="center"
        height="64px"
      >
        {routes.map((r) => {
          const Icon = r.icon;
          return (
            <Box w="full">
              <NavLink key={r.to} to={r.to} end>
                {({ isActive }) => (
                  <VStack
                    as="div"
                    gap={0}
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    fontWeight={isActive ? "semibold" : "normal"}
                    color={isActive ? "primary" : "text"}
                    bg={isActive ? "bg.selected" : "transparent"}
                    borderRadius="full"
                    py={2}
                  >
                    {Icon && <Icon size={18} />}
                    <Text fontSize="xs" mt="1">
                      {r.label}
                    </Text>
                  </VStack>
                )}
              </NavLink>
            </Box>
          );
        })}
      </Box>
    </Flex>
  );
}
