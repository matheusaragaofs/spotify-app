import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}


const memoize = (fn: { (console: any): any; (arg0: any): any }) => {
  let cache = {} as any;
  return (...args: any[]) => {
    let n = args[0];
    if (n in cache) {
      return cache[n];
    }
    else {
      let result = fn(n);
      cache[n] = result;
      return result;
    }
  }
}


// ignore in-browser next/js recoil warnings until its fixed.
const mutedConsole = memoize((console: any) => ({
  ...console,
  warn: (...args: (string | string[])[]) => args[0].includes('Duplicate atom key')
    ? null
    : console.warn(...args)
}))

global.console = mutedConsole(global.console);

export default MyApp
