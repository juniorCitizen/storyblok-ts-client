import * as dotEnv from 'dotenv-safe'
import {IPendingStory, retrySettings} from '../src'
import {Storyblok} from '../src/classes/Storyblok'

dotEnv.config()

let storyblok: Storyblok
let apiToken: string
let spaceId: number

describe('Storyblok instantiation', () => {
  test('api token to be defined for the test', () => {
    apiToken = process.env.api_token as string
    expect(apiToken).toBeTruthy()
  })

  test('test space id to be defined for the test', () => {
    spaceId = parseInt(process.env.space_id as string, 10)
    expect(spaceId).toBeTruthy()
  })

  test('class is exported', () => {
    expect(Storyblok).toBeTruthy()
  })

  test('class instantiates correctly', () => {
    storyblok = new Storyblok(process.env.api_token as string)
    expect(storyblok).toBeInstanceOf(Storyblok)
  })
})

describe('GET method', () => {
  test('there to be a get method', () => {
    expect(storyblok.get).toBeTruthy()
  })
  test("fetch '/' to work", () => {
    expect.assertions(1)
    return storyblok.get().then(() => expect(1).toBe(1))
  })
  test("fetch '/:spaceId/stories' to work", () => {
    expect.assertions(1)
    const url = `/${spaceId}/stories`
    return storyblok
      .get(url)
      .then(res => expect(res.data).toHaveProperty('stories'))
  })
})

describe('POST method', () => {
  test('there to be a post method', () => {
    expect(storyblok.post).toBeTruthy()
  })

  test('creating a story to work', () => {
    const url = `/${spaceId}/stories`
    const newStory: IPendingStory = {
      default_root: null,
      is_folder: false,
      is_startpage: false,
      name: 'test',
      parent_id: 0,
      slug: 'test',
    }
    expect.assertions(1)
    return storyblok
      .post(url, {story: newStory}, retrySettings.burst)
      .then(res => expect(res.data).toHaveProperty('story'))
      .catch(err => expect(err.response.status).toBe(422))
  })
})

// describe('DELETE method', () => {
//   test('there to be a delete method', () => {
//     expect(storyblok.delete).toBeTruthy()
//   })
//   test('delete story to work', () => {
//     expect.assertions(1)
//     const url = `/${spaceId}/stories`
//     const newStory: IPendingStory = {
//       content: {},
//       default_root: null,
//       is_folder: false,
//       is_startpage: false,
//       name: 'test2',
//       parent_id: 0,
//       slug: 'test2',
//     }
//     return storyblok
//       .post(url, {story: newStory})
//       .then(res => storyblok.delete(url + `/${res.story.id}`))
//       .then(() => expect(1).toBe(1))
//   })
// })

// describe('PUT method', () => {
//   test('there to be a put method', () => {
//     expect(storyblok.put).toBeTruthy()
//   })
// })
