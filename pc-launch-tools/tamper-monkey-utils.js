// ==UserScript==
// @name         PlayCanvas Launch Tab Utils
// @namespace    http://stevenyau.co.uk/
// @version      0.1
// @description  PlayCanvas utils for the launch tab
// @author       @yaustar
// @match        https://launch.playcanvas.com/*
// @icon         https://www.google.com/s2/favicons?domain=playcanvas.com
// @grant        none
// ==/UserScript==

(function(){
    var animationAssetReport = function (asset) {
        var resource = asset.resource;
        // Get the path property, input curve, output curve, interpolation
        var data = [];
        var i = 0, j = 0;
        var entry, d;

        var interpolationConstToString = [
            'Step',
            'Linear',
            'Cubic'
        ];

        var formatOutput = function (data, keyIndex, componentLength, property) {
            var text = '';

            var entry = [];
            for (var j = 0; j < componentLength; j++) {
                entry.push(data[(keyIndex * componentLength) + j]);
            }

            if (property == 'localRotation') {
                // Convert to eulers
                var quat = new pc.Quat(entry[0], entry[1], entry[2], entry[3]);
                var euler = quat.getEulerAngles();
                entry[0] = euler.x;
                entry[1] = euler.y;
                entry[2] = euler.z;
                entry[3] = 0;
            }

            for (j = 0; j < entry.length; j++) {
                text += entry[j].toFixed(3) + (j < entry.length-1 ? ', ' : '');
            }

            return text;
        };

        for (i = 0; i < resource.curves.length; i++) {
            var curve = resource.curves[i];

            d = {
                path: "",
                property: "",
                interpolation: "",
                input: "",
                output: "",
            }

            var entityPath = curve.paths[0].entityPath;
            for (j = 0; j < entityPath.length; j++) {
                d.path += entityPath[j] + '/';
            }

            d.property = curve.paths[0].propertyPath;
            d._interpolation = curve.interpolation;
            d.interpolation = interpolationConstToString[d._interpolation];

            d.input = resource.inputs[curve.input];
            d.output = resource.outputs[curve.output];

            data.push(d);
        }

        for (i = 0; i < data.length; i++) {
            d = data[i];
            console.log(
                "Path: " + d.path
                + "\nProperty: " + d.property
                + "\nInterpolation: " + d.interpolation
            );


            var table = {};

            for (j = 0; j < d.input.data.length; j++) {
                table[d.input.data[j].toString()] = formatOutput(d.output.data, j, d.output.components, d.property);
            }

            console.table(table);

            console.log("\n\n");
        }
    };

    var pcTmTools = pcTmTools || {};
    pcTmTools.animationAssetReport = animationAssetReport;

    window.pcTmTools = pcTmTools;
})();
