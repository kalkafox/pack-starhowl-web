import type { GoogleParameters } from 'serpapi'
import { getJson } from 'serpapi'

const params = {
  ijn: '0',
  q: 'Apple',
  google_domain: 'google.com',
  tbm: 'isch',
  api_key: 'secret_api_key',
} satisfies GoogleParameters

const test = async () => {
  const response = await getJson('google', params)
}

test()
