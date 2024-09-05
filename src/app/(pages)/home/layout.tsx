import PageLayout from '../../(layout)/layout';

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <PageLayout>{children}</PageLayout>;
};

export default HomeLayout;
