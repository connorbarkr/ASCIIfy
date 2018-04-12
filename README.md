# ASCIIfy
An extension which transforms all images on a webpage into ASCII art.

## Build
ASCIIfy is a Chrome extension, which uses the background script to trigger a content script, modifying the page's DOM using jQuery and an algorithm I wrote to translate pixel data.

## About
It's sort of rough around the edges - making a proper image converter is only really feasible when the image is greatly scaled up, and the point of this extension is to keep everything the same. Therefore, simple images work best, and even then they'll look more like depth maps.

### Installation
1. Navigate to chrome://extensions
2. Enable developer mode in the upper-right hand corner
3. Select 'load unpacked'
4. Choose the directory your extension is located in
