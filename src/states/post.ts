import { create } from 'zustand';

export type PostState = {
  id: number | null;
};

type Action = {
  setPostId: (id: number) => void;
};

const postState = create<PostState & Action>((set) => ({
  id: null,
  setPostId: (id: number) => set({ id }),
}));

export default postState;
