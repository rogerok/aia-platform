'use client';

import { makeAutoObservable } from 'mobx';

import { AgentModel } from '@/lib/models/agents';
import { createStoreContext } from '@/lib/storeAdapter/storeAdapter';

export class AgentsStore {
  data: AgentModel[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  init = (data: AgentModel[]) => {
    this.data.push(...data);
  };
}

const { createProvider, useStore, useStoreHydration } =
  createStoreContext<AgentsStore>();

export const useAgentsStore = useStore;
export const useAgentsStoreHydration = useStoreHydration;

export const AgentsStoreProvider = createProvider(() => new AgentsStore());
