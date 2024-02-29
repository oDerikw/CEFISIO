import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

function PageHeader() {
  const { t }: { t: any } = useTranslation();

  return (
    <Grid container alignItems="center">
      <Grid item>
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {t('Bem-Vindo')}!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
