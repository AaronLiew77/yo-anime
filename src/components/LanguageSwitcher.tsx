import { Button, ButtonGroup, useTheme, alpha } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Tooltip } from "antd";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const theme = useTheme();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <ButtonGroup size='small' sx={{ height: 36 }}>
      <Tooltip title='Switch to English' placement='bottom'>
        <Button
          variant={i18n.language === "en" ? "contained" : "outlined"}
          onClick={() => changeLanguage("en")}
          sx={{
            minWidth: 40,
            bgcolor: i18n.language === "en" ? theme.palette.primary.main : "transparent",
            color:
              i18n.language === "en"
                ? theme.palette.primary.contrastText
                : theme.palette.common.white,
            borderColor: alpha(theme.palette.common.white, 0.5),
            "&:hover": {
              bgcolor:
                i18n.language === "en"
                  ? theme.palette.primary.dark
                  : alpha(theme.palette.common.white, 0.1),
              borderColor: theme.palette.common.white,
            },
          }}
        >
          EN
        </Button>
      </Tooltip>
      <Tooltip title='日本語に切り替える' placement='bottom'>
        <Button
          variant={i18n.language === "ja" ? "contained" : "outlined"}
          onClick={() => changeLanguage("ja")}
          sx={{
            minWidth: 40,
            bgcolor: i18n.language === "ja" ? theme.palette.primary.main : "transparent",
            color:
              i18n.language === "ja"
                ? theme.palette.primary.contrastText
                : theme.palette.common.white,
            borderColor: alpha(theme.palette.common.white, 0.5),
            "&:hover": {
              bgcolor:
                i18n.language === "ja"
                  ? theme.palette.primary.dark
                  : alpha(theme.palette.common.white, 0.1),
              borderColor: theme.palette.common.white,
            },
          }}
        >
          JP
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
}
