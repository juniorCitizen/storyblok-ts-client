import * as dotEnv from 'dotenv-safe'

dotEnv.config()

describe('make sure env variables are read correctly', () => {
  test('id is retrieved correctly', () => {
    expect(process.env.fake_space_id).toBe('11111')
  })
  test('api token is retrieved correctly', () => {
    expect(process.env.fake_api_token).toBe('fake_api_token')
  })
})
