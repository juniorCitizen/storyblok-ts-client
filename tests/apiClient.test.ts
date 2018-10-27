import * as dotEnv from 'dotenv-safe'
import {ApiClient} from '../src'

dotEnv.config()

let apiClient: ApiClient
let apiToken: string
let spaceId: number

describe('Storyblok instantiation', () => {
  test('class is exported', () => {
    expect(ApiClient).toBeTruthy()
  })

  test('api token to be defined for the test', () => {
    apiToken = process.env.api_token as string
    expect(apiToken).toBeTruthy()
  })

  test('test space id to be defined for the test', () => {
    spaceId = parseInt(process.env.space_id as string, 10)
    expect(spaceId).toBeTruthy()
  })

  test('class instantiates correctly', () => {
    apiClient = new ApiClient(
      process.env.api_token as string,
      parseInt(process.env.space_id as string, 10)
    )
    expect(apiClient).toBeInstanceOf(ApiClient)
  })
})
