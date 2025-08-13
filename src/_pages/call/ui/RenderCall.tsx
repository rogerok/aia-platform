import { StreamTheme } from '@stream-io/video-react-sdk';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { CallShowConstant } from '@/_pages/call/constants/constants';
import { useCallStore } from '@/_pages/call/store/callStore';
import { CallActive } from '@/_pages/call/ui/CallActive';
import { CallEnded } from '@/_pages/call/ui/CallEnded';
import { CallLobby } from '@/_pages/call/ui/CallLobby';

export const RenderCall: FC = observer(() => {
  const { callShow } = useCallStore();

  let content = null;

  switch (callShow) {
    case CallShowConstant.lobby:
      content = <CallLobby />;
      break;

    case CallShowConstant.call:
      content = <CallActive />;
      break;

    case CallShowConstant.ended:
      content = <CallEnded />;
      break;
  }

  return <StreamTheme className={'h-full'}>{content}</StreamTheme>;
});
