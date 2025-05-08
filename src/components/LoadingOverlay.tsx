import { Box, Typography } from "@mui/material";
import { useLoading } from "../contexts/LoadingContext";
import { useState, useEffect } from "react";
import LoadingAnimation from "../assets/images/LoadingAnimation1.gif";

export default function LoadingOverlay() {
  const { isNavigating, currentDelaySeconds } = useLoading();
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (!isNavigating) {
      setCountdown(null);
      return;
    }

    // Start a countdown timer based on the actual delay from context
    let timer: number | null = null;
    let startTime = Date.now();
    const maxSeconds = currentDelaySeconds;

    const updateCountdown = () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, maxSeconds - elapsed);
      setCountdown(remaining);

      if (remaining > 0 && isNavigating) {
        timer = window.setTimeout(updateCountdown, 1000);
      }
    };

    updateCountdown();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isNavigating, currentDelaySeconds]);

  if (!isNavigating) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <img src={LoadingAnimation} alt='Loading' style={{ width: "100px", height: "100px" }} />
      <Typography variant='h6' color='white' sx={{ mt: 2 }}>
        Loading Anime Data...
      </Typography>
      {countdown !== null && (
        <Typography variant='body1' color='white' sx={{ mt: 1, opacity: 0.8 }}>
          Please wait {countdown} second{countdown === 1 ? "" : "s"}
        </Typography>
      )}
      <Typography variant='body2' color='white' sx={{ mt: 1, opacity: 0.6 }}>
        Preventing API rate limits
      </Typography>
    </Box>
  );
}
