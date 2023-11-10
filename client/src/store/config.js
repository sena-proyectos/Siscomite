import { create } from 'zustand'

export const notificationStore = create((set) => ({
  numCount: null,
  setNumCount: (count) => set({ numCount: count })
}))

export const requestStore = create((set) => ({
  requestInformation: {},
  setRequestInformation: (data) => set({ requestInformation: data })
}))

export const userInformationStore = create((set) => ({
  userInformation: {},
  setUserInformation: (data) => set({ userInformation: data })
}))

export const fichaInformationStore = create((set) => ({
  fichaInformation: {},
  setFichaInformation: (data) => set({ fichaInformation: data })
}))
