export const log = (...args: any) =>
  process.env.NODE_ENV === 'development'
    ? console.log('IN DEV MODE\n', ...args)
    : undefined
