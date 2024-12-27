import { create } from 'zustand'

interface SelectedDatesState {
  selectedDates: string[]
  setSelectedDates: (dates: string[]) => void
}

interface DateState {
  selectedDateBirth: Date | undefined
  setSelectedDateBirth: (date: Date | undefined) => void
  selectedDateResignation: Date | undefined
  setSelectedDateResignation: (date: Date | undefined) => void
  selectedDateAdmission: Date | undefined
  setSelectedDateAdmission: (date: Date | undefined) => void
  clearDates: () => void
}


export const useSelectedDatesStore = create<SelectedDatesState>((set) => ({
  selectedDates: [],
  setSelectedDates: (dates) => set({ selectedDates: dates }),
}))

export const useDateStore = create<DateState>((set) => ({
  selectedDateBirth: undefined,
  setSelectedDateBirth: (date) => set({ selectedDateBirth: date }),
  selectedDateResignation: undefined,
  setSelectedDateResignation: (date) => set({ selectedDateResignation: date }),
  selectedDateAdmission: undefined,
  setSelectedDateAdmission: (date) => set({ selectedDateAdmission: date }),
  clearDates: () =>
    set({
      selectedDateBirth: undefined,
      selectedDateResignation: undefined,
      selectedDateAdmission: undefined,
    }),
}))



