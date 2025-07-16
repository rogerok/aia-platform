'use client';

import { makeAutoObservable } from 'mobx';

import { MobxForm } from '@/lib/form/mobxForm';
import { AgentCreateModel, AgentModel } from '@/lib/models/agents';
import { createStoreContext } from '@/lib/storeAdapter/storeAdapter';
import { BooleanToggleStore } from '@/lib/stores/booleanToggleStore';
import { useRootStore } from '@/lib/stores/rootStore';
import { RouterStore } from '@/lib/stores/routerStore';

export class AgentsStore {
  data: AgentModel[] = [];
  dialog = new BooleanToggleStore(false);
  form = new MobxForm<AgentCreateModel>({
    defaultValues: {
      instructions: '',
      name: '',
    },
  });
  router: RouterStore;

  constructor(router: RouterStore) {
    makeAutoObservable(this);

    this.router = router;
  }

  init(data: AgentModel[]) {
    this.data.push(...data);
  }
}

const { createProvider, useStore, useStoreHydration } =
  createStoreContext<AgentsStore>();

export const useAgentsStore = useStore;
export const useAgentsStoreHydration = useStoreHydration;

export const AgentsStoreProvider = createProvider(
  () => new AgentsStore(useRootStore().router),
);
