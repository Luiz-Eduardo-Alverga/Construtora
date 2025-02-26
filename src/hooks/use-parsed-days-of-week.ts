import { useMemo } from 'react'

export function useParsedDaysOfWeek(
  diasJornada?: string | Record<string, boolean>,
) {
  return useMemo(() => {
    if (!diasJornada) return []

    if (typeof diasJornada === 'string') {
      return Object.entries(JSON.parse(diasJornada))
        .filter(([, value]) => value === true)
        .map(([day]) => day)
    }

    return Object.entries(diasJornada)
      .filter(([, value]) => value === true)
      .map(([day]) => day)
  }, [diasJornada])
}
