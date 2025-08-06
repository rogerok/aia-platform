import Image from 'next/image';
import { FC } from 'react';

interface MeetingStatusIndicatorProps {
  description: string;
  iconPath: string;
  title: string;
}

export const MeetingStatusIndicator: FC<MeetingStatusIndicatorProps> = (
  props,
) => {
  const { description, iconPath, title } = props;

  return (
    <div
      className={
        'flex flex-col items-center justify-center gap-y-8 rounded-lg bg-white px-4 py-5'
      }
    >
      <div className={'flex flex-col items-center justify-center'}>
        <Image alt={'empty'} height={240} src={iconPath} width={240} />
        <div className={'mx-auto flex max-w-md flex-col gap-y-6 text-center'}>
          <h6 className={'text-lg font-medium'}>{title}</h6>
          <p className={'text-sm'}>{description}</p>
        </div>
      </div>
    </div>
  );
};
