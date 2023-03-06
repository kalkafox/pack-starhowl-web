import { useRouter } from 'next/router'

import { Icon } from '@iconify/react'

export default function Navbar() {
  const router = useRouter()
  return (
    <>
      <button
        onClick={() => router.push('/')}
        className={`rounded-l-lg p-2 font-bold text-zinc-300 transition-colors hover:bg-zinc-800/50 ${
          router.asPath === '/' ? 'bg-zinc-800/50' : ''
        }`}
      >
        <span className="select-none">
          <Icon icon="material-symbols:info" className="mr-2 inline text-lg" />
          About
        </span>
      </button>
      <button
        onClick={() => router.push('/members')}
        className={`p-2 font-bold text-zinc-300 transition-colors hover:bg-zinc-800/50 ${
          router.asPath === '/members' ? 'bg-zinc-800/50' : ''
        }`}
      >
        <span className="select-none">
          <Icon icon="iconoir:wolf" className="mr-2 inline text-lg" />
          Members
        </span>
      </button>
      <button
        onClick={() => router.push('/events')}
        className={`rounded-r-lg p-2 font-bold text-zinc-300 transition-colors hover:bg-zinc-800/50 ${
          router.asPath === '/events' ? 'bg-zinc-800/50' : ''
        }`}
      >
        <span className="select-none">
          <Icon
            icon="mdi:calendar-blank-multiple"
            className="mr-2 inline text-lg"
          />
          Events
        </span>
      </button>
    </>
  )
}
