import { NextPage } from 'next'

import Image from 'next/image'

import { animated as a, useSpring } from '@react-spring/web'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { Icon } from '@iconify/react'

const Home: NextPage = () => {
  const [imageReady, setImageReady] = useState(false)
  const [foxImageSpring, foxImageSpringApi] = useSpring(() => ({
    opacity: 0,
  }))

  const { isLoading, error, data, refetch } = useQuery({
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    queryKey: ['foxfloof'],
    queryFn: () =>
      fetch('https://randomfox.ca/floof').then(async (res) => {
        const data = await res.json()
        if (
          res.ok &&
          typeof data === 'object' &&
          data &&
          'image' in data &&
          data.image &&
          typeof data.image === 'string' &&
          data.image.length > 0
        ) {
          return data
        }
        throw new Error('Invalid response')
      }),
  })

  return (
    <>
      <h1>
        Hello! It looks like this page is a work in progress, sorry about that.
      </h1>
      <br />
      <br />
      <p>In the meantime, here&apos;s a picture of a random fox:</p>
      <br />
      <button
        className="mb-4"
        disabled={!imageReady}
        onClick={() => {
          setImageReady(false)
          foxImageSpringApi.start({ opacity: 0 })
          refetch()
        }}
      >
        <Icon icon="mdi:paw" className="mr-2 inline text-2xl" />
        Reload
      </button>
      <a.div style={foxImageSpring}>
        {!isLoading && data ? (
          <Image
            width={500}
            height={0}
            className="h-auto w-auto rounded-lg"
            onLoadingComplete={() => {
              foxImageSpringApi.start({
                opacity: 1,
                onRest: () => {
                  setTimeout(() => {
                    setImageReady(true)
                  }, 1000)
                },
              })
            }}
            src={data.image as string}
            alt="fox"
            priority
          />
        ) : (
          <p>Loading...</p>
        )}
      </a.div>
    </>
  )
}

export default Home
