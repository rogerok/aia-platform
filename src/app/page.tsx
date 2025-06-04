import { Comp } from './Comp';

interface PageProps {
  className?: string;
}

const Page = async (props: PageProps) => {
  return (
    <div className={'flex border-2 text-4xl font-bold text-gray-600'}>
      <Comp />
    </div>
  );
};

export default Page;
