import Head from 'next/head';

import ExtendedSidebarLayout from 'src/layouts/ExtendedSidebarLayout';
import { Authenticated } from 'src/components/Authenticated';

import DashboardSliderContent from '@/content/DashboardPages/MainSlider';

function DashboardSlider() {
  return (
    <>
      <Head>
        <title>Main - Cefisio</title>
      </Head>
      <DashboardSliderContent />
    </>
  );
}

DashboardSlider.getLayout = (page) => (
  <Authenticated>
    <ExtendedSidebarLayout>{page}</ExtendedSidebarLayout>
  </Authenticated>
);

export default DashboardSlider;
