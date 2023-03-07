import '@/styles/globals.css'
import { kanit } from '@/utils/fonts'
import type { AppProps } from 'next/app'

import { animated as a, useSpring, useTransition } from '@react-spring/web'
import { useEffect, useRef, useState } from 'react'

import { Icon } from '@iconify/react'
import Head from 'next/head'

import Navbar from '@/components/Navbar'
import Image from 'next/image'

import { moonPhase } from '@/utils/moon'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [moonIcon, setMoonIcon] = useState('mdi:moon-waxing-crescent')

  const [ready, setReady] = useState(false)
  const [logoHovered, setLogoHovered] = useState(false)

  const [animFinished, setAnimFinished] = useState(false)

  const [videoSpring, videoSpringApi] = useSpring(() => ({
    opacity: 0,
    scale: 1.2,
    x: 0,
    y: 0,
  }))

  const introRef = useRef<HTMLDivElement>(null)

  const [introSpring, introSpringApi] = useSpring(() => ({
    opacity: 0,
    x: 0,
    y: 0,
    'z-index': 1,
    display: 'none',
  }))

  const [navbarSpring, navbarSpringApi] = useSpring(() => ({
    opacity: 0,
    x: -10,
    y: 0,
    display: 'none',
  }))

  const [contentSpring, contentSpringApi] = useSpring(() => ({
    display: 'none',
    opacity: 0,
    scale: 1,
    x: 0,
    y: 10,
  }))

  const [worgenLeftSpring, worgenLeftSpringApi] = useSpring(() => ({
    opacity: 0,
    x: -200,
    y: 50,
    display: 'none',
  }))

  const [worgenRightSpring, worgenRightSpringApi] = useSpring(() => ({
    opacity: 0,
    x: 50,
    y: 50,
    display: 'none',
  }))

  const [logoSpring, logoSpringApi] = useSpring(() => ({
    opacity: 0,
    x: -50,
    display: 'none',
    width: 64,
  }))

  const [titleSpring, titleSpringApi] = useSpring(() => ({
    opacity: 0,
    x: -10,
    display: 'none',
  }))

  const [lightningSpring, lightningSpringApi] = useSpring(() => ({
    opacity: 0,
  }))

  useEffect(() => {
    if (window.innerWidth > 1190) {
      worgenLeftSpringApi.start({
        opacity: 1,
        x: -100,
      })
    } else {
      worgenLeftSpringApi.start({
        opacity: 0,
        x: -200,
      })
    }
    window.onresize = () => {
      if (window.innerWidth > 1190) {
        worgenLeftSpringApi.start({
          opacity: 1,
          x: -50,
          display: 'inline',
        })
      } else {
        worgenLeftSpringApi.start({
          opacity: 0,
          x: -200,
          onRest: () => {
            if (window.innerWidth < 1190) {
              worgenLeftSpringApi.start({
                display: 'none',
              })
            }
          },
        })
      }
    }
  }, [worgenLeftSpringApi])

  useEffect(() => {
    if (localStorage.getItem('visited')) {
      setReady(true)
      return
    }
    introSpringApi.start({
      opacity: 1,
      x: 0,
      y: 0,
      display: 'block',
    })
  }, [introSpringApi])

  useEffect(() => {
    const isVisited = localStorage.getItem('visited')
    if (isVisited && ready) {
      videoSpringApi.start({
        opacity: 1,
        scale: 1.1,
      })

      navbarSpringApi.start({
        opacity: 1,
        x: 0,
        y: 0,
        display: 'inline',
      })

      contentSpringApi.start({
        opacity: 1,
        y: 0,
        display: 'inline',
      })

      if (window.innerWidth > 1190) {
        worgenLeftSpringApi.start({
          opacity: 1,
          x: -100,
          display: 'inline',
        })
      }

      worgenRightSpringApi.start({
        opacity: 1,
        x: 100,
        display: 'inline',
      })

      logoSpringApi.start({
        opacity: 1,
        x: 0,
        display: 'inline',
        onRest: (_, e) => {
          e.start({
            width: 240,
            onChange: (a) => {
              if (a.value.width > 230) {
                titleSpringApi.start({
                  opacity: 1,
                  x: 0,
                  display: 'inline',
                  onRest: () => {
                    setAnimFinished(true)
                  },
                })
              }
            },
          })
        },
      })
      return
    }
    if (ready) {
      logoSpringApi.start({
        opacity: 1,
        x: 0,
        display: 'inline',
        config: {
          // slow physics
          mass: 1,
          tension: 200,
          friction: 100,
        },
        onRest: (_, e) => {
          e.start({
            width: 240,
            onChange: (a) => {
              if (a.value.width > 230) {
                titleSpringApi.start({
                  opacity: 1,
                  x: 0,
                  display: 'inline',
                  config: {
                    // slow physics
                    mass: 1,
                    tension: 200,
                    friction: 100,
                  },
                })
              }
            },
          })
        },
      })

      videoSpringApi.start({
        opacity: 1,
        scale: 1.1,
        config: {
          // slow physics
          mass: 1,
          tension: 200,
          friction: 100,
        },
        onRest: () => {
          navbarSpringApi.start({
            opacity: 1,
            x: 0,
            y: 0,
            display: 'inline',
          })

          contentSpringApi.start({
            opacity: 1,
            y: 0,
            display: 'inline',
          })

          worgenRightSpringApi.start({
            opacity: 1,
            x: 100,
            display: 'inline',
            config: {
              // slow physics
              mass: 1,
              tension: 200,
              friction: 100,
            },
          })
          worgenLeftSpringApi.set({
            opacity: 0,
            x: -200,
          })
          if (window.innerWidth > 1190) {
            worgenLeftSpringApi.start({
              opacity: 1,
              x: -50,
              display: 'inline',
              config: {
                // slow physics
                mass: 1,
                tension: 200,
                friction: 100,
              },
            })
          }
        },
        onStart: () => {
          lightningSpringApi.start({
            opacity: 1,
            delay: 1500,
            config: {
              // fast physics
              mass: 1,
              tension: 200,
              friction: 10,
              clamp: true,
            },
            onRest: () => {
              lightningSpringApi.start({
                opacity: 0,
                config: {
                  // slow physics
                  mass: 1,
                  tension: 200,
                  friction: 100,
                },
              })
              lightningSpringApi.start({
                opacity: 1,
                delay: 200,
                config: {
                  // fast physics
                  mass: 1,
                  tension: 200,
                  friction: 10,
                  clamp: true,
                },
                onRest: () => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = 1
                    audioRef.current.volume = 0
                    audioRef.current
                      .play()
                      .then(() => {
                        console.log('playing')
                      })
                      .catch((e) => {
                        console.log(e)
                      })

                    const raiseVolume = setInterval(() => {
                      if (
                        audioRef &&
                        audioRef.current &&
                        audioRef.current.volume < 0.1
                      ) {
                        audioRef.current.volume += 0.01
                      } else {
                        clearInterval(raiseVolume)
                      }
                    }, 100)
                  }
                  lightningSpringApi.start({
                    opacity: 0,
                    config: {
                      // slow physics
                      mass: 1,
                      tension: 200,
                      friction: 100,
                    },
                    onRest: () => {
                      localStorage.setItem('visited', 'true')
                      setAnimFinished(true)
                    },
                  })
                },
              })
            },
          })
        },
      })
    }
  }, [
    ready,
    videoSpringApi,
    lightningSpringApi,
    logoSpringApi,
    titleSpringApi,
    worgenRightSpringApi,
    worgenLeftSpringApi,
    navbarSpringApi,
    contentSpringApi,
  ])

  useEffect(() => {
    switch (moonPhase) {
      case 0:
        setMoonIcon('mdi:moon-new')
        break
      case 1:
        setMoonIcon('mdi:moon-waxing-crescent')
        break
      case 2:
        setMoonIcon('mdi:moon-first-quarter')
        break
      case 3:
        setMoonIcon('mdi:moon-waxing-gibbous')
        break
      case 4:
        setMoonIcon('mdi:moon-full')
        break
      case 5:
        setMoonIcon('mdi:moon-waning-gibbous')
        break
      case 6:
        setMoonIcon('mdi:moon-last-quarter')
        break
      case 7:
        setMoonIcon('mdi:moon-waning-crescent')
        break
      default:
        setMoonIcon('mdi:moon-new')
    }
  }, [setMoonIcon])

  const logoTransition = useTransition(logoHovered, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <main
        onMouseLeave={() => {
          worgenLeftSpringApi.start({
            x: 50,
          })
          worgenRightSpringApi.start({
            x: 50,
          })
          videoSpringApi.start({
            x: 0,
          })
        }}
        onMouseMove={(e) => {
          if (animFinished) {
            worgenRightSpringApi.start({
              x: e.clientX * 0.01 + 100,
            })
            worgenLeftSpringApi.start({
              x: e.clientX * -0.01 - 50,
            })
            videoSpringApi.start({
              x: e.clientX * -0.01,
              y: e.clientY * -0.01,
            })
          }
        }}
      >
        <Head>
          <title>🌙 Pack Starhowl</title>
          {/* Theme color */}
          <meta name="theme-color" content="#1a202c" />

          {/* OpenGraph */}
          <meta property="og:title" content="🌙 Pack Starhowl" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://packstarhowl.com" />
          <meta property="og:image" content="/og.png" />
          <meta property="og:description" content="Pack Starhowl" />
          <meta property="og:site_name" content="Pack Starhowl" />
          <meta property="og:locale" content="en_US" />

          {/* Twitter */}

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@packstarhowl" />
          <meta name="twitter:creator" content="@packstarhowl" />
          <meta name="twitter:title" content="🌙 Pack Starhowl" />
          <meta name="twitter:description" content="Pack Starhowl" />
          <meta name="twitter:image" content="/og.png" />
        </Head>
        <audio ref={audioRef}>
          <source src="/thunder_rumble.mp3" type="audio/mpeg" />
        </audio>
        <div className="fixed h-full w-full bg-zinc-900" />
        <a.video
          preload="auto"
          style={videoSpring}
          ref={videoRef}
          loop
          autoPlay
          muted
          className="fixed h-full w-full object-cover blur-sm"
        >
          <source
            src="https://db17gxef1g90a.cloudfront.net/vid/2.mp4"
            type="video/mp4"
          />
        </a.video>
        <a.div
          style={lightningSpring}
          className="fixed h-full w-full bg-zinc-100 mix-blend-overlay"
        />
        <a.div
          style={worgenLeftSpring}
          className="fixed left-0 bottom-0 select-none"
        >
          <Image
            src={'/left.png'}
            alt="worgen-left"
            className="-my-16 h-auto w-auto scale-75 opacity-90"
            width={390}
            height={0}
            priority
          />
        </a.div>
        <a.div
          style={worgenRightSpring}
          className="fixed right-0 bottom-0 select-none"
        >
          <Image
            src={'/right2.png'}
            alt="worgen-right"
            className="h-auto w-auto opacity-80"
            width={500}
            height={800}
            priority
          />
        </a.div>
        <div className="vignette fixed h-full w-full bg-zinc-900/20" />
        <a.div
          style={introSpring}
          ref={introRef}
          className="fixed grid h-full w-full items-center justify-center gap-4 text-center"
        >
          <button
            onClick={() => {
              introRef.current?.classList.add('z-[-999]')
              setReady(true)
            }}
            className="my-8 mr-2 rounded-lg bg-zinc-800 p-2 text-zinc-300"
          >
            <Icon
              icon="material-symbols:play-arrow"
              className="inline"
              width={24}
            />
            <span className="relative top-[0.05rem]">Play Intro</span>
          </button>
          <span className="text-zinc-300">or</span>
          <button
            onClick={() => {
              introRef.current?.classList.add('z-[-999]')
              localStorage.setItem('visited', 'true')
              setReady(true)
            }}
            className="ml-2 rounded-lg bg-zinc-800 p-2 text-zinc-300"
          >
            <Icon
              icon="material-symbols:skip-next"
              className="inline"
              width={24}
            />
            <span className="relative top-[0.05rem]">Skip Intro</span>
          </button>
        </a.div>
        <a.div
          style={logoSpring}
          className="absolute left-0 right-0 m-auto my-2 h-16 w-16 rounded-lg bg-zinc-900/50 p-2 backdrop-blur-lg"
        >
          <div
            onMouseEnter={() => {
              setLogoHovered(true)
            }}
            onMouseLeave={() => {
              setLogoHovered(false)
            }}
          >
            {logoTransition((style, item) =>
              item ? (
                <a.div className="absolute" style={style}>
                  <Icon
                    icon="game-icons:wolf-howl"
                    width={48}
                    height={48}
                    className="inline text-zinc-200"
                  />
                </a.div>
              ) : (
                <a.div className="absolute" style={style}>
                  <Icon
                    icon={moonIcon}
                    width={48}
                    height={48}
                    className="inline text-zinc-200"
                  />
                </a.div>
              ),
            )}
          </div>
          <a.div
            style={titleSpring}
            className={`absolute top-[1.2rem] ml-14 select-none text-center text-2xl text-zinc-200 ${kanit.className}`}
          >
            Pack Starhowl
          </a.div>
        </a.div>
        <a.header
          style={navbarSpring}
          className={`absolute left-0 right-0 m-auto my-20 grid w-72 grid-flow-col rounded-lg bg-zinc-900/50 text-center backdrop-blur-lg transition-colors ${kanit.className}`}
        >
          <Navbar />
        </a.header>
        <a.div
          style={contentSpring}
          className={`absolute left-0 right-0 m-auto my-32 h-auto w-[50%] min-w-[400px] items-center justify-center rounded-lg bg-zinc-900/50 p-4 text-zinc-300 backdrop-blur-lg transition-colors ${kanit.className}`}
        >
          <Component {...pageProps} />
        </a.div>
      </main>
    </QueryClientProvider>
  )
}
