import { SignIn } from '@/_pages/signIn/ui/SignIn';
import { handleIsAuth } from '@/lib/authActions';

const Page = async () => {
  await handleIsAuth();

  return <SignIn />;
};

export default Page;
