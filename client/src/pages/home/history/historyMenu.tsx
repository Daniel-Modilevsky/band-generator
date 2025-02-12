import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import HistoryIcon from "@mui/icons-material/History";
import Badge from "@mui/material/Badge";
import { useHistory } from "../../../hooks/useHistory";
import { HistoryEntry } from "../../../types/history";

type HistoryMenuProps = {
  onHistoryClick: (entry: HistoryEntry) => void;
};

export default function HistoryMenu({ onHistoryClick }: HistoryMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { history, refreshHistory } = useHistory();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    refreshHistory.mutate(); // Refresh history when opening menu
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectHistoryEntry = (entry: HistoryEntry) => {
    onHistoryClick(entry); // Pass the selected entry to the parent
    handleClose(); // Close the menu after selection
  };

  return (
    <div>
      <Button
        id="history-button"
        aria-controls={open ? "history-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        disabled={!history || history.length === 0}
        variant="contained"
        sx={{
          background: history && history.length > 0 ? "#3498db" : "#bdc3c7",
          color: "white",
          "&:hover": {
            background: history && history.length > 0 ? "#2980b9" : "#a0a0a0",
          },
        }}
      >
        History&nbsp;
        <Badge badgeContent={history ? history.length : 0} color="secondary">
          <HistoryIcon />
        </Badge>
      </Button>

      <Menu
        id="history-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "history-button",
        }}
      >
        {history && history.length > 0 ? (
          history.map((historyEntry) => (
            <MenuItem
              key={historyEntry.index}
              onClick={() => handleSelectHistoryEntry(historyEntry)}
            >
              {historyEntry.summary}
            </MenuItem>
          ))
        ) : (
          <MenuItem onClick={handleClose} disabled>
            No history available
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
