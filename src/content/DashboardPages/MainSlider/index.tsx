import dynamic from 'next/dynamic';

import PageHeader from '@/content/Dashboards/Slider/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Footer from 'src/components/Footer';

import { Grid } from '@mui/material';

const TrainingPrograms = dynamic(
  () => import('@/content/Dashboards/Slider/SliderPage'),
  { ssr: true }
);

function DashboardSliderContent() {
  return (
    <>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Grid
        sx={{ px: 4 }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item lg={6} xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TrainingPrograms />
        </Grid>

        <Grid item md={6} xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
          </Grid>
        </Grid>
      </Grid>

      <Footer />
    </>
  );
}

export default DashboardSliderContent;
