import {
  StreamTheme,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { CallShowConstant } from '@/_pages/call/constants/constants';
import { useCallStore } from '@/_pages/call/store/callStore';
import { CallLobby } from '@/_pages/call/ui/CallLobby';

export const CallUi: FC = observer(() => {
  const { callShow, meeting } = useCallStore();
  const { useCameraState } = useCallStateHooks();

  return (
    <StreamTheme className={'h-full'}>
      {callShow === CallShowConstant.lobby && <CallLobby />}
      {callShow === CallShowConstant.call && <p>Call</p>}
      {callShow === CallShowConstant.ended && <p>Ended</p>}
    </StreamTheme>
  );
});
