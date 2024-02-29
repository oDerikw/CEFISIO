import { useTranslation } from 'react-i18next';

import {
  Grid,
  Typography,
  Button
} from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader() {
  const { t }: { t: any } = useTranslation();
  //const { user } = useAuth();
  //const { register } = useAuth() as any;

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t('Usuários')}
          </Typography>
          <Typography variant="subtitle2">
            {t(
              'Todos os aspectos relacionados aos usuários do aplicativo podem ser gerenciados nesta página'
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{
              mt: { xs: 2, sm: 0 }
            }}
            href="/management/users/create"
            //onClick={handleCreateUserOpen}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            {t('Criar usuário')}
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;
