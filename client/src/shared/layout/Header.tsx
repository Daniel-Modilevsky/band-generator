import logo from "../../assets/logo.png";
import styled from "styled-components";
import HistoryMenu from "../../pages/home/history/historyMenu";
import { HistoryEntry } from "../../types/history";
import { Button, IconButton } from "@mui/material";
import { useState } from "react";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { submitKeys } from "../../api/auth";

const FormContainer = styled.div`
  margin-bottom: 5px;
  box-shadow:
    0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14),
    0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  position: static;
  height: 64px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 60px;
`;

const Logo = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
`;

const CloseButton = styled(IconButton)`
  color: black;
  z-index: 10;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 20px;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  width: 400px;
  border-radius: 8px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

type HeaderProps = {
  onHistoryClick: (entry: HistoryEntry) => void;
  onSetApiKeys: (togetherAiKey: string, huggingFaceKey: string) => void;
};

export default function Header({ onHistoryClick, onSetApiKeys }: HeaderProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [togetherAiKey, setTogetherAiKey] = useState("");
  const [huggingFaceKey, setHuggingFaceKey] = useState("");

  const handleSaveKeys = async () => {
    await submitKeys(togetherAiKey, huggingFaceKey);
    onSetApiKeys(togetherAiKey, huggingFaceKey);
    setModalOpen(false);
  };

  return (
    <FormContainer>
      <LogoContainer>
        <Logo src={logo} alt="logo" />
      </LogoContainer>
      <HeaderActions>
        <HistoryMenu onHistoryClick={onHistoryClick} />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setModalOpen(true)}
        >
          Set API Keys
        </Button>
      </HeaderActions>
      {modalOpen && (
        <Overlay>
          <ModalContainer>
            <CloseButton onClick={() => setModalOpen(false)}>
              <CloseIcon />
            </CloseButton>
            <h2>Enter API Keys</h2>
            <TextField
              fullWidth
              label="Together AI API Key"
              value={togetherAiKey}
              onChange={(e) => setTogetherAiKey(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Hugging Face API Key"
              value={huggingFaceKey}
              onChange={(e) => setHuggingFaceKey(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSaveKeys}
            >
              Save Keys
            </Button>
          </ModalContainer>
        </Overlay>
      )}
    </FormContainer>
  );
}
