'use client';

import {
  Call,
  CallingState,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { makeAutoObservable } from 'mobx';

import {
  CallShowConstant,
  CallShowValuesType,
} from '@/_pages/call/constants/constants';
import { errorHandle } from '@/lib/decorators/errorHandle';
import { MeetingModel } from '@/lib/models/meetings/meetings';
import { createStoreContext } from '@/lib/storeAdapter/storeAdapter';

class CallStore {
  call: Call | null = null;

  callShow: CallShowValuesType = CallShowConstant.lobby;

  meeting: MeetingModel = new MeetingModel();

  streamVideoClient: StreamVideoClient | null;

  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );
  }

  @errorHandle()
  endCall() {
    if (this.call && this.call.state.callingState !== CallingState.LEFT) {
      void this.call.leave();
      void this.call.endCall();
      this.call = null;
    }
  }

  endStreamVideo() {
    this.streamVideoClient?.disconnectUser();
    this.streamVideoClient = null;
  }

  async handleJoin() {
    if (this.call) {
      await this.call.join();
      this.setCallShow(CallShowConstant.call);
    }
  }

  handleLeave() {
    if (this.call) {
      this.call.leave();
      this.setCallShow(CallShowConstant.ended);
    }
  }

  hydrate(meeting: MeetingModel) {
    this.meeting = meeting;
  }

  initStreamVideoClient(streamClient: StreamVideoClient) {
    this.streamVideoClient = streamClient;
  }

  @errorHandle()
  makeCall() {
    if (this.streamVideoClient) {
      this.call = this.streamVideoClient.call('default', this.meeting.id);
      void this.call.camera.disable();
      void this.call.microphone.disable();
    }
  }

  setCallShow(show: CallShowValuesType) {
    this.callShow = show;
  }

  get hasCameraPermission() {
    let permission = false;
    this.call?.camera.state.hasBrowserPermission$.subscribe(
      (value) => (permission = value),
    );

    return permission;
  }

  get hasMicrophonePermission() {
    let permission = false;

    this.call?.microphone.state.hasBrowserPermission$.subscribe(
      (value) => (permission = value),
    );

    return permission;
  }
}

const { createProvider, useStore, useStoreHydration } =
  createStoreContext<CallStore>();

export const useCallStore = useStore;

export const useCallStoreHydration = useStoreHydration;
export const CallStoreContext = createProvider(() => new CallStore());
