import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 90vh;
  width: 100%;
  align-items: center;
`;

export default function Loader() {
  return (
    <LoaderContainer>
      <CircularProgress size={100} />
    </LoaderContainer>
  );
}
