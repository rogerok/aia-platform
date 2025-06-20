import { SignInStoreProvider } from '@/modules/auth/stores/signInStore';
import { SignIn } from '@/modules/auth/ui/signIn/SignIn';

const Page = () => {
  return (
    <SignInStoreProvider>
      <SignIn />
    </SignInStoreProvider>
  );
};

export default Page;
