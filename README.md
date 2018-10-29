# Storyblok Management API Typescript Client

[typescript](https://github.com/Microsoft/TypeScript) library for working with [Storyblok management API](https://api.storyblok.com/docs). Uses [axios](https://github.com/axios/axios) to make Storyblok management API calls.

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

* API requests are throttled

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
npm start         # runs any executable code in the index.js

# test - remember to update .env file with a test Storyblok account api token and test space id
npm run dev:test  # runs jest in watch mode
npm test          # runs jest
npm run coverage  # runs jest and check code coverage stat

# build
npm run build

# tslint
npm run lint

# prettier
npm run format
```

## API Reference - generated with [jsdoc2md](https://github.com/jsdoc2md/jsdoc-to-markdown/wiki/How-to-document-TypeScript)

<hr>

## Classes

<dl>
<dt><a href="#ApiClient">ApiClient</a></dt>
<dd></dd>
<dt><a href="#Storyblok">Storyblok</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#imageToBuffer">imageToBuffer(filePath, compress, sizeLimit)</a> ⇒ <code>Promise</code></dt>
<dd><p>Generate buffered image (image compression and resize is applied accordingly).</p></dd>
<dt><a href="#resizeImage">resizeImage(image, sizeLimit)</a> ⇒ <code>Promise</code></dt>
<dd><p>Resize a sharp object</p></dd>
</dl>

<a name="ApiClient"></a>

## ApiClient
**Kind**: global class  
**Implements**: <code>IStoryblokClass</code>  
**Export**:   

* [ApiClient](#ApiClient)
    * [new ApiClient(apiToken, spaceId)](#new_ApiClient_new)
    * [.assetFolders](#ApiClient+assetFolders)
        * [.create](#ApiClient+assetFolders+create) ⇒ <code>Promise</code>
        * [.delete](#ApiClient+assetFolders+delete) ⇒ <code>Promise</code>
        * [.deleteExisting](#ApiClient+assetFolders+deleteExisting) ⇒ <code>Promise</code>
        * [.get](#ApiClient+assetFolders+get) ⇒ <code>Promise</code>
        * [.getByName](#ApiClient+assetFolders+getByName) ⇒ <code>Promise</code>
        * [.getExisting](#ApiClient+assetFolders+getExisting) ⇒ <code>Promise</code>
        * [.getByName](#ApiClient+assetFolders+getByName) ⇒ <code>Promise</code>
    * [.assets](#ApiClient+assets)
        * [.count](#ApiClient+assets+count) ⇒ <code>Promise</code>
        * [.createFromImage](#ApiClient+assets+createFromImage) ⇒ <code>Promise</code>
        * [.delete](#ApiClient+assets+delete) ⇒ <code>Promise</code>
        * [.deleteExisting](#ApiClient+assets+deleteExisting) ⇒ <code>Promise</code>
        * [.get](#ApiClient+assets+get) ⇒ <code>Promise</code>
        * [.getByPage](#ApiClient+assets+getByPage) ⇒ <code>Promise.&lt;Array.&lt;IAsset&gt;&gt;</code>
        * [.getByUrl](#ApiClient+assets+getByUrl) ⇒ <code>Promise</code>
        * [.getExisting](#ApiClient+assets+getExisting) ⇒ <code>Promise</code>
        * [.register](#ApiClient+assets+register) ⇒ <code>Promise</code>
        * [.upload](#ApiClient+assets+upload) ⇒ <code>Promise</code>
    * [.components](#ApiClient+components)
        * [.create](#ApiClient+components+create) ⇒ <code>Promise</code>
        * [.delete](#ApiClient+components+delete) ⇒ <code>Promise</code>
        * [.deleteExisting](#ApiClient+components+deleteExisting) ⇒ <code>Promise</code>
        * [.get](#ApiClient+components+get) ⇒ <code>Promise</code>
        * [.getExisting](#ApiClient+components+getExisting) ⇒ <code>Promise</code>
        * [.create](#ApiClient+components+create) ⇒ <code>Promise</code>
    * [.spaces](#ApiClient+spaces)
        * [.get](#ApiClient+spaces+get) ⇒ <code>Promise</code>
    * [.stories](#ApiClient+stories)
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
        * [.publishPendings](#ApiClient+stories+publishPendings) ⇒ <code>Promise</code>
    * [.countAssets](#ApiClient+countAssets) ⇒ <code>Promise</code>
    * [.countStories](#ApiClient+countStories) ⇒ <code>Promise</code>
    * [.countStoryPages](#ApiClient+countStoryPages) ⇒ <code>Promise</code>
    * [.createAssetFolder](#ApiClient+createAssetFolder) ⇒ <code>Promise</code>
    * [.createAssetFromImage](#ApiClient+createAssetFromImage) ⇒ <code>Promise</code>
    * [.createStory](#ApiClient+createStory) ⇒ <code>Promise</code>
    * [.deleteAsset](#ApiClient+deleteAsset) ⇒ <code>Promise</code>
    * [.deleteAssetFolder](#ApiClient+deleteAssetFolder) ⇒ <code>Promise</code>
    * [.deleteComponent](#ApiClient+deleteComponent) ⇒ <code>Promise</code>
    * [.deleteStory](#ApiClient+deleteStory) ⇒ <code>Promise</code>
    * [.deleteExistingAssetFolders](#ApiClient+deleteExistingAssetFolders) ⇒ <code>Promise</code>
    * [.deleteExistingAssets](#ApiClient+deleteExistingAssets) ⇒ <code>Promise</code>
    * [.deleteExistingComponents](#ApiClient+deleteExistingComponents) ⇒ <code>Promise</code>
    * [.deleteExistingStories](#ApiClient+deleteExistingStories) ⇒ <code>Promise</code>
    * [.getAsset](#ApiClient+getAsset) ⇒ <code>Promise</code>
    * [.getAssetByUrl](#ApiClient+getAssetByUrl) ⇒ <code>Promise</code>
    * [.getAssetFolder](#ApiClient+getAssetFolder) ⇒ <code>Promise</code>
    * [.getComponent](#ApiClient+getComponent) ⇒ <code>Promise</code>
    * [.getExistingAssets](#ApiClient+getExistingAssets) ⇒ <code>Promise</code>
    * [.getExistingComponents](#ApiClient+getExistingComponents) ⇒ <code>Promise</code>
    * [.getExistingAssetFolders](#ApiClient+getExistingAssetFolders) ⇒ <code>Promise</code>
    * [.getExistingStories](#ApiClient+getExistingStories) ⇒ <code>Promise</code>
    * [.getSpace](#ApiClient+getSpace) ⇒ <code>Promise</code>
    * [.getStoriesByPage](#ApiClient+getStoriesByPage) ⇒ <code>Promise</code>
    * [.publishStory](#ApiClient+publishStory) ⇒ <code>Promise</code>
    * [.registerAsset](#ApiClient+registerAsset) ⇒ <code>Promise</code>
    * [.reorderStory](#ApiClient+reorderStory) ⇒ <code>Promise</code>
    * [.updateStory](#ApiClient+updateStory) ⇒ <code>Promise</code>
    * [.uploadAsset](#ApiClient+uploadAsset) ⇒ <code>Promise</code>
    * [.getAssetsByPage([page], [perPage])](#ApiClient+getAssetsByPage) ⇒ <code>Promise.&lt;Array.&lt;IAsset&gt;&gt;</code>

<a name="new_ApiClient_new"></a>

### new ApiClient(apiToken, spaceId)
<p>Management API wrapper around Storyblok class.</p>


| Param | Type | Description |
| --- | --- | --- |
| apiToken | <code>string</code> | <p>API access token.</p> |
| spaceId | <code>number</code> | <p>Storyblok working space id.</p> |

**Example**  
```js
const {ApiClient} = require('storyblok-ts-client')
const apiClient = new ApiClient('fake_api_token', 12345)
```
<a name="ApiClient+assetFolders"></a>

### apiClient.assetFolders
<p>Object that contains API methods for asset folder operations</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Read only**: true  

* [.assetFolders](#ApiClient+assetFolders)
    * [.create](#ApiClient+assetFolders+create) ⇒ <code>Promise</code>
    * [.delete](#ApiClient+assetFolders+delete) ⇒ <code>Promise</code>
    * [.deleteExisting](#ApiClient+assetFolders+deleteExisting) ⇒ <code>Promise</code>
    * [.get](#ApiClient+assetFolders+get) ⇒ <code>Promise</code>
    * [.getByName](#ApiClient+assetFolders+getByName) ⇒ <code>Promise</code>
    * [.getExisting](#ApiClient+assetFolders+getExisting) ⇒ <code>Promise</code>
    * [.getByName](#ApiClient+assetFolders+getByName) ⇒ <code>Promise</code>

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
<p>Get asset folders by matching asset folders names to the supplied string.</p>

**Kind**: instance property of [<code>assetFolders</code>](#ApiClient+assetFolders)  
**Fulfil**: <code>IAssetFolder[]</code> List of matched asset folders.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| searchString | <code>string</code> | <p>String to search by.</p> |

<a name="ApiClient+assetFolders+getExisting"></a>

#### assetFolders.getExisting ⇒ <code>Promise</code>
<p>Get existing asset folders.</p>

**Kind**: instance property of [<code>assetFolders</code>](#ApiClient+assetFolders)  
**Fulfil**: <code>IAssetFolder[]</code> List of existing asset folders.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+assetFolders+getByName"></a>

#### assetFolders.getByName ⇒ <code>Promise</code>
<p>Get asset folders by matching asset folders names to the supplied string.</p>

**Kind**: instance property of [<code>assetFolders</code>](#ApiClient+assetFolders)  
**Fulfil**: <code>IAssetFolder[]</code> List of matched asset folders.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| searchString | <code>string</code> | <p>String to search by.</p> |

<a name="ApiClient+assets"></a>

### apiClient.assets
<p>Object that contains API methods for asset operations</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Read only**: true  

* [.assets](#ApiClient+assets)
    * [.count](#ApiClient+assets+count) ⇒ <code>Promise</code>
    * [.createFromImage](#ApiClient+assets+createFromImage) ⇒ <code>Promise</code>
    * [.delete](#ApiClient+assets+delete) ⇒ <code>Promise</code>
    * [.deleteExisting](#ApiClient+assets+deleteExisting) ⇒ <code>Promise</code>
    * [.get](#ApiClient+assets+get) ⇒ <code>Promise</code>
    * [.getByPage](#ApiClient+assets+getByPage) ⇒ <code>Promise.&lt;Array.&lt;IAsset&gt;&gt;</code>
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
<p>Create and asset and upload the physical file.</p>

**Kind**: instance property of [<code>assets</code>](#ApiClient+assets)  
**Fulfil**: <code>IAsset</code> Information on the new asset.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>IPendingAsset</code> | <p>Asset information.</p> |
| filePath | <code>string</code> | <p>Absolute file path to the image.</p> |
| compress | <code>boolean</code> | <p>Flag to compress image.</p> |
| sizeLimit | <code>number</code> | <p>Resizing dimension limit value.</p> |

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

<a name="ApiClient+assets+getByPage"></a>

#### assets.getByPage ⇒ <code>Promise.&lt;Array.&lt;IAsset&gt;&gt;</code>
<p>Get asset on a specific pagination page number.</p>

**Kind**: instance property of [<code>assets</code>](#ApiClient+assets)  
**Fulfil**: <code>IAsset[]</code> Assets on the pagination page.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [page] | <code>number</code> | <code>1</code> | <p>Pagination page.</p> |
| [perPage] | <code>number</code> | <code>25</code> | <p>Assets per page.</p> |

<a name="ApiClient+assets+getByUrl"></a>

#### assets.getByUrl ⇒ <code>Promise</code>
<p>Find a specific asset by its public url.</p>

**Kind**: instance property of [<code>assets</code>](#ApiClient+assets)  
**Fulfil**: <code>IAsset</code> Matched asset.  
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
<p>Register a Storyblok asset.</p>

**Kind**: instance property of [<code>assets</code>](#ApiClient+assets)  
**Fulfil**: <code>IRegistration</code> Asset registration info (used for uploading).  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| asset | <code>IPendingAsset</code> | <p>Information to create asset from.</p> |
| asset.filename | <code>string</code> | <p>File name to register for.</p> |
| [asset.asset_folder_id] | <code>number</code> | <p>(optional) Assign a asset folder.</p> |
| [asset.id] | <code>number</code> | <p>(optional) Id of existing asset to replace with this new asset.</p> |

<a name="ApiClient+assets+upload"></a>

#### assets.upload ⇒ <code>Promise</code>
<p>Upload a registered asset.</p>

**Kind**: instance property of [<code>assets</code>](#ApiClient+assets)  
**Fulfil**: <code>string</code> Access url of the uploaded asset.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Buffer</code> | <p>Buffered asset data.</p> |
| registration | <code>IRegistration</code> | <p>Registration info.</p> |

<a name="ApiClient+components"></a>

### apiClient.components
<p>Object that contains API methods for component operations</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Read only**: true  

* [.components](#ApiClient+components)
    * [.create](#ApiClient+components+create) ⇒ <code>Promise</code>
    * [.delete](#ApiClient+components+delete) ⇒ <code>Promise</code>
    * [.deleteExisting](#ApiClient+components+deleteExisting) ⇒ <code>Promise</code>
    * [.get](#ApiClient+components+get) ⇒ <code>Promise</code>
    * [.getExisting](#ApiClient+components+getExisting) ⇒ <code>Promise</code>
    * [.create](#ApiClient+components+create) ⇒ <code>Promise</code>

<a name="ApiClient+components+create"></a>

#### components.create ⇒ <code>Promise</code>
<p>Create a component.</p>

**Kind**: instance property of [<code>components</code>](#ApiClient+components)  
**Fulfil**: <code>IComponent</code> Details of the component that was created.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>IPendingComponent</code> | <p>Info on component to be created.</p> |

<a name="ApiClient+components+delete"></a>

#### components.delete ⇒ <code>Promise</code>
<p>Delete a specific component.</p>

**Kind**: instance property of [<code>components</code>](#ApiClient+components)  
**Fulfil**: <code>IComponent</code> Details of the deleted component.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | <p>Id of component to be deleted.</p> |

<a name="ApiClient+components+deleteExisting"></a>

#### components.deleteExisting ⇒ <code>Promise</code>
<p>Delete existing components.</p>

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
<p>List existing components.</p>

**Kind**: instance property of [<code>components</code>](#ApiClient+components)  
**Fulfil**: <code>IComponent[]</code> A list of component definitions.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+components+create"></a>

#### components.create ⇒ <code>Promise</code>
<p>Create a component.</p>

**Kind**: instance property of [<code>components</code>](#ApiClient+components)  
**Fulfil**: <code>IComponent</code> Details of the component that was created.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>IPendingComponent</code> | <p>Info on component to be created.</p> |

<a name="ApiClient+spaces"></a>

### apiClient.spaces
<p>Object that contains API methods for space operations</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Read only**: true  
<a name="ApiClient+spaces+get"></a>

#### spaces.get ⇒ <code>Promise</code>
<p>Get information on the working Storyblok space.</p>

**Kind**: instance property of [<code>spaces</code>](#ApiClient+spaces)  
**Fulfil**: <code>ISpace</code> Working space information.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+stories"></a>

### apiClient.stories
<p>Object that contains API methods for story operations</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Read only**: true  

* [.stories](#ApiClient+stories)
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
    * [.publishPendings](#ApiClient+stories+publishPendings) ⇒ <code>Promise</code>

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
| data | <code>IPendingStory</code> | <p>Storyblok story data object.</p> |

<a name="ApiClient+stories+delete"></a>

#### stories.delete ⇒ <code>Promise</code>
<p>Delete a specific story.</p>

**Kind**: instance property of [<code>stories</code>](#ApiClient+stories)  
**Fulfil**: <code>IStory</code> Details of the story that was deleted.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>IStory</code> | <p>Id of the story to be deleted.</p> |

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
| id | <code>number</code> | <p>Id of the content story.</p> |

<a name="ApiClient+stories+getByPage"></a>

#### stories.getByPage ⇒ <code>Promise</code>
<p>Get stories on a pagination page.</p>

**Kind**: instance property of [<code>stories</code>](#ApiClient+stories)  
**Fulfil**: <code>IStory[]</code> A page of stories.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| page | <code>number</code> | <p>Pagination page number.</p> |
| [perPage] | <code>number</code> | <p>(optional) How many stories per page.  Defaults to 25.</p> |

<a name="ApiClient+stories+getExisting"></a>

#### stories.getExisting ⇒ <code>Promise</code>
<p>List all existing stories.</p>

**Kind**: instance property of [<code>stories</code>](#ApiClient+stories)  
**Fulfil**: <code>IStory[]</code> A list of existing content stories.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+stories+publish"></a>

#### stories.publish ⇒ <code>Promise</code>
<p>Publish a specific story.</p>

**Kind**: instance property of [<code>stories</code>](#ApiClient+stories)  
**Fulfil**: <code>IStory</code> Details of the published story  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | <p>Id of the story to publish</p> |

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
| id | <code>number</code> | <p>Id of the story to be moved.</p> |
| afterId | <code>number</code> | <p>Id of reference story to position after.</p> |

<a name="ApiClient+stories+update"></a>

#### stories.update ⇒ <code>Promise</code>
<p>Update a story.</p>

**Kind**: instance property of [<code>stories</code>](#ApiClient+stories)  
**Fulfil**: <code>IStory</code> Details of story that was updated.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>IStory</code> | <p>Modified story info.</p> |

<a name="ApiClient+stories+publishPendings"></a>

#### stories.publishPendings ⇒ <code>Promise</code>
<p>Publish all unpublished stories.</p>

**Kind**: instance property of [<code>stories</code>](#ApiClient+stories)  
**Fulfil**: <code>IStory[]</code> List of published stories.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+countAssets"></a>

### apiClient.countAssets ⇒ <code>Promise</code>
<p>Get total number of existing assets.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>number</code> A count of existing assets.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+countStories"></a>

### apiClient.countStories ⇒ <code>Promise</code>
<p>Get total number of existing stories (including folders).</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>number</code> A count of existing stories.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+countStoryPages"></a>

### apiClient.countStoryPages ⇒ <code>Promise</code>
<p>Get total pagination page count.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>number</code> Total story pagination page count.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| [perPage] | <code>number</code> | <p>(optional) How many stories per page.  Defaults to 25.</p> |

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
<p>Create and asset and upload the physical file.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IAsset</code> Information on the new asset.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>IPendingAsset</code> | <p>Asset information.</p> |
| filePath | <code>string</code> | <p>Absolute file path to the image.</p> |
| compress | <code>boolean</code> | <p>Flag to compress image.</p> |
| sizeLimit | <code>number</code> | <p>Resizing dimension limit value.</p> |

<a name="ApiClient+createStory"></a>

### apiClient.createStory ⇒ <code>Promise</code>
<p>Create a story.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IStory</code> Details of story that was created.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>IPendingStory</code> | <p>Storyblok story data object.</p> |

<a name="ApiClient+deleteAsset"></a>

### apiClient.deleteAsset ⇒ <code>Promise</code>
<p>Delete a specific asset.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IAsset</code> Information of the deleted asset.  
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

<a name="ApiClient+deleteStory"></a>

### apiClient.deleteStory ⇒ <code>Promise</code>
<p>Delete a specific story.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IStory</code> Details of the story that was deleted.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>IStory</code> | <p>Id of the story to be deleted.</p> |

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
**Fulfil**: <code>IAsset[]</code> Information on the deleted assets.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+deleteExistingComponents"></a>

### apiClient.deleteExistingComponents ⇒ <code>Promise</code>
<p>Delete existing components.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IComponent[]</code> A list of deleted components details.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+deleteExistingStories"></a>

### apiClient.deleteExistingStories ⇒ <code>Promise</code>
<p>Delete all existing stories.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IStory[]</code> A list of deleted stories details.  
**Reject**: <code>AxiosError</code> Axios error.  
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
**Fulfil**: <code>IAsset</code> Matched asset.  
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

<a name="ApiClient+getComponent"></a>

### apiClient.getComponent ⇒ <code>Promise</code>
<p>Fetch for a specific component.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IComponent</code> Details of the component definition.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | <p>Component id to fetch by.</p> |

<a name="ApiClient+getExistingAssets"></a>

### apiClient.getExistingAssets ⇒ <code>Promise</code>
<p>List all existing assets.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IAsset[]</code> A list of existing assets.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+getExistingComponents"></a>

### apiClient.getExistingComponents ⇒ <code>Promise</code>
<p>List existing components.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IComponent[]</code> A list of component definitions.  
**Reject**: <code>AxiosError</code> Axios error.  
<a name="ApiClient+getExistingAssetFolders"></a>

### apiClient.getExistingAssetFolders ⇒ <code>Promise</code>
<p>Get existing asset folders.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IAssetFolder[]</code> List of existing asset folders.  
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
<p>Get stories on a pagination page.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IStory[]</code> A page of stories.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| page | <code>number</code> | <p>Pagination page number.</p> |
| [perPage] | <code>number</code> | <p>(optional) How many stories per page.  Defaults to 25.</p> |

<a name="ApiClient+publishStory"></a>

### apiClient.publishStory ⇒ <code>Promise</code>
<p>Publish a specific story.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IStory</code> Details of the published story  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | <p>Id of the story to publish</p> |

<a name="ApiClient+registerAsset"></a>

### apiClient.registerAsset ⇒ <code>Promise</code>
<p>Register a Storyblok asset.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IRegistration</code> Asset registration info (used for uploading).  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| asset | <code>IPendingAsset</code> | <p>Information to create asset from.</p> |
| asset.filename | <code>string</code> | <p>File name to register for.</p> |
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
| id | <code>number</code> | <p>Id of the story to be moved.</p> |
| afterId | <code>number</code> | <p>Reference story to position after.</p> |

<a name="ApiClient+updateStory"></a>

### apiClient.updateStory ⇒ <code>Promise</code>
<p>Update a story.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IStory</code> Details of story that was updated.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>IStory</code> | <p>Storyblok story data object with modified info.</p> |

<a name="ApiClient+uploadAsset"></a>

### apiClient.uploadAsset ⇒ <code>Promise</code>
<p>Upload a registered asset.</p>

**Kind**: instance property of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>string</code> Access url of the uploaded asset.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Buffer</code> | <p>Buffered asset data.</p> |
| registration | <code>IRegistration</code> | <p>Registration info.</p> |

<a name="ApiClient+getAssetsByPage"></a>

### apiClient.getAssetsByPage([page], [perPage]) ⇒ <code>Promise.&lt;Array.&lt;IAsset&gt;&gt;</code>
<p>Get asset on a specific pagination page number.</p>

**Kind**: instance method of [<code>ApiClient</code>](#ApiClient)  
**Fulfil**: <code>IAsset[]</code> Assets on the pagination page.  
**Reject**: <code>AxiosError</code> Axios error.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [page] | <code>number</code> | <code>1</code> | <p>Pagination page.</p> |
| [perPage] | <code>number</code> | <code>25</code> | <p>Assets per page.</p> |

<a name="Storyblok"></a>

## Storyblok
**Kind**: global class  
**Implements**: <code>IStoryblokClass</code>  
**Export**:   

* [Storyblok](#Storyblok)
    * [new Storyblok(apiToken)](#new_Storyblok_new)
    * [.delete](#Storyblok+delete) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.get](#Storyblok+get) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.post](#Storyblok+post) ⇒ <code>Promise.&lt;any&gt;</code>
    * [.put](#Storyblok+put) ⇒ <code>Promise.&lt;any&gt;</code>

<a name="new_Storyblok_new"></a>

### new Storyblok(apiToken)
<p>A class to provide basic CRUD request methods to Storyblok's management API with failure-retry options and built-in request throttling.  Uses axios library to facilitation the API calls.</p>


| Param | Type | Description |
| --- | --- | --- |
| apiToken | <code>string</code> | <p>API access token.</p> |

**Example**  
```js
const {Storyblok} = require('storyblok-ts-client')
const storyblok = new Storyblok('fake_api_token')
```
<a name="Storyblok+delete"></a>

### storyblok.delete ⇒ <code>Promise.&lt;any&gt;</code>
<p>DELETE request method.</p>

**Kind**: instance property of [<code>Storyblok</code>](#Storyblok)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [url] | <code>string</code> | <code>&quot;&#x27;/&#x27;&quot;</code> | <p>Request url.</p> |
| [config] | <code>ICustomAxiosRequestConfig</code> |  | <p>Request config.</p> |

**Example**  
```js
const {Storyblok} = require('storyblok-ts-client')
const storyblok = new Storyblok('fake_api_token')
const spaceId = 12345
const storyId = 123456
const url = `/${spaceId}/stories/${storyId}`
storyblok.delete(url, {retries: 3, retryDelay: 1000})
  .then(res => console.log('deleted story id:', res.story.id))
// => deleted story id: 123456
```
<a name="Storyblok+get"></a>

### storyblok.get ⇒ <code>Promise.&lt;any&gt;</code>
<p>GET request method.</p>

**Kind**: instance property of [<code>Storyblok</code>](#Storyblok)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [url] | <code>string</code> | <code>&quot;&#x27;/&#x27;&quot;</code> | <p>Request url.</p> |
| [config] | <code>ICustomAxiosRequestConfig</code> |  | <p>Request config.</p> |

**Example**  
```js
const {Storyblok} = require('storyblok-ts-client')
const storyblok = new Storyblok('fake_api_token')
const spaceId = 12345
const url = `/${spaceId}`
storyblok.get(url, {retries: 3, retryDelay: 1000})
  .then(res => console.log('space id:', res.space.id))
// => space id: 12345
```
<a name="Storyblok+post"></a>

### storyblok.post ⇒ <code>Promise.&lt;any&gt;</code>
<p>POST request method.</p>

**Kind**: instance property of [<code>Storyblok</code>](#Storyblok)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [url] | <code>string</code> | <code>&quot;&#x27;/&#x27;&quot;</code> | <p>Request url.</p> |
| [data] | <code>any</code> |  | <p>Request data body.</p> |
| [config] | <code>ICustomAxiosRequestConfig</code> |  | <p>Request config.</p> |

**Example**  
```js
const {Storyblok} = require('storyblok-ts-client')
const storyblok = new Storyblok('fake_api_token')
const spaceId = 12345
const url = `/${spaceId}/stories`
const story = {
  name: 'test',
  slug: 'test',
}
storyblok.post(url, {story}, {retries: 3, retryDelay: 1000})
  .then(res => console.log('new story id:', res.story.id))
// => new story id: 123456
```
<a name="Storyblok+put"></a>

### storyblok.put ⇒ <code>Promise.&lt;any&gt;</code>
<p>PUT request method.</p>

**Kind**: instance property of [<code>Storyblok</code>](#Storyblok)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [url] | <code>string</code> | <code>&quot;&#x27;/&#x27;&quot;</code> | <p>Request url.</p> |
| [data] | <code>any</code> |  | <p>Request data body.</p> |
| [config] | <code>ICustomAxiosRequestConfig</code> |  | <p>Request config.</p> |

**Example**  
```js
const {Storyblok} = require('storyblok-ts-client')
const storyblok = new Storyblok('fake_api_token')
const spaceId = 12345
const url = `/${spaceId}/stories`
const story = {name: 'test', slug: 'test'}
storyblok.post(url, {story}, {retries: 3, retryDelay: 1000})
  .then(res => {
    const newStoryId = res.story.id
    console.log('new story id:', newStoryId)
    console.log('new story name:', res.story.name)
    const updateContent = {name: 'new test', slug: 'test'}
    return storyblok.put(
      url + `/${newStoryId}`,
      {story: updateContent},
      {retries: 3, retryDelay: 1000}
    )
  })
  .then(res => console.log('updated story name:', res.story.name))
  .catch(e => console.log(e.config))
// => new story id: 123456
// => new story name: test
// => updated story name: new test
```
<a name="imageToBuffer"></a>

## imageToBuffer(filePath, compress, sizeLimit) ⇒ <code>Promise</code>
<p>Generate buffered image (image compression and resize is applied accordingly).</p>

**Kind**: global function  
**Fulfil**: <code>Buffer</code> Buffered image data.  
**Reject**: <code>Error</code> Error value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filePath | <code>string</code> |  | <p>Absolute path to image file.</p> |
| compress | <code>boolean</code> | <code>false</code> | <p>Flag to compress image.</p> |
| sizeLimit | <code>number</code> | <code>640</code> | <p>Resizing dimension limit value.</p> |

<a name="resizeImage"></a>

## resizeImage(image, sizeLimit) ⇒ <code>Promise</code>
<p>Resize a sharp object</p>

**Kind**: global function  
**Fulfil**: <code>Sharp</code> Resized sharp object.  
**Reject**: <code>Error</code> Error value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| image | <code>Sharp</code> |  | <p>sharp object.</p> |
| sizeLimit | <code>number</code> | <code>640</code> | <p>Size (in pixels) to limit image dimension.</p> |

<hr>

&copy; 2018 juniorCitizen
