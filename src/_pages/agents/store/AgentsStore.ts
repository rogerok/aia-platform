'use client';
import 'client-only';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { makeAutoObservable, runInAction } from 'mobx';

import { errorHandle } from '@/lib/decorators/errorHandle';
import { successNotify } from '@/lib/decorators/successNotify';
import { MobxForm } from '@/lib/form/mobxForm';
import {
  AgentCreateModel,
  AgentsListModel,
  AgentsQueryModel,
} from '@/lib/models/agents/agents';
import { createStoreContext } from '@/lib/storeAdapter/storeAdapter';
import { BooleanToggleStore } from '@/lib/stores/booleanToggleStore';
import { RequestStore } from '@/lib/stores/requestStore';
import 'reflect-metadata';

import { useRootStore } from '@/lib/stores/rootStore';
import { RouterStore } from '@/lib/stores/routerStore';
import { SearchParamsHandler } from '@/lib/utils/searchParamsHandler';
import { trpcClient } from '@/trpc/client/trpcClient';

export class AgentsStore {
  data: AgentsListModel = new AgentsListModel();

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

  searchParamsHandler: SearchParamsHandler<AgentsQueryModel> | undefined;

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
  async getAgents(params: AgentsQueryModel) {
    const resp = await this.getAgentsRequest.execute(params);

    if (resp.status === 'success') {
      runInAction(() => (this.data = new AgentsListModel(resp.data)));
    }
  }

  hydrate(data: AgentsListModel): void {
    this.data = new AgentsListModel(data);
    this.searchParamsHandler = new SearchParamsHandler(AgentsQueryModel);
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

      await this.getAgents(
        this.searchParamsHandler?.getPlain() ?? new AgentsQueryModel(),
      );
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
