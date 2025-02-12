import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import { BandFormType, BandResponse } from "../../../types/band";
import { ProgressPie } from "../../../shared/pie/ProgressPie";
import { useHistory } from "../../../hooks/useHistory";
import { HistoryEntry } from "../../../types/history";
import Loader from "../../../shared/loader";
import { submitBand } from "../../../api/band";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  width: 100%;
  margin: auto;
`;

const FormContainer = styled.div`
  padding: 20px;
  flex: 1;
`;

const CenetedContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 90vh;
  width: 100%;
  align-items: center;
`;

const ResultContainer = styled.div`
  padding: 20px;
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ResultContent = styled.div`
  display: flex;
  gap: 15px;
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 350px;
  object-fit: cover;
`;

const AnalyticsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
`;

const Analytic = styled.div`
  flex: 1;
`;

const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary} important!;
  padding: 15px;
`;

type MusicBandFormProps = {
  selectedEntry: HistoryEntry | null;
  togetherAiKey: string | null;
  huggingFaceKey: string | null;
};

export default function MusicBandForm({
  selectedEntry,
  togetherAiKey,
  huggingFaceKey,
}: MusicBandFormProps) {
  const [formData, setFormData] = useState<BandFormType>({
    name: "",
    description: "",
    year: 2020,
  });
  const [response, setResponse] = useState<BandResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { refreshHistory } = useHistory();

  useEffect(() => {
    if (selectedEntry) {
      setFormData({
        name: selectedEntry.name,
        description: selectedEntry.description,
        year: selectedEntry.year,
      });

      setResponse({
        textParagraph1: selectedEntry.paragraph1,
        textParagraph2: selectedEntry.paragraph2,
        image: selectedEntry.image,
        stats: {
          capitalCount: selectedEntry.analytics.capitalCount,
          numberWords: selectedEntry.analytics.numberWordsCount,
          numberAllWords: selectedEntry.analytics.numberAllWords,
          isEven: selectedEntry.analytics.isEven,
        },
      });
    }
  }, [selectedEntry]);

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    setFormData((prev) => ({
      ...prev,
      year: parseInt(e.target.value as string),
    }));
  };

  const handleSubmit = async () => {
    if (!togetherAiKey || !huggingFaceKey) {
      setErrorMessage("AI features are disabled.\nPlease set API keys.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const data: BandResponse | undefined = await submitBand(
        togetherAiKey,
        huggingFaceKey,
        formData,
        setErrorMessage
      );
      if (data) {
        setResponse(data);
        refreshHistory.mutate();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Failed to fetch AI response.");
    }

    setLoading(false);
  };

  return (
    <PageContainer>
      <FormContainer>
        <Typography variant="h4" gutterBottom>
          Favorite Band Form
        </Typography>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleTextChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Band Description"
          name="description"
          multiline
          rows={3}
          value={formData.description}
          onChange={handleTextChange}
          required
          margin="normal"
        />
        <Select
          fullWidth
          name="year"
          value={formData.year}
          onChange={handleSelectChange}
        >
          {Array.from({ length: 66 }, (_, i) => 1960 + i).map((y) => (
            <MenuItem key={y} value={y}>
              {y}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={loading}
        >
          Let's Get Rolling
        </Button>
      </FormContainer>

      <ResultContainer>
        {loading && <Loader />}
        {errorMessage && (
          <CenetedContainer>
            <Typography color="error" variant="h3">
              {errorMessage}
            </Typography>
          </CenetedContainer>
        )}
        {response && (
          <StyledCard>
            <ResultContent>
              <TextContainer>
                <Typography variant="h6">
                  {formData.name} - {formData.year}
                </Typography>
                <Typography>{response.textParagraph1}</Typography>
                <Typography>{response.textParagraph2}</Typography>
              </TextContainer>

              <ImageContainer>
                {response.image && (
                  <StyledImage src={response.image} alt="Generated AI Image" />
                )}
              </ImageContainer>
            </ResultContent>

            <AnalyticsContainer>
              <Analytic>
                <ProgressPie
                  current={response.stats.capitalCount || 0}
                  total={response.stats.numberAllWords || 0}
                  header="Capital Letter Words:"
                />
              </Analytic>
              <Analytic>
                <ProgressPie
                  current={response.stats.numberWords || 0}
                  total={response.stats.numberAllWords || 0}
                  header="Words Followed by Numbers:"
                />
              </Analytic>
              <Analytic>
                <h3>Year is "{response.stats.isEven ? "Even" : "Odd"}"</h3>
              </Analytic>
            </AnalyticsContainer>
          </StyledCard>
        )}
      </ResultContainer>
    </PageContainer>
  );
}
