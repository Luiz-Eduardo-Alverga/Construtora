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

interface FormState {
  isDeleteButtonVisible: boolean
  registerId: number | null
  registrationName: string | null
  setIsDeleteButtonVisible: (visible: boolean) => void
  setRegisterId: (id: number | null) => void
  setRegistrationName: (name: string | null) => void
  resetFormState: () => void
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

export const useFormStore = create<FormState>((set) => ({
  isDeleteButtonVisible: false,
  registerId: null,
  registrationName: null,
  setIsDeleteButtonVisible: (visible) =>
    set(() => ({ isDeleteButtonVisible: visible })),
  setRegisterId: (id) => set(() => ({ registerId: id })),
  setRegistrationName: (name) => set(() => ({ registrationName: name })),
  resetFormState: () =>
    set(() => ({
      registerId: null,
      registrationName: null,
    })),
}))
