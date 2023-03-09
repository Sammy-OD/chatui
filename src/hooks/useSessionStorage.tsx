import { useEffect, useState } from "react"

export function useSessionStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const data = sessionStorage.getItem(key);

    if (data !== null) return JSON.parse(data)

    if (typeof initialValue === 'function') {
      return (initialValue as () => T)()
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as [typeof value, typeof setValue]
}