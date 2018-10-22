# Storyblok Management API Typescript Client

[typescript](https://github.com/Microsoft/TypeScript) library for working with [Storyblok management API](https://api.storyblok.com/docs). Uses [axios](https://github.com/axios/axios) and [request-promise](https://github.com/request/request-promise) to make Storyblok management API calls

[![npm](https://img.shields.io/npm/v/storyblok-ts-client.svg)](https://www.npmjs.com/package/storyblok-ts-client)

## Description

<hr>

* consists of a basic CRUD client "[`Storyblok`](#Storyblok)" and a wrapper library of axios management API requests "[`ApiClient`](#ApiClient)"
* [ApiClient](#ApiClient) methods are categorized into the following:
  * [assetFolders](#ApiClient+assetFolders)
  * [assets](#ApiClient+assets)
  * [components](#ApiClient+components)
  * [spaces](#ApiClient+spaces)
  * [stories](#ApiClient+stories)
* API requests are throttled to 3 calls per second
* images are compressed and resized using [sharp](https://github.com/lovell/sharp)
* [jest](https://github.com/facebook/jest) is setup for testing (not fully tested)
* the management API is not fully implemented

## Installation

<hr>

```bash
npm install --save storyblok-ts-client
```

## Usage

<hr>

```js
// Basic CRUD client
const {Storyblok} = require('storyblok-ts-client')
const storyblok = storyblok('fake_api_token')
return storyblok.get('/12345')
  .then(res => console.log('space id:', res.data.id))
  // => space id: 12345

// Management API wrapper
const {ApiClient} = require('storyblok-ts-client')
const apiClient = ApiClient('fake_api_token', 12345)
return apiClient.spaces.get()
  .then(space => console.log('space id:', space.id))
  // => space id: 12345
```

## CLI Scripts

<hr>

```bash
# development and testing
npm run dev       # runs typescript transpiler in watch mode
npm run dev:test  # runs jest in watch mode
npm test          # runs jest
npm run coverage  # runs jest and check code coverage stat
npm start         # runs any executable code in the index.js

# build
npm run build

# tslint
npm run lint

# prettier
npm run format
```

## API Reference

<hr>

## Classes

<dl>
<dt><a href="#ApiClient">ApiClient</a></dt>
<dd><p>Class to facilitate Storyblok management API interface.</p></dd>
<dt><a href="#Storyblok">Storyblok</a></dt>
<dd><p>Basic Storyblok management API CRUD client using axios.  See &quot;<a href="https://api.storyblok.com/docs">https://api.storyblok.com/docs</a>&quot; for details.</p></dd>
</dl>

## Functions

<dl>
<dt><a href="#imageToBuffer">imageToBuffer(filePath, compress, [dimensionLimit])</a> ⇒ <code>Promise</code></dt>
<dd><p>Generate buffered image (image compression and resize is applied accordingly).</p></dd>
<dt><a href="#resizeImage">resizeImage(image, dimensionLimit)</a> ⇒ <code>Promise</code></dt>
<dd><p>Resize a sharp object</p></dd>
<dt><a href="#promiseRetry">promiseRetry(asyncFn, [args], [retries], [customDelay])</a> ⇒ <code>Promise</code></dt>
<dd><p>Simple promise failure retry function with constant amount of delay between retries.</p>
<p>Based on: <a href="https://tech.mybuilder.com/handling-retries-and-back-off-attempts-with-javascript-promises">https://tech.mybuilder.com/handling-retries-and-back-off-attempts-with-javascript-promises</a>.</p></dd>
</dl>

<a name="ApiClient"></a>

## ApiClient
<p>Class to facilitate Storyblok management API interface.</p>

**Kind**: global class  

* [ApiClient](#ApiClient)
    * [new ApiClient(apiToken, spaceId)](#new_ApiClient_new)
    * [.assetFolders](#ApiClient+assetFolders) ⇒ <code>Object</code>
        * [.create](#ApiClient+assetFolders+create) ⇒ <code>Promise</code>
        * [.delete](#ApiClient+assetFolders+delete) ⇒ <code>Promise</code>
        * [.deleteExisting](#ApiClient+assetFolders+deleteExisting) ⇒ <code>Promise</code>
        * [.get](#ApiClient+assetFolders+get) ⇒ <code>Promise</code>
        * [.getByName](#ApiClient+assetFolders+getByName) ⇒ <code>Promise</code>
        * [.getExisting](#ApiClient+assetFolders+getExisting) ⇒ <code>Promise</code>
    * [.assets](#ApiClient+assets) ⇒ <code>Object</code>
        * [.count](#ApiClient+assets+count) ⇒ <code>Promise</code>
        * [.createFromImage](#ApiClient+assets+createFromImage) ⇒ <code>Promise</code>
        * [.delete](#ApiClient+assets+delete) ⇒ <code>Promise</code>
        * [.deleteExisting](#ApiClient+assets+deleteExisting) ⇒ <code>Promise</code>
        * [.get](#ApiClient+assets+get) ⇒ <code>Promise</code>
        * [.getByUrl](#ApiClient+assets+getByUrl) ⇒ <code>Promise</code>
        * [.getExisting](#ApiClient+assets+getExisting) ⇒ <code>Promise</code>
        * [.register](#ApiClient+assets+register) ⇒ <code>Promise</code>
        * [.upload](#ApiClient+assets+upload) ⇒ <code>Promise</code>
    * [.components](#ApiClient+components) ⇒ <code>Object</code>
        * [.create](#ApiClient+components+create) ⇒ <code>Promise</code>
        * [.delete](#ApiClient+components+delete) ⇒ <code>Promise</code>
        * [.deleteExistingAssetFolders](#ApiClient+components+deleteExistingAssetFolders) ⇒ <code>Promise</code>
        * [.get](#ApiClient+components+get) ⇒ <code>Promise</code>
        * [.getExisting](#ApiClient+components+getExisting) ⇒ <code>Promise</code>
    * [.spaces](#ApiClient+spaces) ⇒ <code>Object</code>
        * [.get](#ApiClient+spaces+get) ⇒ <code>Promise</code>
    * [.stories](#ApiClient+stories) ⇒ <code>Object</code>
        * [.count](#ApiClient+stories+count) ⇒ <code>Promise</code>
        * [.countPages](#ApiClient+stories+countPages) ⇒ <code>Promise</code>
        * [.create](#ApiClient+stories+create) ⇒ <code>Promise</code>
        * [.delete](#ApiClient+stories+delete) ⇒ <code>Promise</code>
        * [.deleteExisting](#ApiClient+stories+deleteExisting) ⇒ <code>Promise</code>
        * [.get](#ApiClient+stories+get) ⇒ <code>Promise</code>
        * [.getByPage](#ApiClient+stories+getByPage) ⇒ <code>Promise</code>
        * [.getExisting](#ApiClient+stories+getExisting) ⇒ <code>Promise</code>
        * [.publish](#ApiClient+stories+publish) ⇒ <code>Promise</code>
        * [.publishPendings](#ApiClient+stories+publishPendings) ⇒ <code>Promise</code>
        * [.reorder](#ApiClient+stories+reorder) ⇒ <code>Promise</code>
        * [.update](#ApiClient+stories+update) ⇒ <code>Promise</code>
    * [.countAssets](#ApiClient+countAssets) ⇒ <code>Promise</code>
    * [.countStories](#ApiClient+countStories) ⇒ <code>Promise</code>
    * [.createAssetFolder](#ApiClient+createAssetFolder) ⇒ <code>Promise</code>
    * [.createAssetFromImage](#ApiClient+createAssetFromImage) ⇒ <code>Promise</code>
    * [.createComponent](#ApiClient+createComponent) ⇒ <code>Promise</code>
    * [.createStory](#ApiClient+createStory) ⇒ <code>Promise</code>
    * [.deleteAsset](#ApiClient+deleteAsset) ⇒ <code>Promise</code>
    * [.deleteAssetFolder](#ApiClient+deleteAssetFolder) ⇒ <code>Promise</code>
    * [.deleteComponent](#ApiClient+deleteComponent) ⇒ <code>Promise</code>
    * [.deleteExistingAssetFolders](#ApiClient+deleteExistingAssetFolders) ⇒ <code>Promise</code>
    * [.deleteExistingAssets](#ApiClient+deleteExistingAssets) ⇒ <code>Promise</code>
    * [.deleteExistingComponents](#ApiClient+deleteExistingComponents) ⇒ <code>Promise</code>
    * [.deleteExistingStories](#ApiClient+deleteExistingStories) ⇒ <code>Promise</code>
    * [.deleteStory](#ApiClient+deleteStory) ⇒ <code>Promise</code>
    * [.getAsset](#ApiClient+getAsset) ⇒ <code>Promise</code>
    * [.getAssetByUrl](#ApiClient+getAssetByUrl) ⇒ <code>Promise</code>
    * [.getAssetFolder](#ApiClient+getAssetFolder) ⇒ <code>Promise</code>
    * [.getAssetFolderByName](#ApiClient+getAssetFolderByName) ⇒ <code>Promise</code>
    * [.getComponent](#ApiClient+getComponent) ⇒ <code>Promise</code>
    * [.getExistingAssetFolders](#ApiClient+getExistingAssetFolders) ⇒ <code>Promise</code>
    * [.getExistingAssets](#ApiClient+getExistingAssets) ⇒ <code>Promise</code>
    * [.getExistingComponents](#ApiClient+getExistingComponents) ⇒ <code>Promise</code>
    * [.getExistingStories](#ApiClient+getExistingStories) ⇒ <code>Promise</code>
    * [.getSpace](#ApiClient+getSpace) ⇒ <code>Promise</code>
    * [.getStoriesByPage](#ApiClient+getStoriesByPage) ⇒ <code>Promise</code>
    * [.getStory](#ApiClient+getStory) ⇒ <code>Promise</code>
    * [.countStoryPages](#ApiClient+countStoryPages) ⇒ <code>Promise</code>
    * [.publishPendingStories](#ApiClient+publishPendingStories) ⇒ <code>Promise</code>
    * [.publishStory](#ApiClient+publishStory) ⇒ <code>Promise</code>
    * [.registerAsset](#ApiClient+registerAsset) ⇒ <code>Promise</code>
    * [.reorderStory](#ApiClient+reorderStory) ⇒ <code>Promise</code>
    * [.updateStory](#ApiClient+updateStory) ⇒ <code>Promise</code>
    * [.uploadAsset](#ApiClient+uploadAsset) ⇒ <code>Promise</code>

<a name="new_ApiClient_new"></a>

### new ApiClient(apiToken, spaceId)
<p>Class instantiation.</p>


| Param | Type | Description |
| --- | --- | --- |
| apiToken | <code>string</code> | <p>API access token.</p> |
| spaceId | <code>number</code> | <p>Storyblok working space id.</p> |

**Example**  
```js
const {ApiClient} = require('storyblok-ts-client')
const apiClient = ApiClient('fake_api_token', 12345)

return apiClient.spaces.get()
  .then(space => console.log('space id:', space.id))
  // => space id: 12345
```
<a name="ApiClient+assetFolders"></a>

### apiClient.assetFolders ⇒ <code>Object</code>
<p>Provides API methods for asset folders.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  

* [.assetFolders](#ApiClient+assetFolders) ⇒ <code>Object</code>
    * [.create](#ApiClient+assetFolders+create) ⇒ <code>Promise</code>
    * [.delete](#ApiClient+assetFolders+delete) ⇒ <code>Promise</code>
    * [.deleteExisting](#ApiClient+assetFolders+deleteExisting) ⇒ <code>Promise</code>
    * [.get](#ApiClient+assetFolders+get) ⇒ <code>Promise</code>
    * [.getByName](#ApiClient+assetFolders+getByName) ⇒ <code>Promise</code>
    * [.getExisting](#ApiClient+assetFolders+getExisting) ⇒ <code>Promise</code>

<a name="ApiClient+assetFolders+create"></a>

#### assetFolders.create ⇒ <code>Promise</code>
<p>Create an asset folder.</p>

**Kind**: instance property of [<code>assetFolders</code>](#ApiClient+assetFolders)  
**Fulfil**: <code>IAssetFolder</code> Details of the asset folder created.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>Name of asset folder to create.</p> |

<a name="ApiClient+assetFolders+delete"></a>

#### assetFolders.delete ⇒ <code>Promise</code>
<p>Delete a specific asset folder.</p>

**Kind**: instance property of [<code>assetFolders</code>](#ApiClient+assetFolders)  
**Fulfil**: <code>void</code>  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | <p>Id of asset folder to be deleted.</p> |

<a name="ApiClient+assetFolders+deleteExisting"></a>

#### assetFolders.deleteExisting ⇒ <code>Promise</code>
<p>Delete all existing asset folders.</p>

**Kind**: instance property of [<code>assetFolders</code>](#ApiClient+assetFolders)  
**Fulfil**: <code>void[]</code>  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+assetFolders+get"></a>

#### assetFolders.get ⇒ <code>Promise</code>
<p>Get a specific asset folder.</p>

**Kind**: instance property of [<code>assetFolders</code>](#ApiClient+assetFolders)  
**Fulfil**: <code>IAssetFolder</code> Asset folder information.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | <p>Id of the target asset folder.</p> |

<a name="ApiClient+assetFolders+getByName"></a>

#### assetFolders.getByName ⇒ <code>Promise</code>
<p>Get a list of asset folders by matching asset folders names to the supplied string.</p>

**Kind**: instance property of [<code>assetFolders</code>](#ApiClient+assetFolders)  
**Fulfil**: <code>IAssetFolder[]</code> List of asset folders that matches the name string.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>String to search asset folders by.</p> |

<a name="ApiClient+assetFolders+getExisting"></a>

#### assetFolders.getExisting ⇒ <code>Promise</code>
<p>Get existing asset folders.</p>

**Kind**: instance property of [<code>assetFolders</code>](#ApiClient+assetFolders)  
**Fulfil**: <code>IAssetFolder[]</code> List of existing asset folders.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+assets"></a>

### apiClient.assets ⇒ <code>Object</code>
<p>Provides API methods for assets.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Returns**: <code>Object</code> - <p>Asset API methods.</p>  

* [.assets](#ApiClient+assets) ⇒ <code>Object</code>
    * [.count](#ApiClient+assets+count) ⇒ <code>Promise</code>
    * [.createFromImage](#ApiClient+assets+createFromImage) ⇒ <code>Promise</code>
    * [.delete](#ApiClient+assets+delete) ⇒ <code>Promise</code>
    * [.deleteExisting](#ApiClient+assets+deleteExisting) ⇒ <code>Promise</code>
    * [.get](#ApiClient+assets+get) ⇒ <code>Promise</code>
    * [.getByUrl](#ApiClient+assets+getByUrl) ⇒ <code>Promise</code>
    * [.getExisting](#ApiClient+assets+getExisting) ⇒ <code>Promise</code>
    * [.register](#ApiClient+assets+register) ⇒ <code>Promise</code>
    * [.upload](#ApiClient+assets+upload) ⇒ <code>Promise</code>

<a name="ApiClient+assets+count"></a>

#### assets.count ⇒ <code>Promise</code>
<p>Get total number of existing assets.</p>

**Kind**: instance property of [<code>assets</code>](#ApiClient+assets)  
**Fulfil**: <code>number</code> A count of existing assets.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+assets+createFromImage"></a>

#### assets.createFromImage ⇒ <code>Promise</code>
<p>Create an image asset at root.</p>
<p>This method calls the ApiClient.registerAsset(), resize/compress the image then finally upload the physical file with ApiClient.uploadAsset() at one go.</p>

**Kind**: instance property of [<code>assets</code>](#ApiClient+assets)  
**Fulfil**: <code>IAsset</code> Information of the created asset.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| filePath | <code>string</code> | <p>Absolute file path to the image.</p> |
| compress | <code>boolean</code> | <p>Flag to compress image.</p> |
| dimensionLimit | <code>number</code> | <p>Resizing dimension limit value.</p> |

<a name="ApiClient+assets+delete"></a>

#### assets.delete ⇒ <code>Promise</code>
<p>Delete a specific asset.</p>

**Kind**: instance property of [<code>assets</code>](#ApiClient+assets)  
**Fulfil**: <code>IAsset</code> Information of the deleted asset.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | <p>Id of the asset to be deleted.</p> |

<a name="ApiClient+assets+deleteExisting"></a>

#### assets.deleteExisting ⇒ <code>Promise</code>
<p>Delete all existing assets.</p>

**Kind**: instance property of [<code>assets</code>](#ApiClient+assets)  
**Fulfil**: <code>IAsset[]</code> Information on the deleted assets.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+assets+get"></a>

#### assets.get ⇒ <code>Promise</code>
<p>Get a specific asset.</p>

**Kind**: instance property of [<code>assets</code>](#ApiClient+assets)  
**Fulfil**: <code>IAsset</code> Details of the asset.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | <p>Id of asset to fetch.</p> |

<a name="ApiClient+assets+getByUrl"></a>

#### assets.getByUrl ⇒ <code>Promise</code>
<p>Find a specific asset by its public url.</p>

**Kind**: instance property of [<code>assets</code>](#ApiClient+assets)  
**Fulfil**: <code>IAsset \| undefined</code> Matched asset or undefined if not fund.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | <p>Url to match by.</p> |

<a name="ApiClient+assets+getExisting"></a>

#### assets.getExisting ⇒ <code>Promise</code>
<p>List all existing assets.</p>

**Kind**: instance property of [<code>assets</code>](#ApiClient+assets)  
**Fulfil**: <code>IAsset[]</code> A list of existing assets.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+assets+register"></a>

#### assets.register ⇒ <code>Promise</code>
<p>Register an image file as a Storyblok asset (the physical file still has to be uploaded).</p>

**Kind**: instance property of [<code>assets</code>](#ApiClient+assets)  
**Fulfil**: <code>IAssetSigningResponse</code> Asset registration info (used for uploading).  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| asset | <code>IAsset</code> | <p>Information to create asset from.</p> |
| asset.filename | <code>string</code> | <p>File name to register for.</p> |
| [asset.asset_folder_id] | <code>number</code> | <p>(optional) Assign a asset folder.</p> |
| [asset.id] | <code>number</code> | <p>(optional) Id of existing asset to replace with this new asset.</p> |

<a name="ApiClient+assets+upload"></a>

#### assets.upload ⇒ <code>Promise</code>
<p>Upload a newly registered asset.</p>

**Kind**: instance property of [<code>assets</code>](#ApiClient+assets)  
**Fulfil**: <code>IAsset</code> Information of the uploaded asset.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Buffer</code> | <p>Buffered asset data.</p> |
| registration | <code>IAssetSigningResponse</code> | <p>Registration info.</p> |

<a name="ApiClient+components"></a>

### apiClient.components ⇒ <code>Object</code>
<p>Provides API methods for components.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Returns**: <code>Object</code> - <p>Component API methods.</p>  

* [.components](#ApiClient+components) ⇒ <code>Object</code>
    * [.create](#ApiClient+components+create) ⇒ <code>Promise</code>
    * [.delete](#ApiClient+components+delete) ⇒ <code>Promise</code>
    * [.deleteExistingAssetFolders](#ApiClient+components+deleteExistingAssetFolders) ⇒ <code>Promise</code>
    * [.get](#ApiClient+components+get) ⇒ <code>Promise</code>
    * [.getExisting](#ApiClient+components+getExisting) ⇒ <code>Promise</code>

<a name="ApiClient+components+create"></a>

#### components.create ⇒ <code>Promise</code>
<p>Create a component.</p>

**Kind**: instance property of [<code>components</code>](#ApiClient+components)  
**Fulfil**: <code>IComponent</code> Details of the component that was created.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| component | <code>IComponent</code> | <p>Info on component to be created.</p> |

<a name="ApiClient+components+delete"></a>

#### components.delete ⇒ <code>Promise</code>
<p>Delete a specific component.</p>

**Kind**: instance property of [<code>components</code>](#ApiClient+components)  
**Fulfil**: <code>IComponent</code> Details of the deleted component.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | <p>Id of component to be deleted.</p> |

<a name="ApiClient+components+deleteExistingAssetFolders"></a>

#### components.deleteExistingAssetFolders ⇒ <code>Promise</code>
<p>Delete all existing components.</p>

**Kind**: instance property of [<code>components</code>](#ApiClient+components)  
**Fulfil**: <code>IComponent[]</code> A list of deleted components details.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+components+get"></a>

#### components.get ⇒ <code>Promise</code>
<p>Fetch for a specific component.</p>

**Kind**: instance property of [<code>components</code>](#ApiClient+components)  
**Fulfil**: <code>IComponent</code> Details of the component definition.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | <p>Component id to fetch by.</p> |

<a name="ApiClient+components+getExisting"></a>

#### components.getExisting ⇒ <code>Promise</code>
<p>List all existing components.</p>

**Kind**: instance property of [<code>components</code>](#ApiClient+components)  
**Fulfil**: <code>IComponent[]</code> A list of component definitions.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+spaces"></a>

### apiClient.spaces ⇒ <code>Object</code>
<p>Provides API methods for the working space.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Returns**: <code>Object</code> - <p>Working space API methods.</p>  
<a name="ApiClient+spaces+get"></a>

#### spaces.get ⇒ <code>Promise</code>
<p>Get information on the working Storyblok space.</p>

**Kind**: instance property of [<code>spaces</code>](#ApiClient+spaces)  
**Fulfil**: <code>ISpace</code> Working space information.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+stories"></a>

### apiClient.stories ⇒ <code>Object</code>
<p>Provides API methods for stories.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Returns**: <code>Object</code> - <p>Story API methods.</p>  

* [.stories](#ApiClient+stories) ⇒ <code>Object</code>
    * [.count](#ApiClient+stories+count) ⇒ <code>Promise</code>
    * [.countPages](#ApiClient+stories+countPages) ⇒ <code>Promise</code>
    * [.create](#ApiClient+stories+create) ⇒ <code>Promise</code>
    * [.delete](#ApiClient+stories+delete) ⇒ <code>Promise</code>
    * [.deleteExisting](#ApiClient+stories+deleteExisting) ⇒ <code>Promise</code>
    * [.get](#ApiClient+stories+get) ⇒ <code>Promise</code>
    * [.getByPage](#ApiClient+stories+getByPage) ⇒ <code>Promise</code>
    * [.getExisting](#ApiClient+stories+getExisting) ⇒ <code>Promise</code>
    * [.publish](#ApiClient+stories+publish) ⇒ <code>Promise</code>
    * [.publishPendings](#ApiClient+stories+publishPendings) ⇒ <code>Promise</code>
    * [.reorder](#ApiClient+stories+reorder) ⇒ <code>Promise</code>
    * [.update](#ApiClient+stories+update) ⇒ <code>Promise</code>

<a name="ApiClient+stories+count"></a>

#### stories.count ⇒ <code>Promise</code>
<p>Get total number of existing stories (including folders).</p>

**Kind**: instance property of [<code>stories</code>](#ApiClient+stories)  
**Fulfil**: <code>number</code> A count of existing stories.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+stories+countPages"></a>

#### stories.countPages ⇒ <code>Promise</code>
<p>Get total pagination page count.</p>

**Kind**: instance property of [<code>stories</code>](#ApiClient+stories)  
**Fulfil**: <code>number</code> Total story pagination page count.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| [perPage] | <code>number</code> | <p>(optional) How many stories per page.  Defaults to 25.</p> |

<a name="ApiClient+stories+create"></a>

#### stories.create ⇒ <code>Promise</code>
<p>Create a story.</p>

**Kind**: instance property of [<code>stories</code>](#ApiClient+stories)  
**Fulfil**: <code>IStory</code> Details of story that was created.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| story | <code>IStory</code> | <p>Storyblok story data object.</p> |

<a name="ApiClient+stories+delete"></a>

#### stories.delete ⇒ <code>Promise</code>
<p>Delete a specific story.</p>

**Kind**: instance property of [<code>stories</code>](#ApiClient+stories)  
**Fulfil**: <code>IStory</code> Details of the story that was deleted.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| storyId | <code>IStory</code> | <p>Id of the story to be deleted.</p> |

<a name="ApiClient+stories+deleteExisting"></a>

#### stories.deleteExisting ⇒ <code>Promise</code>
<p>Delete all existing stories.</p>

**Kind**: instance property of [<code>stories</code>](#ApiClient+stories)  
**Fulfil**: <code>IStory[]</code> A list of deleted stories details.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+stories+get"></a>

#### stories.get ⇒ <code>Promise</code>
<p>Get a specific story.</p>

**Kind**: instance property of [<code>stories</code>](#ApiClient+stories)  
**Fulfil**: <code>IStory</code> Details of content story.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| storyId | <code>number</code> | <p>Id of the content story.</p> |

<a name="ApiClient+stories+getByPage"></a>

#### stories.getByPage ⇒ <code>Promise</code>
<p>Get paginated stories.</p>

**Kind**: instance property of [<code>stories</code>](#ApiClient+stories)  
**Fulfil**: <code>IStory[]</code> A page of stories.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| page | <code>number</code> | <p>Pagination number.</p> |
| [perPage] | <code>number</code> | <p>(optional) How many stories per page.  Defaults to 25.</p> |

<a name="ApiClient+stories+getExisting"></a>

#### stories.getExisting ⇒ <code>Promise</code>
<p>List all existing stories.</p>

**Kind**: instance property of [<code>stories</code>](#ApiClient+stories)  
**Fulfil**: <code>IStory[]</code> A full list of existing content stories.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+stories+publish"></a>

#### stories.publish ⇒ <code>Promise</code>
<p>Publish a specific story.</p>

**Kind**: instance property of [<code>stories</code>](#ApiClient+stories)  
**Fulfil**: <code>IStory</code> Details of the published story  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| storyId | <code>number</code> | <p>Id of the story to publish</p> |

<a name="ApiClient+stories+publishPendings"></a>

#### stories.publishPendings ⇒ <code>Promise</code>
<p>Publish all unpublished stories.</p>

**Kind**: instance property of [<code>stories</code>](#ApiClient+stories)  
**Fulfil**: <code>IStory[]</code> List of published stories.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+stories+reorder"></a>

#### stories.reorder ⇒ <code>Promise</code>
<p>Update a story's sequential order.</p>

**Kind**: instance property of [<code>stories</code>](#ApiClient+stories)  
**Fulfil**: <code>IStory</code> Details of the moved story.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| storyId | <code>number</code> | <p>Id of the story to be moved.</p> |
| afterId | <code>number</code> | <p>Reference story to position after.</p> |

<a name="ApiClient+stories+update"></a>

#### stories.update ⇒ <code>Promise</code>
<p>Update a story.</p>

**Kind**: instance property of [<code>stories</code>](#ApiClient+stories)  
**Fulfil**: <code>IStory</code> Details of story that was updated.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| story | <code>IStory</code> | <p>Storyblok story data object with modified info.</p> |

<a name="ApiClient+countAssets"></a>

### apiClient.countAssets ⇒ <code>Promise</code>
<p>Get total number of existing assets.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>number</code> A count of existing assets.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+countStories"></a>

### apiClient.countStories ⇒ <code>Promise</code>
<p>Get total number of existing stories (including folders).  Storyblok API's space info does not account 'folders' as stories, so this is manually counted.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>number</code> A count of existing stories.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+createAssetFolder"></a>

### apiClient.createAssetFolder ⇒ <code>Promise</code>
<p>Create an asset folder.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IAssetFolder</code> Details of the asset folder created.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>Name of asset folder to create.</p> |

<a name="ApiClient+createAssetFromImage"></a>

### apiClient.createAssetFromImage ⇒ <code>Promise</code>
<p>Create an image asset at root.</p>
<p>This method calls the ApiClient.registerAsset(), resize/compress the image then finally upload the physical file with ApiClient.uploadAsset() at one go.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IAsset</code> Information of the created asset.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| asset | <code>IAsset</code> | <p>Information to create asset from.</p> |
| asset.filename | <code>string</code> | <p>File name to register with.</p> |
| [asset.asset_folder_id] | <code>number</code> | <p>(optional) Assign a asset folder.</p> |
| [asset.id] | <code>number</code> | <p>(optional) Id of existing asset to replace with this new asset.</p> |
| filePath | <code>string</code> | <p>Absolute file path to the image.</p> |
| compress | <code>boolean</code> | <p>Flag to compress image.</p> |
| dimensionLimit | <code>number</code> | <p>Resizing dimension limit value.</p> |

<a name="ApiClient+createComponent"></a>

### apiClient.createComponent ⇒ <code>Promise</code>
<p>Create a component.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IComponent</code> Details of the component that was created.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| component | <code>IComponent</code> | <p>Info on component to be created.</p> |

<a name="ApiClient+createStory"></a>

### apiClient.createStory ⇒ <code>Promise</code>
<p>Create a story.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IStory</code> Details of story that was created.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| story | <code>IStory</code> | <p>Storyblok story data object.</p> |

<a name="ApiClient+deleteAsset"></a>

### apiClient.deleteAsset ⇒ <code>Promise</code>
<p>Delete a specific asset.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IAsset</code> Information on the deleted asset.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | <p>Id of the asset to be deleted.</p> |

<a name="ApiClient+deleteAssetFolder"></a>

### apiClient.deleteAssetFolder ⇒ <code>Promise</code>
<p>Delete a specific asset folder.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>void</code>  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | <p>Id of asset folder to be deleted.</p> |

<a name="ApiClient+deleteComponent"></a>

### apiClient.deleteComponent ⇒ <code>Promise</code>
<p>Delete a specific component.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IComponent</code> Details of the deleted component.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | <p>Id of component to be deleted.</p> |

<a name="ApiClient+deleteExistingAssetFolders"></a>

### apiClient.deleteExistingAssetFolders ⇒ <code>Promise</code>
<p>Delete all existing asset folders.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>void[]</code>  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+deleteExistingAssets"></a>

### apiClient.deleteExistingAssets ⇒ <code>Promise</code>
<p>Delete all existing assets.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IAsset[]</code> Details of the deleted assets.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+deleteExistingComponents"></a>

### apiClient.deleteExistingComponents ⇒ <code>Promise</code>
<p>Delete all existing components.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IComponent[]</code> A list of deleted components details.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+deleteExistingStories"></a>

### apiClient.deleteExistingStories ⇒ <code>Promise</code>
<p>Delete all existing stories.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IStory[]</code> A list of deleted stories details.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+deleteStory"></a>

### apiClient.deleteStory ⇒ <code>Promise</code>
<p>Delete a specific story.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IStory</code> Details of the story that was deleted.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| storyId | <code>number</code> | <p>Id of the story to be deleted.</p> |

<a name="ApiClient+getAsset"></a>

### apiClient.getAsset ⇒ <code>Promise</code>
<p>Get a specific asset.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IAsset</code> Details of the asset.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | <p>Id of asset to fetch.</p> |

<a name="ApiClient+getAssetByUrl"></a>

### apiClient.getAssetByUrl ⇒ <code>Promise</code>
<p>Find a specific asset by its public url.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IAsset \| undefined</code> Matched asset or undefined if not fund.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | <p>Url to match by.</p> |

<a name="ApiClient+getAssetFolder"></a>

### apiClient.getAssetFolder ⇒ <code>Promise</code>
<p>Get a specific asset folder.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IAssetFolder</code> Asset folder information.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | <p>Id of the target asset folder.</p> |

<a name="ApiClient+getAssetFolderByName"></a>

### apiClient.getAssetFolderByName ⇒ <code>Promise</code>
<p>Get a list of asset folders by matching asset folders names to the supplied string.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IAssetFolder[]</code> List of asset folders that matches the name string.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| searchString | <code>string</code> | <p>String to search asset folders by.</p> |

<a name="ApiClient+getComponent"></a>

### apiClient.getComponent ⇒ <code>Promise</code>
<p>Fetch for a specific component.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IComponent</code> Details of the component definition.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | <p>Component id to fetch by.</p> |

<a name="ApiClient+getExistingAssetFolders"></a>

### apiClient.getExistingAssetFolders ⇒ <code>Promise</code>
<p>Get existing asset folders.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IAssetFolder[]</code> List of existing asset folders.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+getExistingAssets"></a>

### apiClient.getExistingAssets ⇒ <code>Promise</code>
<p>List all existing assets.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IAsset[]</code> A list of existing assets.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+getExistingComponents"></a>

### apiClient.getExistingComponents ⇒ <code>Promise</code>
<p>List all existing components.  It is assumed that the working space has only 1,000 existing components at most.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IComponent[]</code> A list of component definitions.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+getExistingStories"></a>

### apiClient.getExistingStories ⇒ <code>Promise</code>
<p>List all existing stories.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IStory[]</code> A list of existing content stories.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+getSpace"></a>

### apiClient.getSpace ⇒ <code>Promise</code>
<p>Get information on the working Storyblok space.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>ISpace</code> Working space information.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+getStoriesByPage"></a>

### apiClient.getStoriesByPage ⇒ <code>Promise</code>
<p>Get paginated stories.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IStory[]</code> A page of stories.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| page | <code>number</code> | <p>Pagination number.</p> |
| [perPage] | <code>number</code> | <p>(optional) How many stories per page.</p> |

<a name="ApiClient+getStory"></a>

### apiClient.getStory ⇒ <code>Promise</code>
<p>Get a specific story.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IStory</code> Details of content story.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| storyId | <code>number</code> | <p>Id of the content story.</p> |

<a name="ApiClient+countStoryPages"></a>

### apiClient.countStoryPages ⇒ <code>Promise</code>
<p>Get total pagination page count.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>number</code> Total story pagination page count.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| [perPage] | <code>number</code> | <p>(optional) How many stories per page.  Defaults to 25.</p> |

<a name="ApiClient+publishPendingStories"></a>

### apiClient.publishPendingStories ⇒ <code>Promise</code>
<p>Publish all unpublished stories.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IStory[]</code> List of published stories.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+publishStory"></a>

### apiClient.publishStory ⇒ <code>Promise</code>
<p>Publish a specific story.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IStory</code> Details of the published story.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Description |
| --- | --- |
| storyId | <p>Id of the story to publish</p> |

<a name="ApiClient+registerAsset"></a>

### apiClient.registerAsset ⇒ <code>Promise</code>
<p>Register an image file as a Storyblok asset (the physical file still has to be uploaded).</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IAssetSigningResponse</code> Asset registration info (used for uploading).  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| asset | <code>IAsset</code> | <p>Information to create asset from.</p> |
| asset.filename | <code>string</code> | <p>File name to register with.</p> |
| [asset.asset_folder_id] | <code>number</code> | <p>(optional) Assign a asset folder.</p> |
| [asset.id] | <code>number</code> | <p>(optional) Id of existing asset to replace with this new asset.</p> |

<a name="ApiClient+reorderStory"></a>

### apiClient.reorderStory ⇒ <code>Promise</code>
<p>Update a story's sequential order.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IStory</code> Details of the moved story.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| storyId | <code>number</code> | <p>Id of the story to be moved.</p> |
| afterId | <code>number</code> | <p>Reference story to position after.</p> |

<a name="ApiClient+updateStory"></a>

### apiClient.updateStory ⇒ <code>Promise</code>
<p>Update a story.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IStory</code> Details of story that was updated.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| story | <code>IStory</code> | <p>Storyblok story data object with modified info.</p> |

<a name="ApiClient+uploadAsset"></a>

### apiClient.uploadAsset ⇒ <code>Promise</code>
<p>Upload a newly registered asset.  The request is throttled and set to retry on failure.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IAsset</code> Information of the uploaded asset.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Buffer</code> | <p>Buffered asset data.</p> |
| registration | <code>IAssetSigningResponse</code> | <p>Registration info.</p> |

<a name="Storyblok"></a>

## Storyblok
<p>Basic Storyblok management API CRUD client using axios.  See &quot;https://api.storyblok.com/docs&quot; for details.</p>

**Kind**: global class  

* [Storyblok](#Storyblok)
    * [new Storyblok(apiToken)](#new_Storyblok_new)
    * [.spaceId](#Storyblok+spaceId) : <code>number</code>
    * [.storyblok](#Storyblok+storyblok) : [<code>Storyblok</code>](#Storyblok)
    * [.apiToken](#Storyblok+apiToken) : <code>string</code>
    * [.axiosInst](#Storyblok+axiosInst) : <code>AxiosInstance</code>
    * [.throttledRequests](#Storyblok+throttledRequests) : <code>IThrottledRequests</code>
    * [.delete](#Storyblok+delete) ⇒ <code>Promise</code>
    * [.get](#Storyblok+get) ⇒ <code>Promise</code>
    * [.post](#Storyblok+post) ⇒ <code>Promise</code>
    * [.put](#Storyblok+put) ⇒ <code>Promise</code>
    * [.request](#Storyblok+request) ⇒ <code>Promise</code>

<a name="new_Storyblok_new"></a>

### new Storyblok(apiToken)
<p>Class instantiation.</p>


| Param | Type | Description |
| --- | --- | --- |
| apiToken | <code>string</code> | <p>API access token.</p> |

**Example**  
```js
const {Storyblok} = require('storyblok-ts-client')
const storyblok = Storyblok('fake_api_token')

return storyblok.get('/12345')
  .then(res => console.log('space id:', res.data.id))
  // => space id: 12345
```
<a name="Storyblok+spaceId"></a>

### storyblok.spaceId : <code>number</code>
<p>Storyblok working space id.</p>

**Kind**: instance property of [<code>Storyblok</code>](#Storyblok)  
<a name="Storyblok+storyblok"></a>

### storyblok.storyblok : [<code>Storyblok</code>](#Storyblok)
<p>Storyblok class instance</p>

**Kind**: instance property of [<code>Storyblok</code>](#Storyblok)  
<a name="Storyblok+apiToken"></a>

### storyblok.apiToken : <code>string</code>
<p>API access token.</p>

**Kind**: instance property of [<code>Storyblok</code>](#Storyblok)  
<a name="Storyblok+axiosInst"></a>

### storyblok.axiosInst : <code>AxiosInstance</code>
<p>Axios instance.</p>

**Kind**: instance property of [<code>Storyblok</code>](#Storyblok)  
<a name="Storyblok+throttledRequests"></a>

### storyblok.throttledRequests : <code>IThrottledRequests</code>
<p>Throttled Axios request methods.</p>

**Kind**: instance property of [<code>Storyblok</code>](#Storyblok)  
<a name="Storyblok+delete"></a>

### storyblok.delete ⇒ <code>Promise</code>
<p>General purpose 'delete' method to Storyblok using axios.</p>

**Kind**: instance property of [<code>Storyblok</code>](#Storyblok)  
**Fulfil**: <code>any</code> Resolved value.  
**Reject**: <code>any</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | <p>Request url.</p> |
| [config] | <code>AxiosRequestConfig</code> | <p>(optional) Request config.</p> |

<a name="Storyblok+get"></a>

### storyblok.get ⇒ <code>Promise</code>
<p>General purpose 'get' method to Storyblok using axios.</p>

**Kind**: instance property of [<code>Storyblok</code>](#Storyblok)  
**Fulfil**: <code>any</code> Resolved value.  
**Reject**: <code>any</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | <p>Request url.</p> |
| [config] | <code>AxiosRequestConfig</code> | <p>(optional) Request config.</p> |

<a name="Storyblok+post"></a>

### storyblok.post ⇒ <code>Promise</code>
<p>General purpose 'post' method to Storyblok using axios.</p>

**Kind**: instance property of [<code>Storyblok</code>](#Storyblok)  
**Fulfil**: <code>any</code> Resolved value.  
**Reject**: <code>any</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | <p>Request url.</p> |
| [data] | <code>any</code> | <p>(optional) Request body.</p> |
| [config] | <code>AxiosRequestConfig</code> | <p>(optional) Request config.</p> |

<a name="Storyblok+put"></a>

### storyblok.put ⇒ <code>Promise</code>
<p>General purpose 'put' method to Storyblok using axios.</p>

**Kind**: instance property of [<code>Storyblok</code>](#Storyblok)  
**Fulfil**: <code>any</code> Resolved value.  
**Reject**: <code>any</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | <p>Request url.</p> |
| [data] | <code>any</code> | <p>(optional) Request body.</p> |
| [config] | <code>AxiosRequestConfig</code> | <p>(optional) Request config.</p> |

<a name="Storyblok+request"></a>

### storyblok.request ⇒ <code>Promise</code>
<p>All-purpose purpose request method to Storyblok using axios.</p>

**Kind**: instance property of [<code>Storyblok</code>](#Storyblok)  
**Fulfil**: <code>any</code> Resolved value.  
**Reject**: <code>any</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>AxiosRequestConfig</code> | <p>Request config.</p> |

<a name="imageToBuffer"></a>

## imageToBuffer(filePath, compress, [dimensionLimit]) ⇒ <code>Promise</code>
<p>Generate buffered image (image compression and resize is applied accordingly).</p>

**Kind**: global function  
**Fulfil**: <code>Buffer</code> Buffered image data.  
**Reject**: <code>Error</code> Error value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filePath | <code>string</code> |  | <p>Absolute path to image file.</p> |
| compress | <code>boolean</code> | <code>false</code> | <p>Flag to compress image.</p> |
| [dimensionLimit] | <code>number</code> |  | <p>(optional) Resizing dimension limit value.</p> |

<a name="resizeImage"></a>

## resizeImage(image, dimensionLimit) ⇒ <code>Promise</code>
<p>Resize a sharp object</p>

**Kind**: global function  
**Fulfil**: <code>Sharp</code> Resized sharp object.  
**Reject**: <code>Error</code> Error value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| image | <code>Sharp</code> |  | <p>sharp object.</p> |
| dimensionLimit | <code>number</code> | <code>640</code> | <p>Size (in pixels) to limit image dimension.</p> |

<a name="promiseRetry"></a>

## promiseRetry(asyncFn, [args], [retries], [customDelay]) ⇒ <code>Promise</code>
<p>Simple promise failure retry function with constant amount of delay between retries.</p>
<p>Based on: https://tech.mybuilder.com/handling-retries-and-back-off-attempts-with-javascript-promises.</p>

**Kind**: global function  
**Fulfil**: <code>T \| undefined</code> Generic resolved value.  
**Reject**: <code>Error</code> Error value.  

| Param | Type | Description |
| --- | --- | --- |
| asyncFn | <code>function</code> | <p>Async function to execute.</p> |
| [args] | <code>Array.&lt;any&gt;</code> | <p>(optional) Arguments for the async function.</p> |
| [retries] | <code>number</code> | <p>(optional) Number of retries before rejecting the promise.</p> |
| [customDelay] | <code>number</code> | <p>(optional) Amount of delay before firing a retry(ms).</p> |



<hr>

&copy; 2018 juniorCitizen
