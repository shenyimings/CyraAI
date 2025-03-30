import { create } from 'zustand'

interface ManageStore {
  activeSection: string
  setActiveSection: (section: string) => void
}

export const useManageStore = create<ManageStore>((set) => ({
  activeSection: 'jobs',
  setActiveSection: (section) => set({ activeSection: section }),
}))