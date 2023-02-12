import { useEffect } from 'react'

const useKeyPressHook = (keys: string[], callback: Function, ref: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const handle = (event: any) => {
      if (keys.includes(event.key)) {
        event.preventDefault()
        callback()
      }
    }
    ref.current && ref.current.addEventListener('keydown', handle)
    return () => {
      ref.current && ref.current.removeEventListener('keydown', handle)
    }
  }, [keys, callback, ref])
}

export default useKeyPressHook
