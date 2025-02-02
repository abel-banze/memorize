import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
  } from '@react-email/components';
  import * as React from 'react';
  
  interface KoalaWelcomeEmailProps {
    userFirstname: string;
  }
  
  const baseUrl = process.env.AUTH_URL
    ? `https://${process.env.AUTH_URL}`
    : '';
  
  export const WelcomeEmail = ({
    userFirstname,
  }: KoalaWelcomeEmailProps) => (
    <Html>
      <Head />
      <Preview>
        Guarde cada memória, compartilhe cada emoção.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${baseUrl}/logo.png`}
            width="170"
            height="50"
            alt="Memorize"
            style={logo}
          />
          <Text style={paragraph}>Olá {userFirstname},</Text>
          <Text style={paragraph}>
            Bem-vindo ao Memorize. Estamos felizes de ter você como parte da nossa plataforma. 
            Esperamos que você se divirta e que você tenha uma experiência incrível no Memorize.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href="https://memorize.space/login">
              Começar agora
            </Button>
          </Section>
          <Text style={paragraph}>
            Atenciosamente,
            <br />
            Equipe Memorize
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Produto da Codebaz, SU. Lda.
          </Text>
        </Container>
      </Body>
    </Html>
  )

  const main = {
    backgroundColor: '#ffffff',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
  };
  
  const logo = {
    margin: '0 auto',
  };
  
  const paragraph = {
    fontSize: '16px',
    lineHeight: '26px',
  };
  
  const btnContainer = {
    textAlign: 'center' as const,
  };
  
  const button = {
    backgroundColor: '#5F51E8',
    borderRadius: '3px',
    color: '#fff',
    fontSize: '16px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '12px',
  };
  
  const hr = {
    borderColor: '#cccccc',
    margin: '20px 0',
  };
  
  const footer = {
    color: '#8898aa',
    fontSize: '12px',
  };
  