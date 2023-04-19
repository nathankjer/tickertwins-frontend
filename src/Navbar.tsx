import React, { ReactNode } from "react";
import { AppBar, Toolbar, Typography, Box, Link } from "@mui/material";
import { styled } from "@mui/system";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

interface NavbarProps {
  children: ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={1} sx={{ bgcolor: "white", color: "black" }}>
        <Toolbar>
          <FlexBox>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Typography variant="h6" component="div" sx={{ color: "black", textDecoration: "none" }}>
                TickerTwins
              </Typography>
            </Link>
            {children}
          </FlexBox>
        </Toolbar>
      </AppBar>
    </Box>
  );
}