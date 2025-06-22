import { SignInStoreProvider } from '@/_pages/signIn/stores/signInStore';
import { SignIn } from '@/_pages/signIn/ui/SignIn';

const Page = () => {
  return (
    <SignInStoreProvider>
      <SignIn />
    </SignInStoreProvider>
  );
};

export default Page;
