'use client';

import { makeAutoObservable } from 'mobx';
import { createContext, ReactNode, useRef } from 'react';

type UserModel = {
  email: string;
  lastName: string;
  name: string;
};

class UserStoreWithSerialization {
  error: string | null = null;
  isLoading: boolean = false;
  user: UserModel | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchUser = async (): Promise<void> => {
    const resp = await fetch('fake/fetch');
  };

  serialize() {
    return {
      error: this.error,
      isLoading: this.isLoading,
      users: this.user,
    };
  }

  hydrate(data: ReturnType<typeof this.serialize>) {
    this.user = data.users || null;
    this.error = data.error || null;
    this.isLoading = data.isLoading || false;
  }
}

const UserStoreContext = createContext<UserStoreWithSerialization | null>(null);

export const UserStoreProvider = ({
  children,
  data,
}: {
  children: ReactNode;
  data: ReturnType<UserStoreWithSerialization['serialize']>;
}) => {
  const storeRef = useRef<UserStoreWithSerialization | null>(null);

  if (storeRef.current) {
    storeRef.current = new UserStoreWithSerialization();
    if (data) {
      storeRef.current.hydrate(data);
    }
  }

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
};
