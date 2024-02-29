import { useState, useCallback, ChangeEvent, useEffect } from 'react';

import Head from 'next/head';

import ExtendedSidebarLayout from 'src/layouts/ExtendedSidebarLayout';
import { Authenticated } from 'src/components/Authenticated';

import Footer from 'src/components/Footer';
import { Box, Tabs, Tab, Grid, styled } from '@mui/material';

import type { User } from 'src/models/user';
import { usersApi } from 'src/mocks/users';

import type { Session } from 'src/models/session';
import { sessionsApi } from 'src/mocks/sessions';

import { useRefMounted } from 'src/hooks/useRefMounted';
import { useTranslation } from 'react-i18next';

import ProfileCover from 'src/content/Management/Users/single/ProfileCover';
import EditProfileTab from 'src/content/Management/Users/single/EditProfileTab';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

function ManagementUsersView() {
  const isMountedRef = useRefMounted();
  const [user, setUser] = useState<User | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const { t }: { t: any } = useTranslation();
  const [currentTab, setCurrentTab] = useState<string>('edit_profile');

  const tabs = [
    { value: 'edit_profile', label: t('Editar Usuário') },
  ];

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  const getSessions = useCallback(async () => {
    try {
      const response = await sessionsApi.getSessions();

      if (isMountedRef()) {
        setSessions(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getSessions();
  }, [getSessions]);

  const getUser = useCallback(async () => {
    try {
      const response = await usersApi.getUser();

      if (isMountedRef()) {
        setUser(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (!user) {
    return null;
  }
  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };
  return (
    <>
      <Head>
        <title>{user.name} - Detalhes do Perfil</title>
      </Head>
      <Box sx={{ mt: 3 }}>
        <Grid
          sx={{ px: 4 }}
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <ProfileCover user={user} />
          </Grid>
          <Grid item xs={12} md={4}>
          </Grid>
          <Grid item xs={12}>
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid>
          <Grid item xs={12}>
            {currentTab === 'edit_profile' && <EditProfileTab sessions={sessions} user={user} onUpdateUser={handleUpdateUser}/>}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
}

ManagementUsersView.getLayout = (page) => (
  <Authenticated>
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
  </Authenticated>
);

export default ManagementUsersView;
