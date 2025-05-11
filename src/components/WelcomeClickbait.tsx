"use client";

import CloseIcon from "@mui/icons-material/Close";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import HistoryIcon from "@mui/icons-material/History";
import {
  Box,
  Drawer,
  Fab,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
  Paper,
  alpha,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import WelcomeCat from "../assets/images/WelcomeCat.gif";
import type { Anime } from "../interfaces";
import { useAnimeStore } from "../store/animeStore";
import { welcomeClickbaitStyles } from "../styles";
import { AnimePreferenceCard } from "./AnimePreferenceCard";
import { PreferenceDropZone } from "./PreferenceDropZone";
import { HistoryAnimeCard } from "./HistoryAnimeCard";

/**
 * A floating widget that allows users to like/dislike anime via drag and drop
 */
export default function WelcomeClickbait() {
  // Get state and actions from the store
  const {
    likedAnime,
    dislikedAnime,
    animeToShow,
    isClickbaitVisible: isVisible,
    isDrawerOpen: drawerOpen,
    isDragging,
    activeTab,
    isLoading,
    error,
    getTopAnime,
    handleLike,
    handleDislike,
    setClickbaitVisible: setIsVisible,
    setDrawerOpen,
    setIsDragging,
    setActiveTab,
    setCurrentDragAnime,
    initializePreferences,
  } = useAnimeStore();

  // State for bounds
  const [bounds, setBounds] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

  // Refs and theme
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const buttonRef = useRef<HTMLDivElement>(null);

  // Drag handling for the floating button
  let isDragStart = false;
  let dragTimeout: NodeJS.Timeout;

  // Initialize preferences and fetch top anime when component mounts
  useEffect(() => {
    initializePreferences();
    getTopAnime(1);
  }, [getTopAnime, initializePreferences]);

  // Update bounds based on screen size
  useEffect(() => {
    const updateBounds = () => {
      setBounds({
        left: -window.innerWidth + 100,
        right: window.innerWidth - 100,
        top: 0,
        bottom: window.innerHeight - 100,
      });
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  // Draggable button handlers
  const handleStart = () => {
    dragTimeout = setTimeout(() => (isDragStart = true), 200);
  };

  const handleDrag = () => {
    if (isDragStart) setIsDragging(true);
  };

  const handleStop = () => {
    clearTimeout(dragTimeout);
    if (!isDragging) {
      handleClick();
    }
    isDragStart = false;
    setIsDragging(false);
  };

  const handleClick = () => {
    setDrawerOpen(true);
  };

  const handleClose = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDragStart = (anime: Anime) => {
    setCurrentDragAnime(anime);
  };

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Floating draggable button */}
      <Draggable
        bounds={bounds}
        nodeRef={buttonRef as React.RefObject<HTMLElement>}
        cancel='.close-button'
        onStart={handleStart}
        onDrag={handleDrag}
        onStop={handleStop}
      >
        <Box ref={buttonRef} sx={welcomeClickbaitStyles.catButton}>
          <IconButton
            className='close-button'
            onClick={handleClose}
            sx={welcomeClickbaitStyles.closeButton}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
          <Fab
            color='primary'
            aria-label='action button'
            sx={{
              background: `url(${WelcomeCat}) no-repeat center center`,
              ...welcomeClickbaitStyles.catFab(isMobile),
            }}
          />
        </Box>
      </Draggable>

      {/* Drawer content */}
      <Drawer
        anchor={isMobile ? "bottom" : "right"}
        open={drawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: welcomeClickbaitStyles.drawerPaper(isMobile),
        }}
      >
        {/* Close button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 2,
          }}
        >
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Navigation tabs */}
        <Box sx={{ width: "100%", mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant='fullWidth'
            sx={welcomeClickbaitStyles.tabs}
          >
            <Tab label='Discover' icon={<Box sx={{ mr: 1 }}>👀</Box>} iconPosition='start' />
            <Tab label='History' icon={<HistoryIcon sx={{ mr: 1 }} />} iconPosition='start' />
          </Tabs>
        </Box>

        {/* Tab content */}
        {activeTab === 0 ? (
          // Discover tab
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              overflow: "auto",
              padding: { xs: 1, sm: 2 },
              height: "calc(100% - 70px)",
            }}
          >
            <Typography
              variant='h6'
              sx={{
                textAlign: "center",
                fontWeight: 600,
                color: theme.palette.text.primary,
              }}
            >
              Drag anime cards to like or dislike
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ mb: 1, textAlign: "center", maxWidth: 400, mx: "auto" }}
            >
              Your preferences will be saved in local storage, I just wanted to know what you like
              :P
            </Typography>

            {/* Drop zones */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                boxSizing: "border-box",
                width: "100%",
              }}
            >
              <PreferenceDropZone
                id='dislike-zone'
                onDrop={handleDislike}
                color='#f44336'
                title='Dislike'
                icon={<ThumbDownIcon sx={{ fontSize: 28, color: "white" }} />}
              />
              <PreferenceDropZone
                id='like-zone'
                onDrop={handleLike}
                color='#2196f3'
                title='Like'
                icon={<ThumbUpIcon sx={{ fontSize: 28, color: "white" }} />}
              />
            </Box>

            {/* Anime cards */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                marginTop: 2,
                width: "100%",
              }}
            >
              {isLoading ? (
                <Typography>Loading anime...</Typography>
              ) : error ? (
                <Typography color='error'>{error}</Typography>
              ) : animeToShow.length > 0 ? (
                animeToShow.map((anime) => (
                  <AnimePreferenceCard
                    key={anime.mal_id}
                    anime={anime}
                    onDragStart={handleDragStart}
                  />
                ))
              ) : (
                <Paper elevation={0} sx={welcomeClickbaitStyles.noMoreAnime(theme)}>
                  <Typography variant='h6' gutterBottom>
                    All caught up!
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    You've gone through all the available anime. Check back later for more!
                  </Typography>
                </Paper>
              )}
            </Box>

            {/* Liked and disliked counts */}
            <Box sx={welcomeClickbaitStyles.countContainer(theme)}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ThumbDownIcon color='error' fontSize='small' />
                <Typography variant='body2' fontWeight='medium'>
                  {dislikedAnime.length} disliked
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ThumbUpIcon color='primary' fontSize='small' />
                <Typography variant='body2' fontWeight='medium'>
                  {likedAnime.length} liked
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          // History tab
          <Box sx={{ padding: 2, height: "calc(100% - 70px)", overflow: "auto" }}>
            {likedAnime.length === 0 && dislikedAnime.length === 0 ? (
              // Empty state
              <Box sx={welcomeClickbaitStyles.emptyState(theme)}>
                <Typography variant='h6' gutterBottom>
                  No History Yet
                </Typography>
                <Typography color='text.secondary'>
                  Your liked and disliked anime will appear here
                </Typography>
              </Box>
            ) : (
              // History content - Redesigned for desktop with overflow fixes
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  maxWidth: "100%",
                  overflow: "hidden",
                }}
              >
                {/* Liked anime section */}
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    background: alpha(theme.palette.primary.main, 0.05),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    maxWidth: "100%",
                    overflow: "hidden",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <ThumbUpIcon color='primary' sx={{ mr: 1.5, fontSize: 28 }} />
                    <Typography variant='h5' fontWeight='bold' color='primary.main'>
                      Liked Anime
                    </Typography>
                  </Box>

                  {likedAnime.length === 0 ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        py: 4,
                        background: alpha(theme.palette.background.paper, 0.5),
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant='body1' color='text.secondary'>
                        You haven't liked any anime yet
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "1fr",
                          sm: "1fr 1fr",
                          md: "repeat(auto-fill, minmax(200px, 1fr))",
                        },
                        gap: 2,
                        width: "100%",
                        overflow: "hidden",
                        p: 1,
                      }}
                    >
                      {likedAnime.map((anime) => (
                        <HistoryAnimeCard key={anime.mal_id} anime={anime} type='like' />
                      ))}
                    </Box>
                  )}
                </Paper>

                {/* Disliked anime section */}
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    background: alpha(theme.palette.error.main, 0.05),
                    border: `1px solid ${alpha(theme.palette.error.main, 0.1)}`,
                    maxWidth: "100%",
                    overflow: "hidden",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <ThumbDownIcon color='error' sx={{ mr: 1.5, fontSize: 28 }} />
                    <Typography variant='h5' fontWeight='bold' color='error.main'>
                      Disliked Anime
                    </Typography>
                  </Box>

                  {dislikedAnime.length === 0 ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        py: 4,
                        background: alpha(theme.palette.background.paper, 0.5),
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant='body1' color='text.secondary'>
                        You haven't disliked any anime yet
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "1fr",
                          sm: "1fr 1fr",
                          md: "repeat(auto-fill, minmax(200px, 1fr))",
                        },
                        gap: 2,
                        width: "100%",
                        overflow: "hidden",
                        p: 1,
                      }}
                    >
                      {dislikedAnime.map((anime) => (
                        <HistoryAnimeCard key={anime.mal_id} anime={anime} type='dislike' />
                      ))}
                    </Box>
                  )}
                </Paper>
              </Box>
            )}
          </Box>
        )}
      </Drawer>
    </>
  );
}
