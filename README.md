# Storyblok Management API Wrapper

library for working with Storyblok management API. Uses axios to make Storyblok management API calls. Based on the official [storyblok/storyblok-js-client](https://github.com/storyblok/storyblok-js-client)

## Install

```bash
npm install --save storyblok-management-api-wrapper
```

## Classes

<dl>
<dt><a href="#StoryblokApiClient">StoryblokApiClient</a></dt>
<dd><p>instance of Storyblok API interface</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#apiErrorHandler">apiErrorHandler(error, fnName)</a></dt>
<dd><p>API error handler</p>
</dd>
<dt><a href="#bufferImage">bufferImage(filePath, compression, dimLimit)</a> ⇒ <code>Promise.&lt;Buffer&gt;</code></dt>
<dd><p>Using &#39;sharp&#39; library to generate data buffer
image compression is applied accordingly</p>
</dd>
<dt><a href="#compressImage">compressImage(image, compression)</a> ⇒ <code>Object</code></dt>
<dd><p>takes a sharp.js image object and compress as specified</p>
</dd>
<dt><a href="#resizeImage">resizeImage(image, dimLimit)</a> ⇒ <code>Object</code></dt>
<dd><p>takes a sharp.js image object and resize as specified</p>
</dd>
</dl>

<a name="StoryblokApiClient"></a>

## StoryblokApiClient

instance of Storyblok API interface

**Kind**: global class

- [StoryblokApiClient](#StoryblokApiClient)
  - [new StoryblokApiClient(config)](#new_StoryblokApiClient_new)
  - [.countAssets()](#StoryblokApiClient+countAssets) ⇒ <code>number</code>
  - [.countStories()](#StoryblokApiClient+countStories) ⇒ <code>number</code>
  - [.createAssetFolder(name)](#StoryblokApiClient+createAssetFolder) ⇒ <code>Object</code>
  - [.createComponent(definition)](#StoryblokApiClient+createComponent) ⇒ <code>Object</code>
  - [.createStory(storyData)](#StoryblokApiClient+createStory) ⇒ <code>Object</code>
  - [.createImageAsset(filePath, compression, dimLimit)](#StoryblokApiClient+createImageAsset) ⇒ <code>string</code>
  - [.deleteAsset(assetId)](#StoryblokApiClient+deleteAsset) ⇒ <code>number</code>
  - [.deleteAssetFolder(assetFolderId)](#StoryblokApiClient+deleteAssetFolder) ⇒ <code>number</code>
  - [.deleteComponent(componentId)](#StoryblokApiClient+deleteComponent) ⇒ <code>number</code>
  - [.deleteExistingAssets()](#StoryblokApiClient+deleteExistingAssets) ⇒ <code>Array.&lt;number&gt;</code>
  - [.deleteExistingComponents()](#StoryblokApiClient+deleteExistingComponents) ⇒ <code>Array.&lt;number&gt;</code>
  - [.deleteExistingStories()](#StoryblokApiClient+deleteExistingStories)
  - [.deleteStory(storyId)](#StoryblokApiClient+deleteStory) ⇒ <code>number</code>
  - [.getComponent(componentId)](#StoryblokApiClient+getComponent) ⇒ <code>Object</code>
  - [.getExistingAssets()](#StoryblokApiClient+getExistingAssets) ⇒ <code>Array.&lt;Object&gt;</code>
  - [.getExistingAssetFolders()](#StoryblokApiClient+getExistingAssetFolders) ⇒ <code>Array.&lt;Object&gt;</code>
  - [.getExistingComponents()](#StoryblokApiClient+getExistingComponents) ⇒ <code>Array.&lt;Object&gt;</code>
  - [.getExistingStories()](#StoryblokApiClient+getExistingStories) ⇒ <code>Array.&lt;Object&gt;</code>
  - [.getSpace()](#StoryblokApiClient+getSpace) ⇒ <code>Object</code>
  - [.getStory(storyId)](#StoryblokApiClient+getStory) ⇒ <code>Object</code>
  - [.reorderStory(storyId, afterId)](#StoryblokApiClient+reorderStory) ⇒ <code>Object</code>
  - [.signAsset(filename)](#StoryblokApiClient+signAsset) ⇒ <code>Object</code>
  - [.uploadAsset(buffer, signedRequest)](#StoryblokApiClient+uploadAsset) ⇒ <code>string</code>

<a name="new_StoryblokApiClient_new"></a>

### new StoryblokApiClient(config)

initialize an instance

| Param            | Type                                       | Description                                     |
| ---------------- | ------------------------------------------ | ----------------------------------------------- |
| config           | <code>Object</code>                        | setup parameters                                |
| config.spaceId   | <code>number</code> \| <code>string</code> | working spaceId                                 |
| config.apiKey    | <code>string</code>                        | management API oauth token                      |
| config.region    | <code>string</code>                        | region, default: undefined (optional)           |
| config.timeout   | <code>number</code>                        | timeout, default: 0 (optional)                  |
| config.https     | <code>boolean</code>                       | request protocol, default: undefined (optional) |
| config.rateLimit | <code>number</code>                        | request rate limit, default: 3 (optional)       |

**Example**

```js
// 1. require the StoryblokApiClient
const StoryblokApiClient = require("storyblok-management-api-wrapper")

// 2. initialize the client with spaceId and apiKey
const spaceId = 123456
const apiKey = asdfklasjdfaksjfdaksjdfasjk
const apiClient = new StoryblokApiClient({ spaceId, apiKey })
```

<a name="StoryblokApiClient+countAssets"></a>

### storyblokApiClient.countAssets() ⇒ <code>number</code>

get total number of existing assets

**Kind**: instance method of [<code>StoryblokApiClient</code>](#StoryblokApiClient)
**Returns**: <code>number</code> - get a count of existing assets
<a name="StoryblokApiClient+countStories"></a>

### storyblokApiClient.countStories() ⇒ <code>number</code>

get total number of existing stories

Storyblok API's space info does not account 'folders' as stories, so "this.getSpace({ spaceId }).then(space => space.stories_count)" does not work for the purpose of this function
must be manually retrieved

**Kind**: instance method of [<code>StoryblokApiClient</code>](#StoryblokApiClient)
**Returns**: <code>number</code> - get a count of existing stories
<a name="StoryblokApiClient+createAssetFolder"></a>

### storyblokApiClient.createAssetFolder(name) ⇒ <code>Object</code>

create an asset folder

**Kind**: instance method of [<code>StoryblokApiClient</code>](#StoryblokApiClient)
**Returns**: <code>Object</code> - asset folder information

| Param | Type                | Description              |
| ----- | ------------------- | ------------------------ |
| name  | <code>string</code> | name of folder to create |

<a name="StoryblokApiClient+createComponent"></a>

### storyblokApiClient.createComponent(definition) ⇒ <code>Object</code>

create a component

**Kind**: instance method of [<code>StoryblokApiClient</code>](#StoryblokApiClient)
**Returns**: <code>Object</code> - details of component that was created

| Param      | Type                | Description                           |
| ---------- | ------------------- | ------------------------------------- |
| definition | <code>Object</code> | Storyblok component definition object |

<a name="StoryblokApiClient+createStory"></a>

### storyblokApiClient.createStory(storyData) ⇒ <code>Object</code>

create a content story

**Kind**: instance method of [<code>StoryblokApiClient</code>](#StoryblokApiClient)
**Returns**: <code>Object</code> - details of story that was created

| Param     | Type                | Description                 |
| --------- | ------------------- | --------------------------- |
| storyData | <code>Object</code> | Storyblok story data object |

<a name="StoryblokApiClient+createImageAsset"></a>

### storyblokApiClient.createImageAsset(filePath, compression, dimLimit) ⇒ <code>string</code>

create an asset from image
compression and resize using the `sharp.js` library

**Kind**: instance method of [<code>StoryblokApiClient</code>](#StoryblokApiClient)
**Returns**: <code>string</code> - public url to access the asset

| Param       | Type                 | Default            | Description                  |
| ----------- | -------------------- | ------------------ | ---------------------------- |
| filePath    | <code>string</code>  |                    | absolute file path to image  |
| compression | <code>boolean</code> | <code>false</code> | flag to compress image       |
| dimLimit    | <code>number</code>  |                    | resize dimension limit value |

<a name="StoryblokApiClient+deleteAsset"></a>

### storyblokApiClient.deleteAsset(assetId) ⇒ <code>number</code>

delete a specific asset

**Kind**: instance method of [<code>StoryblokApiClient</code>](#StoryblokApiClient)
**Returns**: <code>number</code> - assetId is returned on success

| Param   | Type                | Description                   |
| ------- | ------------------- | ----------------------------- |
| assetId | <code>number</code> | id of the asset to be deleted |

<a name="StoryblokApiClient+deleteAssetFolder"></a>

### storyblokApiClient.deleteAssetFolder(assetFolderId) ⇒ <code>number</code>

delete a specific asset folder

**Kind**: instance method of [<code>StoryblokApiClient</code>](#StoryblokApiClient)
**Returns**: <code>number</code> - assetFolderId is returned on success

| Param         | Type                | Description                      |
| ------------- | ------------------- | -------------------------------- |
| assetFolderId | <code>number</code> | id of asset folder to be deleted |

<a name="StoryblokApiClient+deleteComponent"></a>

### storyblokApiClient.deleteComponent(componentId) ⇒ <code>number</code>

delete a specific component

**Kind**: instance method of [<code>StoryblokApiClient</code>](#StoryblokApiClient)
**Returns**: <code>number</code> - componentId is returned on success

| Param       | Type                | Description                   |
| ----------- | ------------------- | ----------------------------- |
| componentId | <code>number</code> | id of component to be deleted |

<a name="StoryblokApiClient+deleteExistingAssets"></a>

### storyblokApiClient.deleteExistingAssets() ⇒ <code>Array.&lt;number&gt;</code>

delete all existing assets

**Kind**: instance method of [<code>StoryblokApiClient</code>](#StoryblokApiClient)
**Returns**: <code>Array.&lt;number&gt;</code> - array of asset id's that were removed
<a name="StoryblokApiClient+deleteExistingComponents"></a>

### storyblokApiClient.deleteExistingComponents() ⇒ <code>Array.&lt;number&gt;</code>

delete all existing components

**Kind**: instance method of [<code>StoryblokApiClient</code>](#StoryblokApiClient)
**Returns**: <code>Array.&lt;number&gt;</code> - array of component id's that were removed
<a name="StoryblokApiClient+deleteExistingStories"></a>

### storyblokApiClient.deleteExistingStories()

delete all existing stories

**Kind**: instance method of [<code>StoryblokApiClient</code>](#StoryblokApiClient)
<a name="StoryblokApiClient+deleteStory"></a>

### storyblokApiClient.deleteStory(storyId) ⇒ <code>number</code>

delete a specific story

**Kind**: instance method of [<code>StoryblokApiClient</code>](#StoryblokApiClient)
**Returns**: <code>number</code> - id of story that was removed

| Param   | Type                | Description                   |
| ------- | ------------------- | ----------------------------- |
| storyId | <code>number</code> | id of the story to be deleted |

<a name="StoryblokApiClient+getComponent"></a>

### storyblokApiClient.getComponent(componentId) ⇒ <code>Object</code>

get a specific component

**Kind**: instance method of [<code>StoryblokApiClient</code>](#StoryblokApiClient)
**Returns**: <code>Object</code> - component definition

| Param       | Type                | Description     |
| ----------- | ------------------- | --------------- |
| componentId | <code>number</code> | id of component |

<a name="StoryblokApiClient+getExistingAssets"></a>

### storyblokApiClient.getExistingAssets() ⇒ <code>Array.&lt;Object&gt;</code>

list all existing assets

**Kind**: instance method of [<code>StoryblokApiClient</code>](#StoryblokApiClient)
**Returns**: <code>Array.&lt;Object&gt;</code> - full list of existing assets
<a name="StoryblokApiClient+getExistingAssetFolders"></a>

### storyblokApiClient.getExistingAssetFolders() ⇒ <code>Array.&lt;Object&gt;</code>

list all existing asset folders

**Kind**: instance method of [<code>StoryblokApiClient</code>](#StoryblokApiClient)
**Returns**: <code>Array.&lt;Object&gt;</code> - List of asset folder details
<a name="StoryblokApiClient+getExistingComponents"></a>

### storyblokApiClient.getExistingComponents() ⇒ <code>Array.&lt;Object&gt;</code>

list all existing components
(it is assumed that the working space has at most 1000 existing components)

**Kind**: instance method of [<code>StoryblokApiClient</code>](#StoryblokApiClient)
**Returns**: <code>Array.&lt;Object&gt;</code> - List of component definitions
<a name="StoryblokApiClient+getExistingStories"></a>

### storyblokApiClient.getExistingStories() ⇒ <code>Array.&lt;Object&gt;</code>

list all existing stories

**Kind**: instance method of [<code>StoryblokApiClient</code>](#StoryblokApiClient)
**Returns**: <code>Array.&lt;Object&gt;</code> - full list of existing content stories
<a name="StoryblokApiClient+getSpace"></a>

### storyblokApiClient.getSpace() ⇒ <code>Object</code>

get information on the working space

**Kind**: instance method of [<code>StoryblokApiClient</code>](#StoryblokApiClient)
**Returns**: <code>Object</code> - space information
<a name="StoryblokApiClient+getStory"></a>

### storyblokApiClient.getStory(storyId) ⇒ <code>Object</code>

get a specific story

**Kind**: instance method of [<code>StoryblokApiClient</code>](#StoryblokApiClient)
**Returns**: <code>Object</code> - details of content story

| Param   | Type                | Description             |
| ------- | ------------------- | ----------------------- |
| storyId | <code>number</code> | id of the content story |

<a name="StoryblokApiClient+reorderStory"></a>

### storyblokApiClient.reorderStory(storyId, afterId) ⇒ <code>Object</code>

modify a story's sequential order

**Kind**: instance method of [<code>StoryblokApiClient</code>](#StoryblokApiClient)
**Returns**: <code>Object</code> - details of the moved story

| Param   | Type                | Description                             |
| ------- | ------------------- | --------------------------------------- |
| storyId | <code>string</code> | id of the story to be moved             |
| afterId | <code>string</code> | to be positioned after story of this id |

<a name="StoryblokApiClient+signAsset"></a>

### storyblokApiClient.signAsset(filename) ⇒ <code>Object</code>

register a file as a Storyblok asset
the physical file still has to be uploaded

**Kind**: instance method of [<code>StoryblokApiClient</code>](#StoryblokApiClient)
**Returns**: <code>Object</code> - asset signing info

| Param    | Type                | Description              |
| -------- | ------------------- | ------------------------ |
| filename | <code>string</code> | file name to be register |

<a name="StoryblokApiClient+uploadAsset"></a>

### storyblokApiClient.uploadAsset(buffer, signedRequest) ⇒ <code>string</code>

physically upload an asset after it is registered with 'signAsset()' method

**Kind**: instance method of [<code>StoryblokApiClient</code>](#StoryblokApiClient)
**Returns**: <code>string</code> - Url to access the asset

| Param         | Type                | Description                                   |
| ------------- | ------------------- | --------------------------------------------- |
| buffer        | <code>Buffer</code> | buffered asset                                |
| signedRequest | <code>Object</code> | the server response from 'signAsset()' method |

<a name="apiErrorHandler"></a>

## apiErrorHandler(error, fnName)

API error handler

**Kind**: global function

| Param  | Type                | Description                           |
| ------ | ------------------- | ------------------------------------- |
| error  | <code>Object</code> | error object provided by the request  |
| fnName | <code>string</code> | function name where the error occured |

<a name="bufferImage"></a>

## bufferImage(filePath, compression, dimLimit) ⇒ <code>Promise.&lt;Buffer&gt;</code>

Using 'sharp' library to generate data buffer
image compression is applied accordingly

**Kind**: global function
**Returns**: <code>Promise.&lt;Buffer&gt;</code> - buffered image data

| Param       | Type                 | Default            | Description                    |
| ----------- | -------------------- | ------------------ | ------------------------------ |
| filePath    | <code>string</code>  |                    | absolute path to image file    |
| compression | <code>boolean</code> | <code>false</code> | flag to compress image         |
| dimLimit    | <code>number</code>  |                    | resizing dimension limit value |

<a name="compressImage"></a>

## compressImage(image, compression) ⇒ <code>Object</code>

takes a sharp.js image object and compress as specified

**Kind**: global function
**Returns**: <code>Object</code> - processed sharp.js image object

| Param       | Type                 | Description            |
| ----------- | -------------------- | ---------------------- |
| image       | <code>Object</code>  | sharp.js image object  |
| compression | <code>boolean</code> | flag to compress image |

<a name="resizeImage"></a>

## resizeImage(image, dimLimit) ⇒ <code>Object</code>

takes a sharp.js image object and resize as specified

**Kind**: global function
**Returns**: <code>Object</code> - processed sharp.js image object

| Param    | Type                | Description                    |
| -------- | ------------------- | ------------------------------ |
| image    | <code>Object</code> | sharp.js image object          |
| dimLimit | <code>number</code> | value to limit image dimension |
