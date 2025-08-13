'use client';

import {
  Call,
  CallingState,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { makeAutoObservable, runInAction } from 'mobx';

import {
  CallShowConstant,
  CallShowValuesType,
} from '@/_pages/call/constants/constants';
import { errorHandle } from '@/lib/decorators/errorHandle';
import { MeetingModel } from '@/lib/models/meetings/meetings';
import { createStoreContext } from '@/lib/storeAdapter/storeAdapter';

class CallStore {
  call: Call | null = null;

  callingState: CallingState = CallingState.UNKNOWN;

  callShow: CallShowValuesType = CallShowConstant.lobby;

  hasCameraPermission = false;

  hasMicrophonePermission = false;

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
    if (!this.streamVideoClient) {
      return;
    }

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

  @errorHandle()
  async handleJoin() {
    if (this.call) {
      this.setCallShow(CallShowConstant.call);
      await this.call.join();
    }
  }

  @errorHandle()
  async handleLeave() {
    if (this.call) {
      this.setCallShow(CallShowConstant.ended);
      await this.call.leave();
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
      const call = this.streamVideoClient.call('default', this.meeting.id);
      void call.camera.disable();
      void call.microphone.disable();

      runInAction(() => {
        this.call = call;
        this.subscribeCameraPermission();
        this.subscribeMicrophonePermission();
        this.subscribeCallState();
      });
    }
  }

  setCallingState(state: CallingState) {
    this.callingState = state;
  }

  setCallShow(show: CallShowValuesType) {
    this.callShow = show;
  }

  setCameraPermission(permission: boolean) {
    this.hasCameraPermission = permission;
  }

  setMicrophonePermission(permission: boolean) {
    this.hasMicrophonePermission = permission;
  }

  subscribeCallState() {
    this.call?.state.callingState$.subscribe(this.setCallingState);
  }

  subscribeCameraPermission() {
    this.call?.camera.state.hasBrowserPermission$.subscribe(
      this.setCameraPermission,
    );
  }

  subscribeMicrophonePermission() {
    this.call?.microphone.state.hasBrowserPermission$.subscribe(
      this.setMicrophonePermission,
    );
  }

  get isJoiningToCall() {
    return this.callingState === CallingState.JOINING;
  }
}

const { createProvider, useStore, useStoreHydration } =
  createStoreContext<CallStore>();

export const useCallStore = useStore;

export const useCallStoreHydration = useStoreHydration;
export const CallStoreContext = createProvider(() => new CallStore());
