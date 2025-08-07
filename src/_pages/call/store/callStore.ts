'use client';

import { makeAutoObservable } from 'mobx';

import { MeetingModel } from '@/lib/models/meetings/meetings';
import { createStoreContext } from '@/lib/storeAdapter/storeAdapter';

class CallStore {
  meeting: MeetingModel = new MeetingModel();

  constructor() {
    makeAutoObservable(this);
  }

  hydrate(meeting: MeetingModel) {
    this.meeting = meeting;
  }
}

const { createProvider, useStore, useStoreHydration } =
  createStoreContext<CallStore>();

export const useCallStore = useStore;

export const useCallStoreHydration = useStoreHydration;

export const CallStoreContext = createProvider(() => new CallStore());
