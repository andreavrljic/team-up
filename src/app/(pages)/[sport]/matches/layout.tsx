import PageLayout from '../../../(layout)/layout';

const GamesListLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <PageLayout>{children}</PageLayout>;
};

export default GamesListLayout;
