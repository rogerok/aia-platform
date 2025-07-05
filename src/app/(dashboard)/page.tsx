import { Dashboard } from '@/_pages/dashboard/ui/Dashboard';
import { handleIsNotAuth } from '@/lib/authActions';

const Page = async () => {
  await handleIsNotAuth();

  return <Dashboard />;
};

export default Page;
