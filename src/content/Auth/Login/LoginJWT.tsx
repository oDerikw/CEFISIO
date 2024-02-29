import * as Yup from 'yup';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Link from 'src/components/Link';

import {
  Box,
  Button,
  FormHelperText,
  TextField,
  CircularProgress
} from '@mui/material';
import { useAuth } from 'src/hooks/useAuth';
import { useRefMounted } from 'src/hooks/useRefMounted';
import { useTranslation } from 'react-i18next';


export const LoginJWT: FC = (props) => {
  const { t }: { t: any } = useTranslation();
  const { login } = useAuth() as any;
  const isMountedRef = useRefMounted();
  const router = useRouter();
  
  const formik = useFormik({
    initialValues: {
      email: 'john@mail.com',
      password: 'changeme',
      terms: true,
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t('O endereço de e-mail deve ser um e-mail válido'))
        .max(255)
        .required(t('O espaço de e-mail é obrigatório')),
      password: Yup.string()
        .max(255)
        .required(t('O espaço de senha é obrigatório'))
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {

        await login(values.email, values.password);
        
        if (isMountedRef()) {
          const backTo =
            (router.query.backTo as string) || '/dashboards/main';
          router.push(backTo);
        }
      } catch (err) {
       
        if (isMountedRef()) {
          
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    }
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit} {...props}>
      <TextField
        error={Boolean(formik.touched.email && formik.errors.email)}
        fullWidth
        margin="normal"
        autoFocus
        helperText={formik.touched.email && formik.errors.email}
        label={t('Endereço de E-mail')}
        name="email"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="email"
        value={formik.values.email}
        variant="outlined"
      />
      <TextField
        error={Boolean(formik.touched.password && formik.errors.password)}
        fullWidth
        margin="normal"
        helperText={formik.touched.password && formik.errors.password}
        label={t('Senha')}
        name="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="password"
        value={formik.values.password}
        variant="outlined"
      />
      <Box
        alignItems="center"
        display={{ xs: 'block', md: 'flex' }}
        justifyContent="space-between"
      >
        <Box display={{ xs: 'block', md: 'flex' }}>
        </Box>
        <Link href="/auth/recover-password">
          <b>{t('Esqueceu sua senha?')}</b>
        </Link>
      </Box>

      {Boolean(formik.touched.terms && formik.errors.terms) && (
        <FormHelperText error>{formik.errors.terms}</FormHelperText>
      )}

      {formik.errors.submit && (
        <FormHelperText error>{formik.errors.submit}</FormHelperText>
      )}
      <Button
        sx={{
          mt: 3
        }}
        color="primary"
        startIcon={
          formik.isSubmitting ? <CircularProgress size="1rem" /> : null
        }
        disabled={formik.isSubmitting}
        type="submit"
        fullWidth
        size="large"
        variant="contained"
      >
        {t('Entrar')}

      </Button>
    </form>
  );
};
