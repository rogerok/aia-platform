'use client';

import { makeAutoObservable } from 'mobx';

import { AgentModel } from '@/lib/models/agents/agents';
import { createStoreContext } from '@/lib/storeAdapter/storeAdapter';

class AgentStore {
  data: AgentModel | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  hydrate(data: AgentModel) {
    this.data = data;
  }
}

const { createProvider, useStore, useStoreHydration } =
  createStoreContext<AgentStore>();

export const useAgentStore = useStore;
export const useAgentStoreHydration = useStoreHydration;

export const AgentStoreProvider = createProvider(() => new AgentStore());
