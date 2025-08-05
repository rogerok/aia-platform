import { plainToInstance } from 'class-transformer';
import { makeAutoObservable, runInAction } from 'mobx';

import { errorHandle } from '@/lib/decorators/errorHandle';
import { AgentModel, AgentsListModel } from '@/lib/models/agents/agents';
import { RequestStore } from '@/lib/stores/requestStore';
import { debounce } from '@/lib/utils/debounce';
import { trpcClient } from '@/trpc/client/trpcClient';

export class AgentSelectStore {
  agents: AgentsListModel = new AgentsListModel();
  getAgentsDebounced = debounce(() => {
    void this.getAgents();
  }, 300);
  getAgentsRequest = new RequestStore(trpcClient.agents.getMany.query);
  searchTerm: string = '';

  constructor() {
    makeAutoObservable(
      this,
      {},
      {
        autoBind: true,
      },
    );
  }

  @errorHandle()
  async getAgents() {
    const resp = await this.getAgentsRequest.execute({
      page: 1,
      pageSize: 100,
      search: this.searchTerm,
    });

    if (resp.status === 'success') {
      runInAction(() =>
        this.setAgents(
          new AgentsListModel({
            items: resp.data.items.map((agent) =>
              plainToInstance(AgentModel, agent),
            ),
            total: resp.data.total,
            totalPages: resp.data.totalPages,
          }),
        ),
      );
    }
  }

  async handleSelectOpen(isOpen?: boolean) {
    if (isOpen) {
      await this.getAgents();
    } else {
      this.setAgents(new AgentsListModel());
      this.searchTerm = '';
    }
  }

  searchAgents(search: string) {
    this.searchTerm = search;
    this.getAgentsDebounced();
  }

  setAgents(agents: AgentsListModel) {
    this.agents = agents;
  }

  get isLoading(): boolean {
    return this.getAgentsRequest.isLoading;
  }
}
