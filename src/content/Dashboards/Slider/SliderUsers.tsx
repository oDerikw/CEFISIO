import {
  Grid,
  Card,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  TextField,
  CardActionArea,
  Button,
  Autocomplete,
  CircularProgress,
  CardMedia,
  Box,
  alpha,
  useTheme,
  styled,
  IconButton,
  Zoom,
  Divider
} from '@mui/material';

import { useState } from 'react';
import { wait } from 'src/utils/wait';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import * as Yup from 'yup';
import { Formik } from 'formik';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';

import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
import ChevronLeftTwoToneIcon from '@mui/icons-material/ChevronLeftTwoTone';
import { useAuth } from 'src/hooks/useAuth';
import { useSnackbar } from 'notistack';

const roles = [
  { label: 'Atendente', value: 'secretarians' },
  { label: 'Supervisor', value: 'supervisors' },
  { label: 'Estagiário', value: 'apprentices' },
  { label: 'Paciente', value: 'patients' }
];

const SwipeIndicator = styled(IconButton)(
  ({ theme }) => `
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(5)};
        height: ${theme.spacing(5)};
        border-radius: 100px;
        transition: ${theme.transitions.create(['all'])};

        &:hover {
          color: ${theme.colors.alpha.black[100]};
          background: ${theme.colors.primary.lighter};
        }
`
);

const CardActionAreaWrapper = styled(CardActionArea)(
  () => `
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  .MuiTouchRipple-root {
      opacity: .3;
  }

  &:hover {
      .MuiCardActionArea-focusHighlight {
          opacity: .05;
      }
  }
`
);

function TrainingPrograms() {
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();
  const [openP, setOpen1] = useState(false);
  const [openT, setOpen2] = useState(false);
  const [openE, setOpen3] = useState(false);
  const [openA, setOpen4] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  //const { user } = useAuth();
  const { register } = useAuth() as any;

  // Paciente Handler

  const handleCreateUserOpen = () => {
    setOpen1(true);
  };

  const handleCreateUserClose = () => {
    setOpen1(false);
  };

  const handleCreateUserSuccess = () => {
    enqueueSnackbar(t('Conta criada com sucesso'), {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      TransitionComponent: Zoom
    });

    setOpen1(false);
  };

  // Teacher Handler

  const handleCreateTeacherOpen = () => {
    setOpen2(true);
  };

  const handleCreateTeacherClose = () => {
    setOpen2(false);
  };

  const handleCreateTeacherSuccess = () => {
    enqueueSnackbar(t('Conta criada com sucesso'), {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      TransitionComponent: Zoom
    });

    setOpen2(false);
  };

  // Estagiário Handler

  const handleCreateEstagiarioOpen = () => {
    setOpen3(true);
  };

  const handleCreateEstagiarioClose = () => {
    setOpen3(false);
  };

  const handleCreateEstagiarioSuccess = () => {
    enqueueSnackbar(t('Conta criada com sucesso'), {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      TransitionComponent: Zoom
    });

    setOpen3(false);
  };

  // Atendente Handler

  const handleCreateAtendenteOpen = () => {
    setOpen4(true);
  };

  const handleCreateAtendenteClose = () => {
    setOpen4(false);
  };


  const handleCreateAtendenteSuccess = () => {
    enqueueSnackbar(t('Conta criada com sucesso'), {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      TransitionComponent: Zoom
    });

    setOpen4(false);
  };

  return (
    <>
    <Card>
      <CardHeader
        action={
          <>
            <SwipeIndicator className="MuiSwipe-root MuiSwipe-left">
              <ChevronLeftTwoToneIcon />
            </SwipeIndicator>
            <SwipeIndicator className="MuiSwipe-root MuiSwipe-right">
              <ChevronRightTwoToneIcon />
            </SwipeIndicator>
          </>
        }
        title={t('Selecione uma opção')}
      />
      <Divider />
      <Box
        px={3}
        pb={4}
        sx={{
          '.swiper-pagination-bullets': {
            bottom: '0 !important'
          }
        }}
      >
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop
          navigation={{
            nextEl: '.MuiSwipe-right',
            prevEl: '.MuiSwipe-left'
          }}
          breakpoints={{
            500: {
              slidesPerView: 2,
              spaceBetween: 12
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 12
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 24
            }
          }}
          modules={[Navigation, Pagination]}
          pagination={{ dynamicBullets: true, clickable: true }}
        >
          <SwiperSlide>
            <Card
              sx={{
                mt: 2,
                textAlign: 'center',
                transition: `${theme.transitions.create([
                  'box-shadow',
                  'transform'
                ])}`,
                transform: 'translateY(0px)',

                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: `0 2rem 8rem 0 ${alpha(
                    theme.colors.alpha.black[100],
                    0.1
                  )}, 
                                0 0.6rem 1.6rem ${alpha(
                                  theme.colors.alpha.black[100],
                                  0.2
                                )}, 
                                0 0.2rem 0.2rem ${alpha(
                                  theme.colors.alpha.black[100],
                                  0.15
                                )}`
                }
              }}
            >
              <CardActionAreaWrapper >
                <CardMedia 
                  component="img"
                  height="420"
                  image="/static/images/placeholders/main/1.jpg"
                  alt="..."
                />
              </CardActionAreaWrapper>
            </Card>
            <Box
              sx={{
                px: { md: 2, lg: 1.5, xl: 3 },
                pt: 2,
                textAlign: 'center'
              }}
            >
              <Button
                endIcon={<ArrowForwardTwoToneIcon />}
                variant="outlined"
                sx={{
                  borderWidth: '2px',
                  '&:hover': {
                    borderWidth: '2px'
                  }
                }}
                onClick={handleCreateUserOpen}
              >
                {t('Criar Paciente')}
              </Button>
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Card
              sx={{
                mt: 2,
                textAlign: 'center',
                transition: `${theme.transitions.create([
                  'box-shadow',
                  'transform'
                ])}`,
                transform: 'translateY(0px)',

                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: `0 2rem 8rem 0 ${alpha(
                    theme.colors.alpha.black[100],
                    0.1
                  )}, 
                                0 0.6rem 1.6rem ${alpha(
                                  theme.colors.alpha.black[100],
                                  0.2
                                )}, 
                                0 0.2rem 0.2rem ${alpha(
                                  theme.colors.alpha.black[100],
                                  0.15
                                )}`
                }
              }}
              
            >
              <CardActionAreaWrapper>
                <CardMedia
                  component="img"
                  height="420"
                  image="/static/images/placeholders/main/2.jpg"
                  alt="..."
                />
              </CardActionAreaWrapper>
            </Card>
            <Box
              sx={{
                px: { md: 2, lg: 1.5, xl: 3 },
                pt: 2,
                textAlign: 'center'
              }}
            >
              <Button
                endIcon={<ArrowForwardTwoToneIcon />}
                variant="outlined"
                sx={{
                  borderWidth: '2px',
                  '&:hover': {
                    borderWidth: '2px'
                  }
                }}
                onClick={handleCreateTeacherOpen}
              >
                {t('Criar Supervisor')}
              </Button>
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Card
              sx={{
                mt: 2,
                textAlign: 'center',
                transition: `${theme.transitions.create([
                  'box-shadow',
                  'transform'
                ])}`,
                transform: 'translateY(0px)',

                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: `0 2rem 8rem 0 ${alpha(
                    theme.colors.alpha.black[100],
                    0.1
                  )}, 
                                0 0.6rem 1.6rem ${alpha(
                                  theme.colors.alpha.black[100],
                                  0.2
                                )}, 
                                0 0.2rem 0.2rem ${alpha(
                                  theme.colors.alpha.black[100],
                                  0.15
                                )}`
                }
              }}
            >
              <CardActionAreaWrapper>
                <CardMedia
                  component="img"
                  height="420"
                  image="/static/images/placeholders/main/3.jpg"
                  alt="..."
                />
              </CardActionAreaWrapper>
            </Card>
            <Box
              sx={{
                px: { md: 2, lg: 1.5, xl: 3 },
                pt: 2,
                textAlign: 'center'
              }}
            >
              <Button
                endIcon={<ArrowForwardTwoToneIcon />}
                variant="outlined"
                sx={{
                  borderWidth: '2px',
                  '&:hover': {
                    borderWidth: '2px'
                  }
                }}
                onClick={handleCreateEstagiarioOpen}
              >
                {t('Criar Estagiário')}
              </Button>
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Card
              sx={{
                mt: 2,
                textAlign: 'center',
                transition: `${theme.transitions.create([
                  'box-shadow',
                  'transform'
                ])}`,
                transform: 'translateY(0px)',

                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: `0 2rem 8rem 0 ${alpha(
                    theme.colors.alpha.black[100],
                    0.1
                  )}, 
                                0 0.6rem 1.6rem ${alpha(
                                  theme.colors.alpha.black[100],
                                  0.2
                                )}, 
                                0 0.2rem 0.2rem ${alpha(
                                  theme.colors.alpha.black[100],
                                  0.15
                                )}`
                }
              }}
            >
              <CardActionAreaWrapper>
                <CardMedia
                  component="img"
                  height="420"
                  image="/static/images/placeholders/main/4.jpg"
                  alt="..."
                />
              </CardActionAreaWrapper>
            </Card>
            <Box
              sx={{
                px: { md: 2, lg: 1.5, xl: 3 },
                pt: 2,
                textAlign: 'center'
              }}
            >
              <Button
                endIcon={<ArrowForwardTwoToneIcon />}
                variant="outlined"
                sx={{
                  borderWidth: '2px',
                  '&:hover': {
                    borderWidth: '2px'
                  }
                }}
                onClick={handleCreateAtendenteOpen}
              >
                {t('Criar Atendente')}
              </Button>
            </Box>
          </SwiperSlide>
        </Swiper>
      </Box>
    </Card>
      <Dialog
        fullWidth
        maxWidth="md"
        open={openP}
        onClose={handleCreateUserClose}
      >
        <DialogTitle
          sx={{
            p: 3
          }}
        >
          <Typography variant="h4" gutterBottom>
            {t('Criar Paciente')}
          </Typography>
          <Typography variant="subtitle2">
            {t(
              'Preencha os campos abaixo para criar um novo usuário'
            )}
          </Typography>
        </DialogTitle>
        <Formik
          initialValues={{
            email: '',
            name: '',
            password: '',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .max(80, 'Limite máximo de caracteres atingido')
              .required(t('O campo do primeiro nome é obrigatório')),
            phone: Yup.string()
              .max(20, 'Limite máximo de caracteres atingido')
              .required(t('O campo é obrigatório')),
            medical_record: Yup.string()
              .max(20, 'Limite máximo de caracteres atingido')
              .required(t('O campo é obrigatório')),
            referral_slip: Yup.string()
              .max(5, 'Limite máximo de caracteres atingido')
              .required(t('O campo é obrigatório')),
          })}

          onSubmit={async (
            _values,
            { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            try {
              await wait(1000);
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              await register(_values.email, _values.name,_values.password);
              handleCreateUserSuccess();
            } catch (err) {
              console.error(err);
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent
                dividers
                sx={{
                  p: 3
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={20}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} >
                        <TextField
                          error={Boolean(touched.name && errors.name)}
                          fullWidth
                          helperText={touched.name && errors.name}
                          label={t('Nome do Paciente')}
                          name="name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          error={Boolean(touched.email && errors.email)}
                          fullWidth
                          helperText={touched.email && errors.email}
                          label={t('Histórico Médico')}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="email"
                          value={values.email}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          error={Boolean(touched.email && errors.email)}
                          fullWidth
                          helperText={touched.email && errors.email}
                          label={t('Guia')}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="email"
                          value={values.email}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Autocomplete
                          disablePortal
                          options={roles}
                          renderInput={(params) => (
                            <TextField
                              fullWidth
                              {...params}
                              label={t('Permissões')}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions
                sx={{
                  p: 3
                }}
              >
                <Button color="secondary" onClick={handleCreateUserClose}>
                  {t('Cancelar')}
                </Button>
                <Button
                  type="submit"
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  disabled={Boolean(errors.submit) || isSubmitting}
                  variant="contained"
                >
                  {t('Criar Paciente')}
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="md"
        open={openT}
        onClose={handleCreateTeacherClose}
      >
        <DialogTitle
          sx={{
            p: 3
          }}
        >
          <Typography variant="h4" gutterBottom>
            {t('Criar usuário')}
          </Typography>
          <Typography variant="subtitle2">
            {t(
              'Preencha os campos abaixo para criar um novo usuário'
            )}
          </Typography>
        </DialogTitle>
        <Formik
          initialValues={{
            email: '',
            name: '',
            password: '',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            secretarian_id: Yup.number()
              .max(80, 'Limite máximo de caracteres atingido')
              .required(t('O campo é obrigatório')),
            name: Yup.string()
              .max(80, 'Limite máximo de caracteres atingido')
              .required(t('O campo nome é obrigatório')),
            email: Yup.string()
              .email(t('O e-mail fornecido deve ser um endereço de e-mail válido'))
              .max(80, 'Limite máximo de caracteres atingido')
              .required(t('O campo e-mail é obrigatório')),
            password: Yup.string()
              .min(8, 'Senha deve ter mais de 8 caracteres')
              .max(80, 'Senha muito longa')
              .required(t('O campo de senha é necessária')),
            specialty: Yup.string()
              .max(20, 'Limite máximo de caracteres atingido')
              .required(t('O campo é obrigatório')),
          })}

          onSubmit={async (
            _values,
            { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            try {
              await wait(1000);
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              await register(_values.email, _values.name,_values.password);
              handleCreateTeacherSuccess();
            } catch (err) {
              console.error(err);
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent
                dividers
                sx={{
                  p: 3
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={20}>
                    <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <TextField
                          error={Boolean(touched.name && errors.name)}
                          fullWidth
                          helperText={touched.name && errors.name}
                          label={t('Atendente Responsável')}
                          name="name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.name && errors.name)}
                          fullWidth
                          helperText={touched.name && errors.name}
                          label={t('Nome do Supervisor')}
                          name="name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.name && errors.name)}
                          fullWidth
                          helperText={touched.name && errors.name}
                          label={t('Especialidade do Supervisor')}
                          name="name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          error={Boolean(touched.email && errors.email)}
                          fullWidth
                          helperText={touched.email && errors.email}
                          label={t('E-mail')}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="email"
                          value={values.email}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} >
                        <TextField
                          error={Boolean(touched.password && errors.password)}
                          fullWidth
                          margin="normal"
                          helperText={touched.password && errors.password}
                          label={t('Senha')}
                          name="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="password"
                          value={values.password}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Autocomplete
                          disablePortal
                          options={roles}
                          renderInput={(params) => (
                            <TextField
                              fullWidth
                              {...params}
                              label={t('Permissões')}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions
                sx={{
                  p: 3
                }}
              >
                <Button color="secondary" onClick={handleCreateTeacherClose}>
                  {t('Cancelar')}
                </Button>
                <Button
                  type="submit"
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  disabled={Boolean(errors.submit) || isSubmitting}
                  variant="contained"
                >
                  {t('Criar Supervisor')}
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="md"
        open={openE}
        onClose={handleCreateEstagiarioClose}
      >
        <DialogTitle
          sx={{
            p: 3
          }}
        >
          <Typography variant="h4" gutterBottom>
            {t('Criar Estagiário')}
          </Typography>
          <Typography variant="subtitle2">
            {t(
              'Preencha os campos abaixo para criar um novo usuário'
            )}
          </Typography>
        </DialogTitle>
        <Formik
          initialValues={{
            email: '',
            name: '',
            password: '',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .max(80, 'Limite máximo de caracteres atingido')
              .required(t('O campo nome é obrigatório')),
            supervisor: Yup.string()
              .max(80, 'Limite máximo de caracteres atingido')
              .required(t('O campo do primeiro nome é obrigatório')),
            email: Yup.string()
              .email(t('O e-mail fornecido deve ser um endereço de e-mail válido'))
              .max(80, 'Limite máximo de caracteres atingido')
              .required(t('O campo e-mail é obrigatório')),
            password: Yup.string()
              .min(8, 'Senha deve ter mais de 8 caracteres')
              .max(80, 'Senha muito longa')
              .required(t('O campo de senha é necessária'))
          })}

          onSubmit={async (
            _values,
            { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            try {
              await wait(1000);
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              await register(_values.email, _values.name,_values.password);
              handleCreateEstagiarioSuccess();
            } catch (err) {
              console.error(err);
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent
                dividers
                sx={{
                  p: 3
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={20}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6} >
                        <TextField
                          error={Boolean(touched.name && errors.name)}
                          fullWidth
                          helperText={touched.name && errors.name}
                          label={t('Nome do Estagiário')}
                          name="name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6} >
                        <TextField
                          error={Boolean(touched.name && errors.name)}
                          fullWidth
                          helperText={touched.name && errors.name}
                          label={t('Nome do Supervisor')}
                          name="name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          error={Boolean(touched.email && errors.email)}
                          fullWidth
                          helperText={touched.email && errors.email}
                          label={t('E-mail')}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="email"
                          value={values.email}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} >
                        <TextField
                          error={Boolean(touched.password && errors.password)}
                          fullWidth
                          margin="normal"
                          helperText={touched.password && errors.password}
                          label={t('Senha')}
                          name="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="password"
                          value={values.password}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Autocomplete
                          disablePortal
                          options={roles}
                          renderInput={(params) => (
                            <TextField
                              fullWidth
                              {...params}
                              label={t('Permissões')}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions
                sx={{
                  p: 3
                }}
              >
                <Button color="secondary" onClick={handleCreateEstagiarioClose}>
                  {t('Cancelar')}
                </Button>
                <Button
                  type="submit"
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  disabled={Boolean(errors.submit) || isSubmitting}
                  variant="contained"
                >
                  {t('Criar Estagiário')}
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="md"
        open={openA}
        onClose={handleCreateAtendenteClose}
      >
        <DialogTitle
          sx={{
            p: 3
          }}
        >
          <Typography variant="h4" gutterBottom>
            {t('Criar Atendente')}
          </Typography>
          <Typography variant="subtitle2">
            {t(
              'Preencha os campos abaixo para criar um novo usuário'
            )}
          </Typography>
        </DialogTitle>
        <Formik
          initialValues={{
            email: '',
            name: '',
            password: '',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .max(80, 'Limite máximo de caracteres atingido')
              .required(t('O campo do primeiro nome é obrigatório')),
            email: Yup.string()
              .email(t('O e-mail fornecido deve ser um endereço de e-mail válido'))
              .max(80, 'Limite máximo de caracteres atingido')
              .required(t('O campo e-mail é obrigatório')),
            password: Yup.string()
              .min(8, 'Senha deve ter mais de 8 caracteres')
              .max(80, 'Senha muito longa')
              .required(t('O campo de senha é necessária'))
          })}

          onSubmit={async (
            _values,
            { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            try {
              await wait(1000);
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              await register(_values.email, _values.name,_values.password);
              handleCreateAtendenteSuccess();
            } catch (err) {
              console.error(err);
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent
                dividers
                sx={{
                  p: 3
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={20}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} >
                        <TextField
                          error={Boolean(touched.name && errors.name)}
                          fullWidth
                          helperText={touched.name && errors.name}
                          label={t('Nome do Atendente')}
                          name="name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.name}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          error={Boolean(touched.email && errors.email)}
                          fullWidth
                          helperText={touched.email && errors.email}
                          label={t('E-mail')}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="email"
                          value={values.email}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} >
                        <TextField
                          error={Boolean(touched.password && errors.password)}
                          fullWidth
                          margin="normal"
                          helperText={touched.password && errors.password}
                          label={t('Senha')}
                          name="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="password"
                          value={values.password}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Autocomplete
                          disablePortal
                          options={roles}
                          renderInput={(params) => (
                            <TextField
                              fullWidth
                              {...params}
                              label={t('Permissões')}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions
                sx={{
                  p: 3
                }}
              >
                <Button color="secondary" onClick={handleCreateAtendenteClose}>
                  {t('Cancelar')}
                </Button>
                <Button
                  type="submit"
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  disabled={Boolean(errors.submit) || isSubmitting}
                  variant="contained"
                >
                  {t('Criar Atendente')}
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}

export default TrainingPrograms;
