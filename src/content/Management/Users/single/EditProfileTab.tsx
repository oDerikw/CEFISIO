import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  CircularProgress,
  Zoom,
  Select,
  ListItem,
  List,
  ListItemText,
  MenuItem,
  InputLabel,
  FormControl,
  Switch,
  Autocomplete,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import Text from 'src/components/Text';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { User } from '@/models/user';
import { Session } from '@/models/session';
import { FC, useState } from 'react';
import { useSnackbar } from 'notistack';
import Label from 'src/components/Label';
import {
  ChangeEvent,
  ReactElement,
  Ref,
  forwardRef
} from 'react';

import {
  Avatar,
  Slide,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableContainer,
  TableRow,
  styled
} from '@mui/material';
import Link from 'src/components/Link';

import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import LaunchTwoToneIcon from '@mui/icons-material/LaunchTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useAuth } from 'src/hooks/useAuth';
import { wait } from 'src/utils/wait';

const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
);

const AvatarError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.lighter};
      color: ${theme.colors.error.main};
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

interface ProfileCoverProps {
  user: User;
  sessions: Session[];
}

const roles = {
  secretarians: 'Atendente',
  supervisors: 'Supervisor',
  apprentices: 'Estagiario',
  patients: 'Paciente'
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const applyPagination = (
  sessions: Session[],
  page: number,
  limit: number
): Session[] => {
  return sessions.slice(page * limit, page * limit + limit);
};

const getUserRoleLabel = (userRole: string): JSX.Element => {
  const map = {
    secretarians: {
      text: 'Atendente',
      color: 'error'
    },
    patients: {
      text: 'Paciente',
      color: 'info'
    },
    apprentices: {
      text: 'Estagiário',
      color: 'warning'
    },
    supervisors: {
      text: 'Supervisor',
      color: 'success'
    }
  };

  const { text, color }: any = map[userRole];

  return <Label color={color}>{text}</Label>;
};

const getSessionStatusLabel = (userRole: string): JSX.Element => {
  const map = {
    cancelado: {
      text: 'Cancelado',
      color: 'error'
    },
    marcado: {
      text: 'Marcado',
      color: 'warning'
    },
    feito: {
      text: 'Feito',
      color: 'success'
    }
  };

  const { text, color }: any = map[userRole];

  return <Label color={color}>{text}</Label>;
};

const status = [
  { label: 'Feito', value: 'feito' },
  { label: 'Marcado', value: 'marcado' },
  { label: 'Cancelado', value: 'cancelado' },
];

const EditProfileTab: FC<
  ProfileCoverProps & { onUpdateUser: (updatedUser: User) => void }
> = ({ sessions, user, onUpdateUser}) => {
  const { t }: { t: any } = useTranslation();
  const [open, setOpen] = useState(false);

  const [selectedItems] = useState<string[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const { register } = useAuth() as any;

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredUsers = sessions;
  const paginatedUsers = applyPagination(filteredUsers, page, limit);

  const [toggleView] = useState<string | null>('table_view');

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const handleConfirmDelete = () => {
    setOpenConfirmDelete(true);
  };

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleDeleteCompleted = () => {
    setOpenConfirmDelete(false);

    enqueueSnackbar(t('Conta de usuário removida com sucesso'), {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      TransitionComponent: Zoom
    });
  };

  const handleEditUserOpen = () => {
    setOpen(true);
  };

  const handleEditUserClose = () => {
    setOpen(false);
  };

  const handleUserEditSuccess = () => {
    enqueueSnackbar(t('Usuário editado com sucesso.'), {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      TransitionComponent: Zoom
    });
  };

  // Session Handler
  const [openP, setOpen1] = useState(false);
  const handleCreateSessionOpen = () => {
    setOpen1(true);
  };

  const handleCreateSessionClose = () => {
    setOpen1(false);
  };

  const handleCreateSessionSuccess = () => {
    enqueueSnackbar(t('Sessão criada com sucesso'), {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      TransitionComponent: Zoom
    });

    setOpen1(false);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <Box
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h4" gutterBottom>
                  {t('Informações Pessoais')}
                </Typography>
                <Typography variant="subtitle2">
                  {t('Gerencie as informações do usuário')}
                </Typography>
              </Box>
              <Button
                variant="text"
                onClick={handleEditUserOpen}
                startIcon={<EditTwoToneIcon />}
              >
                {t('Editar')}
              </Button>
            </Box>
            <Divider />
            <CardContent
              sx={{
                p: 4
              }}
            >
              <Typography variant="subtitle2">
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={4} md={2}>
                    <Box pr={3} pb={2}>
                      <Text color="black">
                      <b>{t('Nome: ')}</b>
                      {user.name}
                    </Text>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={4} md={2}>
                    <Box pr={3} pb={2}>
                      <Text color="black">
                      <b>{t('Email: ')}</b>
                      {user.email}
                    </Text>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={4} md={2}>
                    <Box color="black" pr={3} pb={2}>
                      <b>{t('Permissão: ')}</b>
                      <Text>{getUserRoleLabel(user.role)}</Text>
                    </Box>
                  </Grid>
                  
                </Grid>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      
        <Grid item xs={12}>
          <Card>
            <Box
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h4" gutterBottom>
                  {t('Sessões do Paciente')}
                </Typography>
                <Typography variant="subtitle2">
                  {t('Gerencie as sessões do paciente')}
                </Typography>
              </Box>
              <Button
                sx={{
                  mt: { xs: 2, sm: 0 }
                }}
                onClick={handleCreateSessionOpen}
                variant="contained"
                startIcon={<AddTwoToneIcon fontSize="small" />}
              >
                {t('Adicionar Sessão')}
            </Button>
            </Box>
            <Divider />
            <CardContent
              sx={{
                p: 4
              }}
            >
          {toggleView === 'table_view' && (
          <Card>
            <Divider />

            {paginatedUsers.length === 0 ? (
              <>
                <Typography
                  sx={{
                    py: 10
                  }}
                  variant="h3"
                  fontWeight="normal"
                  color="text.secondary"
                  align="center"
                >
                  {t("Nenhuma sessão encontrado")}
                </Typography>
              </>
            ) : (
              <>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>{t('ID')}</TableCell>
                        <TableCell >{t('Nome')}</TableCell>
                        <TableCell >{t('Descrição')}</TableCell>
                        <TableCell >{t('Tipo')}</TableCell>
                        <TableCell>{t('Status')}</TableCell>
                        <TableCell align="center">{t('Ações')}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedUsers.map((sessions) => {
                        const isUserSelected = selectedItems.includes(sessions.id);
                        return (
                          <TableRow hover key={sessions.id} selected={isUserSelected}>
                            <TableCell>
                              <Box display="flex" alignItems="center">
                                <Box>
                                  <Link
                                    variant="h5"
                                    href={'/management/users/single/' + sessions.id}
                                  >
                                    {sessions.id}
                                  </Link>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography>{sessions.name}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h5">
                                {sessions.description}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h5">
                                {sessions.type}
                              </Typography>
                            </TableCell>
                            <TableCell>
                            <Typography variant="h5">
                                  {getSessionStatusLabel(sessions.status)}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography noWrap>
                                <Tooltip title={t('Detalhes')} arrow>
                                  <IconButton
                                    href={'/management/users/single/' + sessions.id}
                                    color="primary"
                                  >
                                    <LaunchTwoToneIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title={t('Deletar')} arrow>
                                  <IconButton
                                    onClick={handleConfirmDelete}
                                    color="primary"
                                  >
                                    <DeleteTwoToneIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box p={2}>
                  <TablePagination
                    component="div"
                    count={filteredUsers.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 15]}
                  />
                </Box>
              </>
            )}
          </Card>
        )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Card>
            <Box
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography variant="h4" gutterBottom>
                  {t('Configurações da conta')}
                </Typography>
                <Typography variant="subtitle2">
                  {t('Gerencie as informações da conta')}
                </Typography>
              </Box>
            </Box>
            <Divider />
            <CardContent>
              <List>
                <ListItem
                  sx={{
                    p: 3,
                    pt:0
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                      gutterBottom: true
                    }}
                    secondaryTypographyProps={{
                      variant: 'subtitle2',
                      lineHeight: 1
                    }}
                    primary={t('Trocar senha')}
                    secondary={t('Você pode modificar a senha aqui')}
                  />
                  <Button size="large" variant="outlined">
                    {t('Trocar senha')}
                  </Button>
                </ListItem>
                <Divider component="li" />
                <ListItem
                  sx={{
                    p: 3,
                    pb:0
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{
                      variant: 'h5',
                      gutterBottom: true
                    }}
                    secondaryTypographyProps={{
                      variant: 'subtitle2',
                      lineHeight: 1
                    }}
                    primary={t('Autenticação de dois fatores')}
                    secondary={t(
                      'Ative a verificação por PIN para toda atividade de Login'
                    )}
                  />
                  <Switch color="primary" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleEditUserClose}>
        <DialogTitle
          sx={{
            p: 3
          }}
        >
          <Typography variant="h4" gutterBottom>
            {t('Editar usuário')}
          </Typography>
          <Typography variant="subtitle2">
            {t('Preencha os campos abaixo para editar os dados do usuário')}
          </Typography>
        </DialogTitle>
        <Formik
          initialValues={{
            email: user.email,
            name: user.name,
            role: user.role,
            submit: null
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .max(80, 'Limite máximo de caracteres atingido')
              .required(t('O campo do primeiro nome é obrigatório')),
            email: Yup.string()
              .email(
                t('O e-mail fornecido deve ser um endereço de e-mail válido')
              )
              .max(80, 'Limite máximo de caracteres atingido')
              .required(t('O campo e-mail é obrigatório'))
          })}
          onSubmit={async (
            _values,
            { setErrors, setStatus, setSubmitting }
          ) => {
            try {
              //onUpdateUser(response.data);
              //resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              handleEditUserClose();
              handleUserEditSuccess();
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
                          error={Boolean(
                            touched.name && errors.name
                          )}
                          fullWidth
                          helperText={touched.name && errors.name}
                          label={t('Primeiro Nome')}
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
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <FormControl required fullWidth variant="outlined">
                              <InputLabel id="roleSelect">Perfil</InputLabel>
                              <Select
                                labelId="roleSelect"
                                label="Perfil"
                                value={values.role}
                                onChange={(event) => {
                                  handleChange('role')(event.target.value);
                                }}
                              >
                                {Object.entries(roles).map(([value, label]) => (
                                  <MenuItem key={value} value={value}>
                                    {label}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} lg={5} justifyContent="center">
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexDirection="column"
                      mt={3}
                    >
                      <Divider
                        flexItem
                        sx={{
                          m: 4
                        }}
                      />
                      <Box
                        display="flex"
                        alignItems="center"
                        flexDirection="column"
                        justifyContent="space-between"
                      ></Box>
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions
                sx={{
                  p: 3
                }}
              >
                <Button color="secondary" onClick={handleEditUserClose}>
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
                  {t('Editar Usuário')}
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>

      <DialogWrapper
        open={openConfirmDelete}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={closeConfirmDelete}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          p={5}
        >
          <AvatarError>
            <CloseIcon />
          </AvatarError>

          <Typography
            align="center"
            sx={{
              py: 4,
              px: 6
            }}
            variant="h3"
          >
            {t('Tem certeza de que deseja excluir permanentemente esta conta de usuário')}
            ?
          </Typography>

          <Box>
            <Button
              variant="text"
              size="large"
              sx={{
                mx: 1
              }}
              onClick={closeConfirmDelete}
            >
              {t('Cancelar')}
            </Button>
            <ButtonError
              onClick={handleDeleteCompleted}
              size="large"
              sx={{
                mx: 1,
                px: 3
              }}
              variant="contained"
            >
              {t('Deletar')}
            </ButtonError>
          </Box>
        </Box>
      </DialogWrapper>

      <Dialog
        fullWidth
        maxWidth="md"
        open={openP}
        onClose={handleCreateSessionClose}
      >
        <DialogTitle
          sx={{
            p: 3
          }}
        >
          <Typography variant="h4" gutterBottom>
            {t('Adicionar Sessão')}
          </Typography>
          <Typography variant="subtitle2">
            {t(
              'Preencha os campos abaixo para criar uma nova sessão'
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
              handleCreateSessionSuccess();
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
                      <Grid item xs={12}>
                        <TextField
                          error={Boolean(touched.email && errors.email)}
                          fullWidth
                          helperText={touched.email && errors.email}
                          label={t('Descrição')}
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
                          label={t('Tipo')}
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
                          options={status}
                          renderInput={(params) => (
                            <TextField
                              fullWidth
                              {...params}
                              label={t('Status')}
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
                <Button color="secondary" onClick={handleCreateSessionClose}>
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
    </>
  );
};

export default EditProfileTab;
