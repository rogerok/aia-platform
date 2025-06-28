import { SignUp } from '@/_pages/signUp/ui/SignUp';
import { handleIsAuth } from '@/lib/authActions';

const Page = async () => {
  await handleIsAuth();

  return <SignUp />;
};

export default Page;
