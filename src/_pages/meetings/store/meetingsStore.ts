'use client';

import { makeAutoObservable } from 'mobx';

import { MeetingsListModel } from '@/lib/models/meetings/meetings';
import { createStoreContext } from '@/lib/storeAdapter/storeAdapter';

class MeetingsStore {
  data: MeetingsListModel = new MeetingsListModel();

  constructor() {
    makeAutoObservable(this);
  }

  hydrate(data: MeetingsListModel) {
    this.data = data;
  }
}

const { createProvider, useStore, useStoreHydration } =
  createStoreContext<MeetingsStore>();

export const useMeetingsStore = useStore;

export const useMeetingsStoreHydration = useStoreHydration;

export const MeetingsStoreProvider = createProvider(() => new MeetingsStore());
