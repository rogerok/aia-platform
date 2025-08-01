'use client';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { plainToInstance } from 'class-transformer';
import { makeAutoObservable, runInAction } from 'mobx';

import { errorHandle } from '@/lib/decorators/errorHandle';
import { successNotify } from '@/lib/decorators/successNotify';
import { MobxForm } from '@/lib/form/mobxForm';
import { AgentModel, AgentsListModel } from '@/lib/models/agents/agents';
import {
  MeetingCreateModel,
  MeetingModel,
  MeetingsListModel,
  MeetingsQueryModel,
} from '@/lib/models/meetings/meetings';
import { createStoreContext } from '@/lib/storeAdapter/storeAdapter';
import { BooleanToggleStore } from '@/lib/stores/booleanToggleStore';
import { RequestStore } from '@/lib/stores/requestStore';
import { useRootStore } from '@/lib/stores/rootStore';
import { RouterStore } from '@/lib/stores/routerStore';
import { debounce } from '@/lib/utils/debounce';
import { trpcClient } from '@/trpc/client/trpcClient';

class MeetingsStore {
  agents: AgentsListModel = new AgentsListModel();

  dialog = new BooleanToggleStore(false);

  form = new MobxForm<MeetingCreateModel>({
    defaultValues: new MeetingCreateModel(),
    onSubmit: (data) => this.submitMeeting(data),
    resolver: classValidatorResolver(MeetingCreateModel),
  });

  getAgentsDebounced = debounce(() => {
    void this.getAgents();
  }, 300);

  getAgentsRequest = new RequestStore(trpcClient.agents.getMany.query);
  getMeetingsRequest = new RequestStore(trpcClient.meetings.getMany.query);

  meetings: MeetingsListModel = new MeetingsListModel();
  router: RouterStore;
  searchAgentsTerm: string = '';

  submitRequest = new RequestStore(trpcClient.meetings.create.mutate);

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
    this.searchAgentsTerm = '';
    this.form.resetForm();
    this.dialog.setFalse();
  }

  @errorHandle()
  async getAgents() {
    console.log(this.searchAgentsTerm);

    const resp = await this.getAgentsRequest.execute({
      page: 1,
      pageSize: 100,
      search: this.searchAgentsTerm,
    });

    if (resp.status === 'success') {
      runInAction(
        () =>
          (this.agents = new AgentsListModel({
            items: resp.data.items.map((agent) =>
              plainToInstance(AgentModel, agent),
            ),
            total: resp.data.total,
            totalPages: resp.data.totalPages,
          })),
      );
    }
  }

  @errorHandle()
  async getMeetings(params: MeetingsQueryModel) {
    const resp = await this.getMeetingsRequest.execute(params);

    if (resp.status === 'success') {
      runInAction(() => {
        this.meetings = new MeetingsListModel({
          items: resp.data.items.map((meeting) =>
            plainToInstance(MeetingModel, meeting),
          ),
          total: resp.data.total,
          totalPages: resp.data.totalPages,
        });
      });
    }
  }

  hydrate(data: MeetingsListModel) {
    this.meetings = data;
  }

  async searchAgents(search: string) {
    this.searchAgentsTerm = search;
    this.getAgentsDebounced();
  }

  @errorHandle()
  @successNotify('Meeting was created')
  async submitMeeting(data: MeetingCreateModel): Promise<void> {
    const resp = await this.submitRequest.execute(data);
    // TODO: check if error and if error code is FORBIDDEN then redirect to '/upgrade'

    if (resp.status === 'success') {
      runInAction(() => {
        this.closeFormDialog();
      });

      await this.getMeetings(new MeetingsQueryModel());
    }
  }

  get isAgentsLoading(): boolean {
    return this.getAgentsRequest.isLoading;
  }
}

const { createProvider, useStore, useStoreHydration } =
  createStoreContext<MeetingsStore>();

export const useMeetingsStore = useStore;

export const useMeetingsStoreHydration = useStoreHydration;

export const MeetingsStoreProvider = createProvider(
  () => new MeetingsStore(useRootStore().router),
);
