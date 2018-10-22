import * as dotEnv from 'dotenv-safe'
import * as path from 'path'

import {ApiClient, IAsset, IAssetFolder, IStory} from '../src'

import {mockRootFolders} from './stories'

dotEnv.config()

describe('make sure env variables are read correctly', () => {
  test('compare against a fake space id', () => {
    expect(process.env.fake_space_id).toBe('11111')
  })
  test('compare against a fake api token', () => {
    expect(process.env.fake_api_token).toBe('fake_api_token')
  })
})

describe('class instantiation', () => {
  test('the class is exported', () => {
    expect(ApiClient).toBeTruthy()
  })
  describe('actual instantiation', () => {
    const apiClient = new ApiClient(
      process.env.api_token as string,
      parseInt(process.env.space_id as string, 10)
    )
    test('the class can instantiated', () => {
      expect(apiClient).toBeInstanceOf(ApiClient)
    })
    describe('instance getters', () => {
      describe('assetFolders class member', () => {
        test('has assetFolders member', () => {
          expect(apiClient.assetFolders).toBeTruthy()
        })
        test('assetFolders has the correct number of members', () => {
          expect(Object.keys(apiClient.assetFolders).length).toBe(6)
        })
        test('provides a create() method', () => {
          expect(typeof apiClient.assetFolders.create).toBe('function')
        })
        test('provides a delete() method', () => {
          expect(typeof apiClient.assetFolders.delete).toBe('function')
        })
        test('provides a deleteExisting() method', () => {
          expect(typeof apiClient.assetFolders.deleteExisting).toBe('function')
        })
        test('provides a get() method', () => {
          expect(typeof apiClient.assetFolders.get).toBe('function')
        })
        test('provides a getByName() method', () => {
          expect(typeof apiClient.assetFolders.getByName).toBe('function')
        })
        test('provides a getExisting() method', () => {
          expect(typeof apiClient.assetFolders.getExisting).toBe('function')
        })
      })
      describe('assets class member', () => {
        test('has assets member', () => {
          expect(apiClient.assets).toBeTruthy()
        })
        test('assets has the correct number of members', () => {
          expect(Object.keys(apiClient.assets).length).toBe(9)
        })
        test('provides a count() method', () => {
          expect(typeof apiClient.assets.count).toBe('function')
        })
        test('provides a createFromImage() method', () => {
          expect(typeof apiClient.assets.createFromImage).toBe('function')
        })
        test('provides a delete() method', () => {
          expect(typeof apiClient.assets.delete).toBe('function')
        })
        test('provides a deleteExisting() method', () => {
          expect(typeof apiClient.assets.deleteExisting).toBe('function')
        })
        test('provides a get() method', () => {
          expect(typeof apiClient.assets.get).toBe('function')
        })
        test('provides a getByUrl() method', () => {
          expect(typeof apiClient.assets.getByUrl).toBe('function')
        })
        test('provides a getExisting() method', () => {
          expect(typeof apiClient.assets.getExisting).toBe('function')
        })
        test('provides a register() method', () => {
          expect(typeof apiClient.assets.register).toBe('function')
        })
        test('provides a upload() method', () => {
          expect(typeof apiClient.assets.upload).toBe('function')
        })
      })
      describe('components class member', () => {
        test('has components member', () => {
          expect(apiClient.components).toBeTruthy()
        })
        test('components has the correct number of members', () => {
          expect(Object.keys(apiClient.components).length).toBe(5)
        })
        test('provides a create() method', () => {
          expect(typeof apiClient.components.create).toBe('function')
        })
        test('provides a delete() method', () => {
          expect(typeof apiClient.components.delete).toBe('function')
        })
        test('provides a deleteExisting() method', () => {
          expect(typeof apiClient.components.deleteExisting).toBe('function')
        })
        test('provides a getExisting() method', () => {
          expect(typeof apiClient.components.getExisting).toBe('function')
        })
      })
      describe('spaces class member', () => {
        test('has spaces member', () => {
          expect(apiClient.spaces).toBeTruthy()
        })
        test('spaces has the correct number of members', () => {
          expect(Object.keys(apiClient.spaces).length).toBe(1)
        })
        test('provides a get() method', () => {
          expect(typeof apiClient.spaces.get).toBe('function')
        })
      })
      describe('stories class member', () => {
        test('has stories member', () => {
          expect(apiClient.stories).toBeTruthy()
        })
        test('stories has the correct number of members', () => {
          expect(Object.keys(apiClient.stories).length).toBe(12)
        })
        test('provides a count() method', () => {
          expect(typeof apiClient.stories.count).toBe('function')
        })
        test('provides a create() method', () => {
          expect(typeof apiClient.stories.create).toBe('function')
        })
        test('provides a delete() method', () => {
          expect(typeof apiClient.stories.delete).toBe('function')
        })
        test('provides a deleteExisting() method', () => {
          expect(typeof apiClient.stories.deleteExisting).toBe('function')
        })
        test('provides a get() method', () => {
          expect(typeof apiClient.stories.get).toBe('function')
        })
        test('provides a getExisting() method', () => {
          expect(typeof apiClient.stories.getExisting).toBe('function')
        })
        test('provides a publish() method', () => {
          expect(typeof apiClient.stories.publish).toBe('function')
        })
        test('provides a publishPendings() method', () => {
          expect(typeof apiClient.stories.publishPendings).toBe('function')
        })
        test('provides a reorder() method', () => {
          expect(typeof apiClient.stories.reorder).toBe('function')
        })
        test('provides a update() method', () => {
          expect(typeof apiClient.stories.update).toBe('function')
        })
      })
    })
    describe('space related operations', () => {
      test('get the correct working space', () => {
        expect.assertions(1)
        return apiClient.spaces.get().then(space => {
          const id = (space.id as number).toString()
          return expect(id).toBe(process.env.space_id)
        })
      })
    })
    describe('component related operations', () => {
      test('delete existing components to execute successfully', () => {
        expect.assertions(1)
        return apiClient.components
          .deleteExisting()
          .then(() => {
            expect(1).toBe(1)
            return Promise.resolve()
          })
          .catch((e: any) => Promise.reject(e))
      })
      test('to have no existing components', () => {
        expect.assertions(1)
        return apiClient.components
          .getExisting()
          .then(components => {
            return expect(components.length).toBe(0)
          })
          .catch((e: any) => Promise.reject(e))
      })
      test('to have one component after creation', () => {
        expect.assertions(1)
        return apiClient.components
          .create({
            display_name: 'test component',
            is_nestable: false,
            is_root: false,
            name: 'test',
            preview_field: null,
            schema: {},
          })
          .then(() => apiClient.components.getExisting())
          .then(components => expect(components.length).toBe(1))
          .catch((e: any) => Promise.reject(e))
      })
      test('delete existing components to execute successfully', () => {
        expect.assertions(1)
        return apiClient.components
          .deleteExisting()
          .then(() => {
            expect(1).toBe(1)
            return Promise.resolve()
          })
          .catch((e: any) => Promise.reject(e))
      })
      test('to have no existing components', () => {
        expect.assertions(1)
        return apiClient.components
          .getExisting()
          .then(components => {
            return expect(components.length).toBe(0)
          })
          .catch((e: any) => Promise.reject(e))
      })
    })
    describe('asset folder related operations', () => {
      let folder1: IAssetFolder
      let folder2: IAssetFolder
      test(
        'delete existing asset folders to execute successfully',
        () => {
          expect.assertions(1)
          return apiClient.assetFolders
            .deleteExisting()
            .then(() => {
              expect(1).toBe(1)
              return Promise.resolve()
            })
            .catch((e: any) => Promise.reject(e))
        },
        60000 * 5
      )
      test('to have no existing asset folder', () => {
        expect.assertions(1)
        return apiClient.assetFolders
          .getExisting()
          .then(assetFolders => {
            return expect(assetFolders.length).toBe(0)
          })
          .catch((e: any) => Promise.reject(e))
      })
      test('to have one asset folder after creation', () => {
        expect.assertions(1)
        return apiClient.assetFolders
          .create('test 1')
          .then(assetFolder => {
            folder1 = assetFolder
            return apiClient.assetFolders.getExisting()
          })
          .then(assetFolders => expect(assetFolders.length).toBe(1))
          .catch((e: any) => Promise.reject(e))
      })
      test('to have two asset folders after 2nd creation', () => {
        expect.assertions(1)
        return apiClient.assetFolders
          .create('test 2')
          .then(assetFolder => {
            folder2 = assetFolder
            return apiClient.assetFolders.getExisting()
          })
          .then(assetFolders => expect(assetFolders.length).toBe(2))
          .catch((e: any) => Promise.reject(e))
      })
      test('get folder 1 by id', () => {
        expect.assertions(1)
        return apiClient.assetFolders
          .get(folder1.id as number)
          .then(assetFolder => expect(assetFolder.name).toBe(folder1.name))
          .catch((e: any) => Promise.reject(e))
      })
      test('get folder 2 by name', () => {
        expect.assertions(1)
        return apiClient.assetFolders
          .getByName(folder2.name as string)
          .then(assetFolders => expect(assetFolders[0].id).toBe(folder2.id))
          .catch((e: any) => Promise.reject(e))
      })
      test('delete existing asset folders to execute successfully', () => {
        expect.assertions(1)
        return apiClient.assetFolders
          .deleteExisting()
          .then(() => {
            expect(1).toBe(1)
            return Promise.resolve()
          })
          .catch((e: any) => Promise.reject(e))
      })
      test('to have no existing asset folder', () => {
        expect.assertions(1)
        return apiClient.assetFolders
          .getExisting()
          .then(assetFolders => {
            return expect(assetFolders.length).toBe(0)
          })
          .catch((e: any) => Promise.reject(e))
      })
    })
    describe('asset related operations', () => {
      let assets: IAsset[] = []
      test(
        'delete existing assets to execute successfully',
        () => {
          expect.assertions(1)
          return apiClient.assets
            .deleteExisting()
            .then(() => expect(1).toBe(1))
            .catch((e: any) => Promise.reject(e))
        },
        60000 * 15
      )
      test('to have no existing asset by .count() method', () => {
        expect.assertions(1)
        return apiClient.assets
          .count()
          .then((count: number) => expect(count).toBe(0))
          .catch((e: any) => Promise.reject(e))
      })
      test(
        'create assets to complete successfully',
        () => {
          expect.assertions(1)
          const basePath = path.resolve('./tests')
          const fileNames = ['1.JPG', '2.png', '3.JPG', '4.png']
          return Promise.all(
            fileNames.map(fileName => {
              return apiClient.assets.createFromImage(
                {filename: fileName},
                path.join(basePath, fileName),
                true,
                640
              )
            })
          )
            .then(created => {
              assets = created
              return expect(1).toBe(1)
            })
            .catch((e: any) => Promise.reject(e))
        },
        15000
      )
      test('to get a count of 4 by .count() method', () => {
        expect.assertions(1)
        return apiClient.assets
          .count()
          .then((count: number) => expect(count).toBe(4))
          .catch((e: any) => Promise.reject(e))
      })
      test('get asset by id', () => {
        expect.assertions(1)
        return apiClient.assets
          .get(assets[0].id as number)
          .then(asset => {
            return expect(asset.filename).toBe(assets[0].filename)
          })
          .catch((e: any) => Promise.reject(e))
      })
      test('get asset by url', () => {
        expect.assertions(1)
        return apiClient.assets
          .getByUrl(assets[3].filename as string)
          .then(found => {
            const asset: IAsset = found as IAsset
            return expect(asset.id as number).toBe(assets[3].id as number)
          })
          .catch((e: any) => Promise.reject(e))
      })
      test('delete existing assets to execute successfully', () => {
        expect.assertions(1)
        return apiClient.assets
          .deleteExisting()
          .then(() => expect(1).toBe(1))
          .catch((e: any) => Promise.reject(e))
      })
      test('to have no existing asset by getExisting', () => {
        expect.assertions(1)
        return apiClient.assets
          .getExisting()
          .then(found => expect(found.length).toBe(0))
          .catch((e: any) => Promise.reject(e))
      })
    })
    describe('story related operations', () => {
      let rootFolders: IStory[] = []
      test('delete existing stories to succeed', () => {
        expect.assertions(1)
        return apiClient.stories
          .deleteExisting()
          .then(() => expect(1).toBe(1))
          .catch((e: any) => Promise.reject(e))
      })
      test('to have no existing stories by .count() method', () => {
        expect.assertions(1)
        return apiClient.stories
          .count()
          .then((count: number) => expect(count).toBe(0))
          .catch((e: any) => Promise.reject(e))
      })
      test(
        'create 3 root folders to complete successfully',
        () => {
          expect.assertions(1)
          return Promise.all(
            mockRootFolders.map(folder => apiClient.stories.create(folder))
          )
            .then(created => {
              rootFolders = created
              return rootFolders
            })
            .then(() => expect(1).toBe(1))
            .catch((e: any) => Promise.reject(e))
        },
        15000
      )
      test('to find stories by .getExisting() method', () => {
        expect.assertions(1)
        return apiClient.stories
          .getExisting()
          .then((stories: IStory[]) => expect(stories.length).toBe(3))
          .catch((e: any) => Promise.reject(e))
      })
      test('delete existing stories to succeed', () => {
        expect.assertions(1)
        return apiClient.stories
          .deleteExisting()
          .then(() => expect(1).toBe(1))
          .catch((e: any) => Promise.reject(e))
      })
      test('to have no existing stories by .getExisting() method', () => {
        expect.assertions(1)
        return apiClient.stories
          .getExisting()
          .then((stories: IStory[]) => expect(stories.length).toBe(0))
          .catch((e: any) => Promise.reject(e))
      })
    })
  })
})
