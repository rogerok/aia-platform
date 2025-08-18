import { makeAutoObservable, reaction, runInAction } from 'mobx';

import { callFunction } from '@/lib/utils/common';
import { LinkedAbortController } from '@/lib/utils/linkedAbortController';
import { Maybe, MaybeFn } from '@/lib/utils/tsUtils';

interface TabManagerItem {
  id: string;
}

interface TabManagerConfig<TItem extends TabManagerItem> {
  tabs: MaybeFn<Maybe<Array<TItem> | ReadonlyArray<TItem>>>;
  abortSignal?: AbortSignal;
  fallbackTab?: TItem['id'];
  getActiveTab?: () => TItem['id'] | null | undefined;
  onChangeActiveTab?: (
    nextActiveTab: TItem['id'],
    currentActiveTabData: TItem,
  ) => void;
}

class TabsManager<T extends TabManagerItem> {
  abortController: AbortController;
  activeTabId: T['id'];
  config: TabManagerConfig<T>;
  /**
   * This is needed ONLY WHEN `getActiveTab` IS NOT SET
   */
  private localActiveTab!: T['id'];

  tabs: Array<T> | ReadonlyArray<T>;

  tabsIndexesMap!: Map<T['id'], number>;

  constructor(config: TabManagerConfig<T>) {
    this.abortController = new LinkedAbortController(this.config?.abortSignal);
    this.config = config;

    makeAutoObservable(
      this,
      {
        abortController: false,
        config: false,
      },
      {
        autoBind: true,
      },
    );

    reaction(
      () => callFunction(this.config.tabs),
      (tabs) => this.setTabs(tabs ?? []),
      { fireImmediately: true, signal: this.abortController?.signal },
    );
  }

  destroy() {
    this.abortController.abort();
  }

  getTabData(id: T['id']) {
    const index = this.tabsIndexesMap.get(id)!;
    return this.tabs[index];
  }

  setActiveTab(id: T['id']) {
    if (this.activeTabId === id) {
      return;
    }

    if (this.config.getActiveTab && this.config.onChangeActiveTab) {
      this.config.onChangeActiveTab(id, this.getTabData(id));
    } else {
      runInAction(() => {
        this.localActiveTab = id;
      });
    }
  }

  setTabs(tabs: Array<T> | ReadonlyArray<T>) {
    this.tabs = tabs;
    this.tabsIndexesMap = new Map(
      this.tabs.map((tab, index) => [tab.id, index]),
    );
  }

  get activeTab(): T['id'] {
    const tabId = this.config.getActiveTab
      ? this.config.getActiveTab()
      : this.localActiveTab;

    const activeTabId = tabId ?? this.config.fallbackTab ?? this.tabs[0].id;

    const tabData = this.getTabData(activeTabId);

    if (!tabData) {
      return this.config.fallbackTab ?? this.tabs[0].id;
    }

    return activeTabId;
  }

  get activeTabData() {
    return this.getTabData(this.activeTab);
  }
}

export const createTabManager = <T extends TabManagerItem>(
  config: TabManagerConfig<T>,
) => new TabsManager(config);
