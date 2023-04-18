import React from "react";
import { AppBar, Toolbar, Typography, Box, Link } from "@mui/material";
import { styled } from "@mui/system";
import SearchTicker from '../src/SearchTickers';

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export default function Navbar() {
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
            <SearchTicker />
          </FlexBox>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
