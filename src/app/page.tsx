interface PageProps {
  className?: string;
}

const Page = (props: PageProps) => {
  return (
    <div className={'flex border-2 text-4xl font-bold text-gray-600'}>
      hello
    </div>
  );
};

export default Page;
