# Storyblok Management API Wrapper

[typescript](https://github.com/Microsoft/TypeScript) library for working with Storyblok management API. Uses [axios](https://github.com/axios/axios) and [request-promise](https://github.com/request/request-promise) to make Storyblok management API calls

## Features and Notes

<hr>

* requests are throttled to 3 calls per second
* images are compressed and resized using [sharp](https://github.com/lovell/sharp)
* [jest](https://github.com/facebook/jest) is setup for testing but no test has been written yet
* only parts of the management API are implemented

## Installation

<hr>

```bash
npm install --save storyblok-management-api-wrapper
```

## Usage

<hr>

```js
const storyblok = require('storyblok-management-api-wrapper')({
  spaceId: 12345,
  apiToken: fake_api_token,
})

return storyblok.spaces.get()
  .then(space => console.log('space id:', space.id))
  // => space id: 12345
```

## CLI Scripts

```bash
// development and testing
npm run dev      // runs typescript transpiler in watch mode
npm run dev:test // runs jest in watch mode
npm test         // runs jest
npm run coverage // runs jest and check code coverage stat
npm start        // runs any executable code in the index.js

// build
npm run build

// tslint
npm run lint

// prettier
npm run format
```

## API Reference

<hr>

API has been organized into categories and exposed through the following properties:

* `assetFolders` (methods to access Storyblok feature that's available to paid accounts or during trial period only)
* `assets`
* `components`
* `spaces`
* `stories`

### `storyblok.assetFolders` - *methods for assetFolders*

* storyblok.assetFolders.create(`name: string`) => `Promise<assetFolder>`

  * create an asset folder

* storyblok.assetFolders.delete(`id: number`) => `void`

  * delete a specific asset folder

* storyblok.assetFolders.deleteExisting() => `void`

  * delete all existing asset folders

* storyblok.assetFolders.get(`id: number`) => `Promise<assetFolder>`

  * get a specific asset folder

* storyblok.assetFolders.getExisting() => `Promise<assetFolder[]>`

  * get existing asset folders

* storyblok.assetFolders.searchByName(`name: string`) => `Promise<assetFolder[]>`

  * search asset folders by matching asset folder names to the supplied string

### `storyblok.assets` - *methods for assets*

* storyblok.assets.count() => `Promise<number>`

  * get total number of existing assets

* storyblok.assets.createFromImage(`asset: {}`, `filePath: string`, `compress?: boolean`, `dimensionLimit?: number`) => `Promise<asset>`

  * create an asset from image.
  * This method calls the assets.register(), resize/compress the image then finally upload the physical file with assets.upload() at one go
  * compression defaults to true and at the following level:
    * jpeg: {quality: 70}
    * png: {compressionLevel: 7}
  * resize default: 640px (image width/height are detected and resized so the longer side does not exceed the limit)
  * to use your own image process scheme/lib, use the assets.register() and assets.upload() methods instead

* storyblok.assets.delete(`id: number`) => `Promise<asset>`

  * delete a specific asset

* storyblok.assets.deleteExisting() => `Promise<asset[]>`

  * delete all existing assets

* storyblok.assets.get(`id: number`) => `Promise<asset>`

  * get a specific asset

* storyblok.assets.getExisting() => `Promise<asset[]>`

  * list all existing assets

* storyblok.assets.register(`filename: string`) => `Promise<signingResponse>`

  * register a file as a Storyblok asset
  * the physical file still has to be uploaded AWS S3 bucket

* storyblok.assets.searchByUrl(`publicUrl: string`) => `Promise<asset>`

  * find a specific asset by access url

* storyblok.assets.upload(`buffer: Buffer`, `signedResponse: {}`) => `Promise<asset>`

  * upload an asset after it is registered as a Storyblok asset

### `storyblok.components` - *methods for components*

* storyblok.components.create(`component: component`) => `Promise<component>`

  * create a component

* storyblok.components.delete(`id: number`) => `Promise<component>`

  * delete a specific component

* storyblok.components.deleteExisting() => `Promise<component[]>`

  * delete all existing components

* storyblok.components.getExisting() => `Promise<component[]>`

  * list all existing components
  * it is assumed that the working space has only 1,000 existing components at most

### `storyblok.spaces` - *methods for the working space*

* storyblok.spaces.get() => `Promise<space>`

  * get working space information

### `storyblok.stories` - *methods for content stories*

* storyblok.stories.count() => `Promise<number>`

  * get total number of existing stories (including folders)
  * Storyblok API's space info does not account 'folders' as stories, and must be manually retrieved

* storyblok.stories.create(`story: story`) => `Promise<story>`

  * create a story

* storyblok.stories.delete(`id: number`) => `Promise<story>`

  * delete a specific story

* storyblok.stories.deleteExisting() => `Promise<story[]>`

  * delete all existing stories

* storyblok.stories.get(`id: number`) => `Promise<story>`

  * get a specific story

* storyblok.stories.getExisting() => `Promise<story[]>`

  * list all existing stories

* storyblok.stories.publish(`id: number`) => `Promise<story>`

  * publish a specific story

* storyblok.stories.publishPendings() => `Promise<story[]>`

  * publish all unpublished stories

* storyblok.stories.reorder(`id: number`, `afterId: number`) => `Promise<story>`

  * modify a story's sequential order
