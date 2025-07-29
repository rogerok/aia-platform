import { makeAutoObservable } from 'mobx';

import { createStoreContext } from '@/lib/storeAdapter/storeAdapter';

class MeetingsStore {
  constructor() {
    makeAutoObservable(this);
  }
}

const { createProvider, useStore, useStoreHydration } =
  createStoreContext<MeetingsStore>();

export const useMeetingsStore = useStore;

export const useMeetingsStoreHydration = useStoreHydration;
