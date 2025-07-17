'use client';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { makeAutoObservable, runInAction } from 'mobx';

import { errorHandle } from '@/lib/decorators/errorHandle';
import { successNotify } from '@/lib/decorators/successNotify';
import { MobxForm } from '@/lib/form/mobxForm';
import { AgentCreateModel, AgentModel } from '@/lib/models/agents';
import { createStoreContext } from '@/lib/storeAdapter/storeAdapter';
import { BooleanToggleStore } from '@/lib/stores/booleanToggleStore';
import { RequestStore } from '@/lib/stores/requestStore';
import { useRootStore } from '@/lib/stores/rootStore';
import { RouterStore } from '@/lib/stores/routerStore';
import { trpcClient } from '@/trpc/client/trpcClient';

export class AgentsStore {
  data: AgentModel[] = [];
  dialog = new BooleanToggleStore(false);

  form = new MobxForm<AgentCreateModel>({
    defaultValues: {
      instructions: '',
      name: '',
    },
    onSubmit: (data) => this.submitAgent(data),
    resolver: classValidatorResolver(AgentCreateModel),
  });

  getAgentsRequest = new RequestStore(trpcClient.agents.getMany.query);

  router: RouterStore;

  submitRequest = new RequestStore(trpcClient.agents.create.mutate);

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

  closeFormDialog() {
    this.dialog.setFalse();
    this.form.resetForm();
  }

  @errorHandle()
  async getAgents() {
    const resp = await this.getAgentsRequest.execute();

    if (resp.status === 'success') {
      runInAction(() => (this.data = resp.data));
    }
  }

  init(data: AgentModel[]): void {
    this.data.push(...data);
  }

  @errorHandle()
  @successNotify('Agent was created')
  async submitAgent(data: AgentCreateModel): Promise<void> {
    const resp = await this.submitRequest.execute(data);
    // TODO: check if error and if error code is FORBIDDEN then redirect to '/upgrade'

    if (resp.status === 'success') {
      runInAction(() => {
        this.closeFormDialog();
      });
      await this.getAgents();
    }
  }
}

const { createProvider, useStore, useStoreHydration } =
  createStoreContext<AgentsStore>();

export const useAgentsStore = useStore;
export const useAgentsStoreHydration = useStoreHydration;

export const AgentsStoreProvider = createProvider(
  () => new AgentsStore(useRootStore().router),
);
