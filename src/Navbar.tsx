import React, { ReactNode } from "react";
import { AppBar, Toolbar, Typography, Box, Link, useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/system";
import SearchTicker from './SearchTickers';
import { useRouter } from 'next/router';

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export default function Navbar() {
  const router = useRouter();
  const isHomePage = router.pathname === '/';
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={1} sx={{ bgcolor: "white", color: "black" }}>
        <Toolbar>
          <FlexBox>
            {(isMobile && isHomePage) || !isMobile ? (
              <Link href="/" style={{ textDecoration: "none" }}>
                <Typography variant="h6" component="div" sx={{ color: "black", textDecoration: "none" }}>
                  TickerTwins
                </Typography>
              </Link>
            ) : null}
            {!isHomePage && (
              <SearchTicker sx={{
                ...(isMobile ? { marginLeft: "auto", marginRight: "auto" } : { textAlign: "left" })
              }} />
            )}
          </FlexBox>
        </Toolbar>
      </AppBar>
    </Box>
  );
}