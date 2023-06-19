function getWebGL2Canvas() {
    //  It's important to set the WebGL context values that Phaser needs:
    const contextCreationConfig = {
        alpha: false,
        depth: false,
        antialias: true,
        premultipliedAlpha: true,
        stencil: true,
        preserveDrawingBuffer: false,
        failIfMajorPerformanceCaveat: false,
        powerPreference: "default",
    };

    const gl2Canvas = document.createElement("canvas");
    let gl2Context;
    try {
        gl2Context = gl2Canvas.getContext("webgl2", contextCreationConfig);
    } catch (_err) {
        gl2Context = null;
    }

    if (!gl2Context) return null;

    return {
        canvas: gl2Canvas,
        context: gl2Context,
    };
}

class Example extends Phaser.Scene
{
    preload ()
    {
        this.load.image('raster', 'raster-bw-64.png');
    }

    create ()
    {
        const group = this.add.group();

        group.createMultiple({ key: 'raster', repeat: 8 });

        let ci = 0;
        const colors = [ 0xef658c, 0xff9a52, 0xffdf00, 0x31ef8c, 0x21dfff, 0x31aade, 0x5275de, 0x9c55ad, 0xbd208c ];

        const _this = this;

        group.children.iterate(child =>
        {

            child.x = 100;
            child.y = 300;
            child.depth = 9 - ci;

            child.tint = colors[ci];

            ci++;

            _this.tweens.add({
                targets: child,
                x: 700,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut',
                duration: 1500,
                delay: 100 * ci
            });

        });
    }
}

const wg2 = getWebGL2Canvas();

var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    canvas: wg2.canvas,
    context: wg2.context,
    scene: Example
};

let firstFrame = true;

var game = new Phaser.Game(config);

function preload() {
}

function create() {
}

function update() {
    if (firstFrame) {
        console.log(game.context.getExtension('GMAN_webgl_memory').getMemoryInfo().memory.total / 1024 / 1024);
        console.log(game.context.getExtension('GMAN_webgl_memory').getMemoryInfo());
        firstFrame = false;
    }
}

