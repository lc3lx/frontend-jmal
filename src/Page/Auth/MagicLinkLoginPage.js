import React from "react";
import { Container } from "react-bootstrap";
import MagicLinkLogin from "../../Components/Auth/MagicLinkLogin";

const MagicLinkLoginPage = () => {
  return (
    <Container style={{ minHeight: "calc(100vh - 200px)" }}>
      <MagicLinkLogin />
    </Container>
  );
};

export default MagicLinkLoginPage;
