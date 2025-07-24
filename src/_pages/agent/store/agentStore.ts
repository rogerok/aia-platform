'use client';

import { makeAutoObservable } from 'mobx';

import { routes } from '@/lib/constants/routes';
import { errorHandle } from '@/lib/decorators/errorHandle';
import { successNotify } from '@/lib/decorators/successNotify';
import { AgentModel } from '@/lib/models/agents/agents';
import { createStoreContext } from '@/lib/storeAdapter/storeAdapter';
import { BooleanToggleStore } from '@/lib/stores/booleanToggleStore';
import { RequestStore } from '@/lib/stores/requestStore';
import { useRootStore } from '@/lib/stores/rootStore';
import { RouterStore } from '@/lib/stores/routerStore';
import { trpcClient } from '@/trpc/client/trpcClient';

class AgentStore {
  agent: AgentModel | null = null;

  deleteDialog = new BooleanToggleStore(false);
  deleteRequest = new RequestStore(trpcClient.agents.delete.mutate);

  editDialog = new BooleanToggleStore(false);

  router: RouterStore;

  constructor(router: RouterStore) {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );

    this.router = router;
  }

  @errorHandle()
  @successNotify('Agent was deleted')
  async delete() {
    if (this.agent) {
      const resp = await this.deleteRequest.execute({
        id: this.agent.id,
      });
      if (resp.status === 'success') {
        this.router.navigate(routes.agents());
      }
    }
  }

  hydrate(data: AgentModel) {
    this.agent = data;
  }
}

const { createProvider, useStore, useStoreHydration } =
  createStoreContext<AgentStore>();

export const useAgentStore = useStore;
export const useAgentStoreHydration = useStoreHydration;

export const AgentStoreProvider = createProvider(
  () => new AgentStore(useRootStore().router),
);
