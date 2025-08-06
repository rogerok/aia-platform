'use client';

import { plainToInstance } from 'class-transformer';
import { makeAutoObservable, runInAction } from 'mobx';

import { routes } from '@/lib/constants/routes';
import { errorHandle } from '@/lib/decorators/errorHandle';
import { successNotify } from '@/lib/decorators/successNotify';
import { MobxForm } from '@/lib/form/mobxForm';
import { MeetingEditModel, MeetingModel } from '@/lib/models/meetings/meetings';
import { createStoreContext } from '@/lib/storeAdapter/storeAdapter';
import { BooleanToggleStore } from '@/lib/stores/booleanToggleStore';
import { RequestStore } from '@/lib/stores/requestStore';
import { useRootStore } from '@/lib/stores/rootStore';
import { RouterStore } from '@/lib/stores/routerStore';
import { trpcClient } from '@/trpc/client/trpcClient';

const formDefaultValues: MeetingEditModel = {
  agentId: '',
  id: '',
  name: '',
};

class MeetingStore {
  deleteDialog = new BooleanToggleStore(false);

  deleteRequest = new RequestStore(trpcClient.meetings.delete.mutate);
  editDialog = new BooleanToggleStore(false);
  editForm = new MobxForm<MeetingEditModel>({
    defaultValues: formDefaultValues,
    onSubmit: () => this.submitForm(),
  });
  editRequest = new RequestStore(trpcClient.meetings.update.mutate);
  meeting: MeetingModel | null = null;

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

    if (this.meeting) {
      this.editForm.resetForm({
        agentId: this.meeting.agentId,
        id: this.meeting.id,
        name: this.meeting.name,
      });
    }
  }

  @errorHandle()
  @successNotify('Meeting was deleted')
  async delete() {
    if (this.meeting) {
      const resp = await this.deleteRequest.execute({
        id: this.meeting.id,
      });
      if (resp.status === 'success') {
        this.router.navigate(routes.meetings());
      }
    }
  }

  hydrate(data: MeetingModel) {
    this.meeting = data;
    this.editForm.resetForm({
      agentId: this.meeting.agentId,
      id: this.meeting.id,
      name: this.meeting.name,
    });
  }

  @errorHandle()
  @successNotify('Meeting was updated')
  async submitForm(): Promise<void> {
    const resp = await this.editRequest.execute(this.editForm.values);

    if (resp.status === 'success') {
      runInAction(() => {
        this.meeting = plainToInstance(MeetingModel, resp.data);
      });
    }
  }
}

const { createProvider, useStore, useStoreHydration } =
  createStoreContext<MeetingStore>();

export const useMeetingStore = useStore;
export const useMeetingStoreHydration = useStoreHydration;

export const MeetingStoreProvider = createProvider(
  () => new MeetingStore(useRootStore().router),
);
