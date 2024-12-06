import { create } from 'zustand'

interface SelectedDatesState {
  selectedDates: string[]
  setSelectedDates: (dates: string[]) => void
}

export const useSelectedDatesStore = create<SelectedDatesState>((set) => ({
  selectedDates: [],
  setSelectedDates: (dates) => set({ selectedDates: dates }),
}))
