import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../shared/layout/Header";
import MusicBandForm from "./bands/MusicBandForm";
import { HistoryEntry } from "../../types/history";

const HomeContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  min-height: 91.8vh;
  height: auto;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const HomePage: React.FC = () => {
  const [selectedEntry, setSelectedEntry] = useState<HistoryEntry | null>(null);
  const [togetherAiKey, setTogetherAiKey] = useState<string | null>(null);
  const [huggingFaceKey, setHuggingFaceKey] = useState<string | null>(null);

  const handleHistorySelect = (entry: HistoryEntry) => {
    setSelectedEntry(entry);
  };

  const handleSetApiKeys = (togetherAi: string, huggingFace: string) => {
    setTogetherAiKey(togetherAi);
    setHuggingFaceKey(huggingFace);
  };

  return (
    <>
      <Header
        onHistoryClick={handleHistorySelect}
        onSetApiKeys={handleSetApiKeys}
      />
      <HomeContainer>
        <MusicBandForm
          selectedEntry={selectedEntry}
          togetherAiKey={togetherAiKey}
          huggingFaceKey={huggingFaceKey}
        />
      </HomeContainer>
    </>
  );
};
