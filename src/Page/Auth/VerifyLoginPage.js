import React from "react";
import { Container } from "react-bootstrap";
import VerifyLogin from "../../Components/Auth/VerifyLogin";

const VerifyLoginPage = () => {
  return (
    <Container style={{ minHeight: "calc(100vh - 200px)" }}>
      <VerifyLogin />
    </Container>
  );
};

export default VerifyLoginPage;
