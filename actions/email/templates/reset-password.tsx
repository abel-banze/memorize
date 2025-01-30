import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
  } from '@react-email/components';
  import * as React from 'react';
  
  interface DropboxResetPasswordEmailProps {
    userFirstname?: string;
    resetPasswordLink?: string;
  }
  
  const baseUrl = process.env.AUTH_URL
    ? `https://${process.env.AUTH_URL}`
    : '';
  
  export const ResetPasswordEmail = ({
    userFirstname,
    resetPasswordLink,
  }: DropboxResetPasswordEmailProps) => {
    return (
      <Html>
        <Head />
        <Preview>Memorize - Recupere sua senha</Preview>
        <Body style={main}>
          <Container style={container}>
            <Img
              src={`${baseUrl}/logo.png`}
              width="40"
              height="33"
              alt="Memorize"
            />
            <Section>
              <Text style={text}>Olá {userFirstname},</Text>
              <Text style={text}>
                Alguém recentemente pediu uma alteração de senha para sua conta
                no Memorize. Se for você, pode definir uma nova senha aqui:
              </Text>
              <Button style={button} href={resetPasswordLink}>
                Recuperar senha
              </Button>
              <Text style={text}>
                Se não for vocé, nenhuma alteração foi feita em sua conta.
                Seus dados nunca serão compartilhados.
              </Text>
              
              <Text style={text}> Guarde cada memória, Compartilhe cada emoção. </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }

  
  const main = {
    backgroundColor: '#f6f9fc',
    padding: '10px 0',
  };
  
  const container = {
    backgroundColor: '#ffffff',
    border: '1px solid #f0f0f0',
    padding: '45px',
  };
  
  const text = {
    fontSize: '16px',
    fontFamily:
      "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
    fontWeight: '300',
    color: '#404040',
    lineHeight: '26px',
  };
  
  const button = {
    backgroundColor: '#007ee6',
    borderRadius: '4px',
    color: '#fff',
    fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
    fontSize: '15px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    width: '210px',
    padding: '14px 7px',
  };
  
  const anchor = {
    textDecoration: 'underline',
  };
  