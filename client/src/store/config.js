import { create } from 'zustand'

export const userInformationStore = create((set) => ({
  userInformation: { nombres: '', apellidos: '' },
  setUserInformation: (data) => set({ userInformation: data })
}))
