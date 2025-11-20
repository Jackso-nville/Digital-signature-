import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Heading,
  Button,
} from "@react-email/components";

interface CertificateEmailProps {
  studentName: string;
  verificationLink: string;
}

export const CertificateEmail = ({
  studentName,
  verificationLink,
}: CertificateEmailProps) => (
  <Html>
    <Head />
    <Body style={{ fontFamily: "sans-serif", color: "#333" }}>
      <Container>
        <Heading>Congratulations, {studentName}!</Heading>
        <Text>
          You have successfully completed your program with Dada Devs. Please
          find your certificate of completion attached to this email.
        </Text>
        <Text>
          You can verify your certificate at any time by clicking the link
          below:
        </Text>
        <Button
          href={verificationLink}
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "12px 20px",
            textDecoration: "none",
            borderRadius: "5px",
          }}
        >
          Verify Certificate
        </Button>
        <Text>
          <br />
          Best regards,
          <br />
          The Dada Devs Team
        </Text>
      </Container>
    </Body>
  </Html>
);
