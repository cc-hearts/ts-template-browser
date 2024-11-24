import type { Fn } from '@cc-heart/utils/helper'

export const handleInvoke = (callback: Fn) => {
  return (...rest: any) => {
    if (typeof window !== 'undefined') {
      return callback(...rest)
    } else {
      const name = callback.name
      console.warn(
        `The current running environment does not support calling the ${name}`,
      )
    }
  }
}

interface GlobalErrorHanlder {
  errorHandler?: (e: ErrorEvent) => void
  promiseErrorHandler?: (e: PromiseRejectionEventInit) => void
}

export const globalErrorHanlder = (opts = {} as GlobalErrorHanlder) => {
  if (typeof window === 'undefined') return

  window.addEventListener('error', (evt) => {
    opts.errorHandler?.(evt)
  })

  window.addEventListener('unhandledrejection', (evt) => {
    opts.promiseErrorHandler?.(evt)
  })
}
