import { FC } from 'react';
import PropTypes from 'prop-types';
import type { User } from 'src/models/user';
import {
  Box,
  Typography,
  Tooltip,
  IconButton,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

interface ProfileCoverProps {
  user: User;
}

const ProfileCover: FC<ProfileCoverProps> = ({ user }) => {
  const { t }: { t: any } = useTranslation();

  return (
    <>
      <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" title={t('Voltar')}>
          <IconButton
            href="/management/users"
            color="primary"
            sx={{
              p: 2,
              mr: 2
            }}
          >
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Box>
          <Box display="flex" alignItems="flex-start">
            <Typography variant="h3" component="h3" gutterBottom pr={1}>
              {user.name}
            </Typography>
            </Box>
          <Typography variant="subtitle2">
            {t('Visualize e edite os dados do usuário')}
          </Typography>
          
        </Box>
      </Box>
    </>
  );
};

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired
};

export default ProfileCover;
