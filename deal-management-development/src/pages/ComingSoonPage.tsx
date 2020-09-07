import React from "react";
import AlertImageCardContainer from "../components/AlertImageCard/AlertImageCardContainer";
import ContentImageCard from "../components/ContentImageCard/ContentImageCard";
export interface ComingSoonPageProps {}
const ComingSoonPage = (props: ComingSoonPageProps) => {
  return (
    <AlertImageCardContainer>
      <ContentImageCard
        title="This feature will be available soon"
        cardImgClass="coming-soon"
        severity="info"
        secondaryMessage=""
        message="Please visit our website to follow along the feature roadmap of Platformer Cloud."
        btnText="Platformer Roadmap"
      />
    </AlertImageCardContainer>
  );
};
export default ComingSoonPage;
