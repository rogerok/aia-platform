interface PageProps {
  className?: string;
}

const Page = async (props: PageProps) => {
  return (
    <div className={'flex border-2 text-4xl font-bold text-gray-600'}>Page</div>
  );
};

export default Page;
