import Image from 'next/image';
import { FC } from 'react';

interface EmptyListIndicatorProps {
  description?: string;
  title?: string;
}

export const EmptyListIndicator: FC<EmptyListIndicatorProps> = (props) => {
  const { description, title = 'List is empty' } = props;

  return (
    <div className={'flex flex-col items-center justify-center'}>
      <Image alt={'empty'} height={240} src={'./empty.svg'} width={240} />
      <div className={'mx-auto flex max-w-md flex-col gap-y-6 text-center'}>
        <h6 className={'text-lg font-medium'}>{title}</h6>
        {description && <p className={'text-sm'}>{description}</p>}
      </div>
    </div>
  );
};
