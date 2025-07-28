'use client';

import { makeAutoObservable, runInAction } from 'mobx';

import { routes } from '@/lib/constants/routes';
import { errorHandle } from '@/lib/decorators/errorHandle';
import { successNotify } from '@/lib/decorators/successNotify';
import { MobxForm } from '@/lib/form/mobxForm';
import { AgentEditModel, AgentModel } from '@/lib/models/agents/agents';
import { createStoreContext } from '@/lib/storeAdapter/storeAdapter';
import { BooleanToggleStore } from '@/lib/stores/booleanToggleStore';
import { RequestStore } from '@/lib/stores/requestStore';
import { useRootStore } from '@/lib/stores/rootStore';
import { RouterStore } from '@/lib/stores/routerStore';
import { trpcClient } from '@/trpc/client/trpcClient';

const formDefaultValues: AgentEditModel = {
  id: '',
  instructions: '',
  name: '',
};

class AgentStore {
  agent: AgentModel | null = null;

  deleteDialog = new BooleanToggleStore(false);
  deleteRequest = new RequestStore(trpcClient.agents.delete.mutate);
  editDialog = new BooleanToggleStore(false);
  editForm = new MobxForm<AgentEditModel>({
    defaultValues: formDefaultValues,
    onSubmit: () => this.submitForm(),
  });
  editRequest = new RequestStore(trpcClient.agents.update.mutate);

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

  closeEditForm(): void {
    this.editDialog.setFalse();

    if (this.agent) {
      this.editForm.resetForm({
        id: this.agent.id,
        instructions: this.agent.instructions,
        name: this.agent.name,
      });
    }
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
    this.editForm.resetForm({
      id: this.agent.id,
      instructions: this.agent.instructions,
      name: this.agent.name,
    });
  }

  @errorHandle()
  @successNotify('Agent was updated')
  async submitForm(): Promise<void> {
    const resp = await this.editRequest.execute(this.editForm.values);

    if (resp.status === 'success') {
      runInAction(() => {
        this.agent = resp.data;
      });
    }
  }
}

const { createProvider, useStore, useStoreHydration } =
  createStoreContext<AgentStore>();

export const useAgentStore = useStore;
export const useAgentStoreHydration = useStoreHydration;

export const AgentStoreProvider = createProvider(
  () => new AgentStore(useRootStore().router),
);
