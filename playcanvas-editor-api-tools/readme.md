# yaustar PlayCanvas Editor Tools

## Introduction
These scripts are made to make working with the Editor a bit easier and uses elements of the [PlayCanvas Editor API][editor-api-github] for extra functionality.

This process may be replaced when PlayCanvas adds support for Editor scripting directly in the Editor itself.

Assuming you are using Chrome:

1. Install Violent Monkey Chrome extension: https://violentmonkey.github.io/
2. Open the URLs to install the script:
    - https://yaustar.github.io/playcanvas-editor-api-tools/editor-utils.user.js
    - https://yaustar.github.io/playcanvas-editor-api-tools/launch-tab-utils.user.js
3. Done!

## Tools

### In Editor

#### Right click hierarchy menu

A context menu in the 3D viewport to make it easier to select entities in the viewport, especially if the render mesh is a child of the entity that has the physics collision and/or logic.

Right clicking on the viewport when one entity is selected will give a list of the selected entity parents. Clicking on any of these entries will select that entity.

![](images/right-click-hierarchy-menu.gif)

### Launch Tab

#### Animation asset data report
```
pcCmdTools.animationAssetReport(pc.Application.getApplication().assets.find('nameOfAsset.glb', 'animation'));
```

**Incomplete**: Does not support cubic curves
With the devtools open, a report of the animation timeline keyframes and transformation data can be printed out to console.

This will show the node hierarchy path, the type of transformation, keyframe time and data.

Example output:
![](images/animation-asset-report.png)

[editor-api-github]: https://github.com/playcanvas/editor-api