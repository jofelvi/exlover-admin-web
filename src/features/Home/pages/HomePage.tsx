import HeaderHome from "../components/HeaderHome.tsx";
import { Container } from "@mui/material";

export const HomePage = () => {
  return (
    <>
      <Container>
        <HeaderHome />
        {/* <ProfileSection />
        <StatsSection />
        <SkillsSection />*/}
      </Container>
    </>
  );
};

export default HomePage;
