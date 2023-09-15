import { create } from 'zustand'

export const userInformationStore = create((set) => ({
  userInformation: {},
  setUserInformation: (data) => set({ userInformation: data })
}))

export const fichaInformationStore = create((set) => ({
  fichaInformation: {},
  setFichaInformation: (data) => set({ fichaInformation: data })
}))
