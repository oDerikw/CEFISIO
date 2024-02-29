import {
  Box,
  Card,
  Typography,
  Container,
  styled
} from '@mui/material';
import Head from 'next/head';
import { Guest } from 'src/components/Guest';
import { useAuth } from 'src/hooks/useAuth';
import { RegisterJWT } from 'src/content/Auth/Register/RegisterJWT';
import { useTranslation } from 'react-i18next';
import Logo from 'src/components/LogoSign';
import BaseLayout from 'src/layouts/BaseLayout';
import Link from 'src/components/Link';
import { useRouter } from 'next/router';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
`
);

const TopWrapper = styled(Box)(
  () => `
  display: flex;
  width: 100%;
  flex: 1;
  padding: 20px;
`
);

function RegisterBasic() {
  const { method } = useAuth() as any;
  const { t }: { t: any } = useTranslation();

  const router = useRouter();
  const { demo } = router.query;

  return (
    <>
      <Head>
        <title>Cadastro</title>
      </Head>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="sm">
            <Logo />
            <Card
              sx={{
                mt: 3,
                px: 4,
                pt: 5,
                pb: 3
              }}
            >
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    mb: 1
                  }}
                >
                  {t('Criar Conta')}
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{
                    mb: 3
                  }}
                >
                  {t('Preencha os campos abaixo para criar uma conta.')}
                </Typography>
              </Box>
              {method === 'JWT' && <RegisterJWT />}
              <Box mt={4}>
                <Typography
                  component="span"
                  variant="subtitle2"
                  color="text.primary"
                  fontWeight="bold"
                >
                  {t('Já possuiu uma conta?')}
                </Typography>{' '}
                <Link
                  href={
                    demo
                      ? `/?demo=${demo}`
                      : '/'
                  }
                >
                  <b>Clique aqui</b>
                </Link>
              </Box>
            </Card>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  );
}

RegisterBasic.getLayout = (page) => (
  <Guest>
    <BaseLayout>{page}</BaseLayout>
  </Guest>
);

export default RegisterBasic;
