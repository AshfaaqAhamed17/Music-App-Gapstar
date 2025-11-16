import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Box, Flex, VStack, Text, Input, Button } from "@chakra-ui/react";
import React, { useState } from "react";

import {
  Home as HomeIcon,
  User as UserIcon,
  MicVocal as MicVocalIcon,
  Star as StarIcon,
  GalleryHorizontalEnd as GalleryHorizontalEndIcon,
  ChevronLeft,
} from "lucide-react";

const routes = [
  { label: "Home", to: "/", icon: HomeIcon },
  { label: "Favourites", to: "/favourites", icon: StarIcon },
  { label: "Album", to: "/album", icon: GalleryHorizontalEndIcon },
  { label: "Artist", to: "/artist", icon: MicVocalIcon },
];

export default function Layout({
  children,
}: React.PropsWithChildren<Record<string, unknown>>) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function doSearch() {
    const q = (query || "").trim();
    if (!q) return;
    navigate(
      `/search?q=${encodeURIComponent(q)}&type=${encodeURIComponent("scope")}`
    );
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
        as="nav"
        m="4"
        w={{ base: "full", md: "52" }}
        p={{ base: 4, md: 2 }}
        bg="bg.subtle"
        display={{ base: "none", md: "block" }}
        borderRadius="4xl"
        border="1px solid"
        borderColor="border.default"
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
              mr={3}
              border="1px solid"
              borderColor="border.default"
              borderRadius="full"
              backgroundColor="bg.subtle"
              variant="ghost"
            >
              <ChevronLeft size={18} />
            </Button>

            {/* Centered search */}
            <Box flex="1" display="flex" justifyContent="center">
              <Input
                maxW={{ base: "full", md: "500px" }}
                border="1px solid"
                borderColor="border.default"
                backgroundColor="bg.subtle"
                _focus={{
                  border: "2px solid",
                  borderColor: "primary",
                }}
                borderRadius="full"
                placeholder={`Search ${"scope"}...`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") doSearch();
                }}
              />
            </Box>

            {/* Profile button */}
            <Button
              aria-label="Profile"
              border="1px solid"
              backgroundColor="bg.subtle"
              borderColor="border.default"
              onClick={() => navigate("/profile")}
              borderRadius="full"
              ml={3}
              variant="ghost"
            >
              <UserIcon size={18} />
            </Button>
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
        borderTopWidth="1px"
        borderColor="border.default"
        py={2}
        px={2}
        justifyContent="space-around"
        alignItems="center"
        height="64px"
      >
        {routes.map((r) => {
          const Icon = r.icon;
          return (
            <NavLink key={r.to} to={r.to} end>
              {({ isActive }) => (
                <VStack
                  as="div"
                  gap={0}
                  align="center"
                  justify="center"
                  cursor="pointer"
                  color={isActive ? "primary" : "text"}
                  _hover={{ color: isActive ? "primary" : "muted.700" }}
                >
                  {Icon && <Icon size={18} />}
                  <Text fontSize="xs" mt="1">
                    {r.label}
                  </Text>
                </VStack>
              )}
            </NavLink>
          );
        })}
      </Box>
    </Flex>
  );
}
