'use client';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { plainToInstance } from 'class-transformer';
import { makeAutoObservable, runInAction } from 'mobx';

import { errorHandle } from '@/lib/decorators/errorHandle';
import { successNotify } from '@/lib/decorators/successNotify';
import { MobxForm } from '@/lib/form/mobxForm';
import { AgentsListModel } from '@/lib/models/agents/agents';
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
import { SearchParamsHandler } from '@/lib/utils/searchParamsHandler';
import { trpcClient } from '@/trpc/client/trpcClient';

class MeetingsStore {
  agents: AgentsListModel = new AgentsListModel();

  createMeetingRequest = new RequestStore(trpcClient.meetings.create.mutate);

  dialog = new BooleanToggleStore(false);

  form = new MobxForm<MeetingCreateModel>({
    defaultValues: new MeetingCreateModel(),
    onSubmit: (data) => this.submitMeeting(data),
    resolver: classValidatorResolver(MeetingCreateModel),
  });

  getMeetingsRequest = new RequestStore(trpcClient.meetings.getMany.query);

  meetings: MeetingsListModel = new MeetingsListModel();

  router: RouterStore;
  searchAgentsTerm: string = '';

  searchForm = new MobxForm<MeetingsQueryModel>({
    defaultValues: new MeetingsQueryModel(),
    onSubmit: (data) => this.submitFilterForm(data),
  });
  searchParamsHandler: SearchParamsHandler<MeetingsQueryModel> | null = null;

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

  async handlePaginationChange(page: number) {
    if (this.searchParamsHandler) {
      this.searchParamsHandler.setQueryParams({
        ...this.searchParamsHandler.params,
        page,
      });
    }
  }

  hydrate(data: MeetingsListModel) {
    this.meetings = data;
    this.searchParamsHandler = new SearchParamsHandler(MeetingsQueryModel);
  }

  async submitFilterForm(data: MeetingsQueryModel) {
    this.searchParamsHandler?.setQueryParams({
      ...new MeetingsQueryModel(),
      agentId: data.agentId,
      search: data.search,
      status: data.status,
    });
  }

  @errorHandle()
  @successNotify('Meeting was created')
  async submitMeeting(data: MeetingCreateModel): Promise<void> {
    const resp = await this.createMeetingRequest.execute(data);
    // TODO: check if error and if error code is FORBIDDEN then redirect to '/upgrade'

    if (resp.status === 'success') {
      runInAction(() => {
        this.closeFormDialog();
      });

      this.searchParamsHandler?.setQueryParams(new MeetingsQueryModel(), false);

      await this.getMeetings(new MeetingsQueryModel());
    }
  }
}

const { createProvider, useStore, useStoreHydration } =
  createStoreContext<MeetingsStore>();

export const useMeetingsStore = useStore;

export const useMeetingsStoreHydration = useStoreHydration;

export const MeetingsStoreProvider = createProvider(
  () => new MeetingsStore(useRootStore().router),
);
