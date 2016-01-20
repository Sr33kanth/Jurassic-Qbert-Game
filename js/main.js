var ctx;
var gl;
var lights = [];
var len = 600,
    width = 580;

var RUNNING = 0;
var GAMEOVER = 1;
var WIN = 2;
var JUMP = 3;


var gamestatus = RUNNING;
var gamecounter = 0;
var lives = 3;
var renderboard = 1;
var score = 0;


var modelViewMatrix = mat4.create();
var projectionMatrix = mat4.create();
var transformMatrix = mat3.create();
var objTextures = [];
var sampleArr = [];
var texfiles = [];
var ltArray = [0.0, 5.0, 8.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
var positionbuffers = [];
var texturebuffers = [];
var normalbuffers = [];


var charobjs = [];
var charmtls = [];
var charscales = [];
var charrotate = [];
var chartranslate = [];
var translate = [];

var gameboard = [];
var currentposition = [];
var cubecolorArray = [];
var blockstranslation = [];
level1 = [];
level2 = [];
scorevertices = [];
scoreuvs = [];
enemy1path = [];
enemy3path = [];
currentlevel = 1;

var jump = new Audio('assets/jump.wav');
var applause = new Audio('assets/applause.wav');
var gameover = new Audio('assets/game_over.mp3');
var smash = new Audio('assets/smash.wav');


function drawImage() {
    $(function() {
        $.get("assets/Raptor.obj", readObj)
    });
}

readObj = function(data) {
    objContent = data;
    theobj = {};
    theobj = parseObj(objContent);
    if (!theobj.mtllib) {
        alert("No material file.");
    }
    qbertobj = theobj;
    charobjs.push(qbertobj);
    $(function() {
        $.get("assets/Raptor.mtl", readMtl)
    });
}

readMtl = function(data) {
    mtlContent = data;
    mtlobj = {};
    mtlobj = parseMtl(mtlContent);
    if (!theobj || !mtlobj) {
        alert("Invalid Input");
        return;
    }
    mtmatlen = mtlobj.length;
    for (j = 0; j < mtmatlen; j++) {
        groups = [];
        var oglen = theobj.groups.length;
        for (i = 0; i < oglen; i++) {
            if (mtlobj[j].mname == theobj.groups[i].mtlname) {
                groups.push(i);
            }
        }
        mtlobj[j].groups = groups;
    }
    qbertmtl = mtlobj;
    charmtls.push(qbertmtl);
    $(function() {
        $.get("assets/vase.obj", readEnemy1Obj)
    });
}

readEnemy1Obj = function(data) {
    objContent = data;
    theobj = {};
    theobj = parseObj(objContent);
    if (!theobj.mtllib) {
        alert("No material file.");
    }
    enemy1obj = theobj;
    charobjs.push(enemy1obj);
    $(function() {
        $.get("assets/vase.mtl", readenemy1Mtl)
    });
}

readenemy1Mtl = function(data) {
    mtlContent = data;
    mtlobj = {};
    mtlobj = parseMtl(mtlContent);
    if (!theobj || !mtlobj) {
        alert("Invalid Input");
        return;
    }
    mtmatlen = mtlobj.length;
    for (j = 0; j < mtmatlen; j++) {
        groups = [];
        var oglen = theobj.groups.length;
        for (i = 0; i < oglen; i++) {
            if (mtlobj[j].mname == theobj.groups[i].mtlname) {
                groups.push(i);
            }
        }
        mtlobj[j].groups = groups;
    }
    enemy1mtl = mtlobj;
    charmtls.push(enemy1mtl);
    $(function() {
        $.get("assets/vase2.obj", readEnemy2Obj)
    });
}

readEnemy2Obj = function(data) {
    objContent = data;
    theobj = {};
    theobj = parseObj(objContent);
    if (!theobj.mtllib) {
        alert("No material file.");
    }
    charobjs.push(theobj);
    $(function() {
        $.get("assets/vase2.mtl", readenemy2Mtl)
    });
}

readenemy2Mtl = function(data) {
    mtlContent = data;
    mtlobj = {};
    mtlobj = parseMtl(mtlContent);
    if (!theobj || !mtlobj) {
        alert("Invalid Input");
        return;
    }
    mtmatlen = mtlobj.length;
    for (j = 0; j < mtmatlen; j++) {
        groups = [];
        var oglen = theobj.groups.length;
        for (i = 0; i < oglen; i++) {
            if (mtlobj[j].mname == theobj.groups[i].mtlname) {
                groups.push(i);
            }
        }
        mtlobj[j].groups = groups;
    }
    charmtls.push(mtlobj);
    $(function() {
        $.get("assets/vase3.obj", readEnemy3Obj)
    });
}


readEnemy3Obj = function(data) {
    objContent = data;
    theobj = {};
    theobj = parseObj(objContent);
    if (!theobj.mtllib) {
        alert("No material file.");
    }
    charobjs.push(theobj);
    $(function() {
        $.get("assets/vase3.mtl", readenemy3Mtl)
    });
}

readenemy3Mtl = function(data) {
    mtlContent = data;
    mtlobj = {};
    mtlobj = parseMtl(mtlContent);
    if (!theobj || !mtlobj) {
        alert("Invalid Input");
        return;
    }
    mtmatlen = mtlobj.length;
    for (j = 0; j < mtmatlen; j++) {
        groups = [];
        var oglen = theobj.groups.length;
        for (i = 0; i < oglen; i++) {
            if (mtlobj[j].mname == theobj.groups[i].mtlname) {
                groups.push(i);
            }
        }
        mtlobj[j].groups = groups;
    }
    charmtls.push(mtlobj);
    $(function() {
        $.get("assets/disc.obj", readDiscObj)
    });
}

readDiscObj = function(data) {
    objContent = data;
    theobj = {};
    theobj = parseObj(objContent);
    if (!theobj.mtllib) {
        alert("No material file.");
    }
    charobjs.push(theobj);
    charobjs.push(theobj);
    $(function() {
        $.get("assets/disc.mtl", readDiscMtl)
    });
}

readDiscMtl = function(data) {
    mtlContent = data;
    mtlobj = {};
    mtlobj = parseMtl(mtlContent);
    if (!theobj || !mtlobj) {
        alert("Invalid Input");
        return;
    }
    mtmatlen = mtlobj.length;
    for (j = 0; j < mtmatlen; j++) {
        groups = [];
        var oglen = theobj.groups.length;
        for (i = 0; i < oglen; i++) {
            if (mtlobj[j].mname == theobj.groups[i].mtlname) {
                groups.push(i);
            }
        }
        mtlobj[j].groups = groups;
    }
    charmtls.push(mtlobj);
    charmtls.push(mtlobj);
    $(function() {
        $.get("assets/vase4.obj", readEnemy4Obj)
    });
}

readEnemy4Obj = function(data) {
    objContent = data;
    theobj = {};
    theobj = parseObj(objContent);
    if (!theobj.mtllib) {
        alert("No material file.");
    }
    charobjs.push(theobj);
    $(function() {
        $.get("assets/vase4.mtl", readenemy4Mtl)
    });
}

readenemy4Mtl = function(data) {
    mtlContent = data;
    mtlobj = {};
    mtlobj = parseMtl(mtlContent);
    if (!theobj || !mtlobj) {
        alert("Invalid Input");
        return;
    }
    mtmatlen = mtlobj.length;
    for (j = 0; j < mtmatlen; j++) {
        groups = [];
        var oglen = theobj.groups.length;
        for (i = 0; i < oglen; i++) {
            if (mtlobj[j].mname == theobj.groups[i].mtlname) {
                groups.push(i);
            }
        }
        mtlobj[j].groups = groups;
    }
    charmtls.push(mtlobj);
    webGLStart();
}
/*
Starting point of WebGL part. Rendering the object
*/
function webGLStart() {
    initGL(canvas);
    // TODO: change counter
    for (j = 0; j < charobjs.length; j++) {
        texfiles = texfiles.concat(charmtls[j].textureFiles)
    }

    initialCharacterTransforms();

    //  sc = 1 / (Math.min(qbertobj.minX , qbertobj.minY,qbertobj.minZ)); // Default scaling
    //loadTextureImage("assets/font.bmp", "");
    texfiles.push("font.bmp");
    loadTextureImages(texfiles, handleLoadedTexture);
}

function initialCharacterTransforms() {
    // TODO:  change for specific obj

    charrotate = [];
    chartranslate = [];
    jumpflag = [];
    jumpcount = [];
    collected = 0;
    jumpcounter = 0;
    oldpos = [0, 0, 0, 0, 0, 0, 0];
    startx = [0, 0, 0, 0, 0, 0, 0];
    starty = [0, 0, 0, 0, 0, 0, 0];
    startz = [0, 0, 0, 0, 0, 0, 0];
    endx = [0, 0, 0, 0, 0, 0, 0];
    endy = [0, 0, 0, 0, 0, 0, 0];
    endz = [0, 0, 0, 0, 0, 0, 0];
    bezierx = [0, 0, 0, 0, 0, 0, 0];
    beziery = [0, 0, 0, 0, 0, 0, 0];
    bezierz = [0, 0, 0, 0, 0, 0, 0];
    trax = [0, 0, 0, 0, 0, 0, 0];
    tray = [0, 0, 0, 0, 0, 0, 0];
    traz = [0, 0, 0, 0, 0, 0, 0];
    def = [1, 1, 1, 1, 1, 1, 1];
    enemy1flag = 0;
    enemy2flag = 0;
    enemy3flag = 0;
    enemy4flag = 0;
    gameovertransition = 0;
    score = 0;
    step = 0.04;
    gamestarted =0;
    hitposition =-1;

    for (j = 0; j < charobjs.length; j++) {
        charscales[j] = 1 / (Math.max(charobjs[j].maxX - charobjs[j].minX, charobjs[j].maxY - charobjs[j].minY)); // Default scaling
    }

    charscales[0] *= 0.5; // for raptor
    charrotate.push([40, 30, 0]);
    chartranslate[0] = [-0.03, 0.05, 0];
    currentposition[0] = 0;
    jumpflag[0] = 0;
    for (i = 1; i < 7; i++) {
        currentposition[i] = 0;
        render[i] = 0;
        chartranslate.push([0, 0.05, 0]);
        charscales[i] *= 0.2;
        charrotate.push([0, 30, 0]);
        jumpflag[i] = 0;
    }
    jumpcount = [0, 0, 0, 0, 0, 0, 0];

    chartranslate[4] = [-0.06, -0.078, 0.3];
    chartranslate[5] = [0.06, -0.078, 0.3];
    charrotate[4] = [0, 30, 00];
    charrotate[5] = [0, 30, 00];
    currentposition[4] = 28;
    currentposition[5] = 29;

    render[0] = 1;
    render[4] = 1;
    render[5] = 1;

    for (j = 0; j < 28; j++) {
        gameboard[j] = 0;
    }
    neighbours = [
        [-1, 2, -1, 3], //1
        [1, 4, -1, 5], //2
        [-1, 5, 1, 6], //3
        [2, 7, -1, 8], //4
        [3, 8, 2, 9], //5
        [-1, 9, 3, 10], //6
        [4, 11, -1, 12], //7
        [5, 12, 4, 13], //8
        [6, 13, 5, 14], //9
        [-1, 14, 6, 15], //10
        [7, 16, 30, 17], //11
        [8, 17, 7, 18], //12
        [9, 18, 8, 19], //13
        [10, 19, 9, 20], //14
        [29, 20, 10, 21], //15
        [11, 22, -1, 23], //16
        [12, 23, 11, 24], //17
        [13, 24, 12, 25], //18
        [14, 25, 13, 26], //19
        [15, 26, 14, 27], //20
        [-1, 27, 15, 28], // 21
        [16, -1, -1, -1], //22
        [17, -1, 16, -1], //23
        [18, -1, 17, -1], //24
        [19, -1, 18, -1], //25
        [20, -1, 19, -1], //26
        [21, -1, 20, -1], //27
        [-1, -1, 21, -1] //28
    ];
    e1path = [0, 1, 4, 8, 12, 17, 24];
    e3path = [0, 2, 5, 9, 14, 20, 27, 26, 25, 24, 23, 22, 21, 15, 10, 6, 3, 1];
    enemy1path = e1path;
    enemy3path = e3path;
    // for(i=0;i<e1path.length;i++)
    // {
    //   for(j=0;j<60;j++)
    //   {
    //     enemy1path.push(e1path[i]);
    //   }
    // }
    // for(i=0;i<e3path.length;i++)
    // {
    //   for(j=0;j<60;j++)
    //   {
    //     enemy3path.push(e3path[i]);
    //   }
    // }
    enemy1path.push(-1);
    enemy3path.push(-1);
}


// Initialise gl variable
function initGL(canvas) {
    try {
        var canvas = document.getElementById("canvas");
        gl = canvas.getContext("experimental-webgl");
        canvas.height = len;
        canvas.width = width;
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
        var c = document.getElementById("myCanvas");
        ctx = c.getContext("2d");
        ctx.font = "30px Verdana";
    } catch (e) {}
    if (!gl) {
        alert("Cannot initialise canvas");
    }
}


/*
Load all the texture files.
*/
function loadTextureImages(textureUrls, callback) {
    var textures = [];
    var noOfTex = textureUrls.length;
    var onTexLoad = function() {
        noOfTex--;
        if (noOfTex == 0) {
            callback();
        }
    };
    for (var t = 0; t < noOfTex; t++) {
        var tex = loadTextureImage("assets/" + textureUrls[t], onTexLoad);
        objTextures.push(tex);
    }
}


var textures = [];

/*
Loads a single texture file.
*/
function loadTextureImage(textureUrl, callback) {
    var texImg = new Image();
    texImg.src = textureUrl;
    texImg.onload = callback;
    return texImg;
}


/*
Loaded textures are bind to gl
*/
function handleLoadedTexture() {

    for (var tt = 0; tt < objTextures.length; tt++) {
        var texture = gl.createTexture();
        texture.image = objTextures[tt];
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.bindTexture(gl.TEXTURE_2D, null);
        textures.push(texture);
        //    samplerArr.push(tt);
    }

    initShaders()
    initBuffers();
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    tick();
}

/*
Initialise shaders
*/
function initShaders() {
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "vertexCoords");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "textureCoords");
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

    shaderProgram.vertexNormalsAttribute = gl.getAttribLocation(shaderProgram, "vertexNormals");
    gl.enableVertexAttribArray(shaderProgram.vertexNormalsAttribute);

    shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "vertexColors");
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

    shaderProgram.scorevertexPositionAttribute = gl.getAttribLocation(shaderProgram, "scoreCoords");
    gl.enableVertexAttribArray(shaderProgram.scorevertexPositionAttribute);

    shaderProgram.scoretextureCoordAttribute = gl.getAttribLocation(shaderProgram, "scoreTexCoords");
    gl.enableVertexAttribArray(shaderProgram.scoretextureCoordAttribute);

    shaderProgram.kdUniform = gl.getUniformLocation(shaderProgram, "kd");
    shaderProgram.ksUniform = gl.getUniformLocation(shaderProgram, "ks");
    shaderProgram.kaUniform = gl.getUniformLocation(shaderProgram, "ka");
    shaderProgram.nUniform = gl.getUniformLocation(shaderProgram, "n");
    shaderProgram.bbUniform = gl.getUniformLocation(shaderProgram, "bb");
    shaderProgram.projectionMatrixUniform = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    shaderProgram.modelViewMatrixUniform = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    shaderProgram.transformMatrixUniform = gl.getUniformLocation(shaderProgram, "transformMatrix");
    shaderProgram.ltUniform = gl.getUniformLocation(shaderProgram, "lt[0]");
    //    shaderProgram.samplersUniform = gl.getUniformLocation(shaderProgram, "samplers[0]");

    shaderProgram.samplerUniform0 = gl.getUniformLocation(shaderProgram, "sampler0");
}

var shaderProgram;
/*
Get shader from HTML and compile
*/
function getShader(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}



var theObjVertexPositionBuffers = [];
var theObjVertexTextureCoordBuffers = [];
var theObjVertexNormalBuffers = [];
var cubeVertexIndexBuffer;

/*
Initialize all the buffers to shaders
*/
function initBuffers() {

    var material
    var vertices = [];
    var textureCoords = [];
    var normals = [];
    var tfaces = 0;
    var v0, v1, v2, t0, t1, t2, norm0, norm1, norm2, tfaces = 0;
    var tkd, tks, tka, tn, tind;

    for (k = 0; k < charobjs.length; k++) {
        theobj = charobjs[k];
        var glen = theobj.groups.length;
        //  var mlen = mtlobj.length;
        for (var g = 0; g < glen; g++) {
            vertices = [];
            normals = [];
            textureCoords = [];
            var flen = theobj.groups[g].faces.length;
            for (var f = 0; f < flen; f++) {
                v0 = theobj.groups[g].faces[f][0][0];
                v1 = theobj.groups[g].faces[f][1][0];
                v2 = theobj.groups[g].faces[f][2][0];

                t0 = theobj.groups[g].faces[f][0][1];
                t1 = theobj.groups[g].faces[f][1][1];
                t2 = theobj.groups[g].faces[f][2][1];

                norm0 = theobj.groups[g].faces[f][0][2];
                norm1 = theobj.groups[g].faces[f][1][2];
                norm2 = theobj.groups[g].faces[f][2][2];

                ver1 = [theobj.vertices[v0 - 1][0], theobj.vertices[v0 - 1][1], theobj.vertices[v0 - 1][2]];
                ver2 = [theobj.vertices[v1 - 1][0], theobj.vertices[v1 - 1][1], theobj.vertices[v1 - 1][2]];
                ver3 = [theobj.vertices[v2 - 1][0], theobj.vertices[v2 - 1][1], theobj.vertices[v2 - 1][2]];

                vt1 = [theobj.textures[t0 - 1][0], theobj.textures[t0 - 1][1]];
                vt2 = [theobj.textures[t1 - 1][0], theobj.textures[t1 - 1][1]];
                vt3 = [theobj.textures[t2 - 1][0], theobj.textures[t2 - 1][1]];

                vn1 = [theobj.normals[norm0 - 1][0], theobj.normals[norm0 - 1][1], theobj.normals[norm0 - 1][2]];
                vn2 = [theobj.normals[norm1 - 1][0], theobj.normals[norm1 - 1][1], theobj.normals[norm1 - 1][2]];
                vn3 = [theobj.normals[norm2 - 1][0], theobj.normals[norm2 - 1][1], theobj.normals[norm2 - 1][2]];

                vertices = vertices.concat(ver1, ver2, ver3);
                textureCoords = textureCoords.concat(vt1, vt2, vt3);
                normals = normals.concat(vn1, vn2, vn3);
                tfaces++;
            }
            var tno = tfaces * 3;

            theObjVertexPositionBuffers.push(vertices);
            theObjVertexNormalBuffers.push(normals);
            theObjVertexTextureCoordBuffers.push(textureCoords);

        }
        positionbuffers.push(theObjVertexPositionBuffers);
        texturebuffers.push(theObjVertexTextureCoordBuffers);
        normalbuffers.push(theObjVertexNormalBuffers);
    }

    bbverticeslist = [];
    for (b = 0; b < 1; b++) {
        // TODO: change index
        theobj = mtlobj;
        bbvertices = [
            // Front face
            theobj.minX, theobj.minY, theobj.maxZ,
            theobj.maxX, theobj.minY, theobj.maxZ,
            theobj.maxX, theobj.maxY, theobj.maxZ,
            theobj.minX, theobj.maxY, theobj.maxZ,

            // Back face
            theobj.minX, theobj.minY, theobj.minZ,
            theobj.minX, theobj.maxY, theobj.minZ,
            theobj.maxX, theobj.maxY, theobj.minZ,
            theobj.maxX, theobj.minY, theobj.minZ,

            // Top face
            theobj.minX, theobj.maxY, theobj.minZ,
            theobj.minX, theobj.maxY, theobj.maxZ,
            theobj.maxX, theobj.maxY, theobj.maxZ,
            theobj.maxX, theobj.maxY, theobj.minZ,

            // Bottom face
            theobj.minX, theobj.minY, theobj.minZ,
            theobj.maxX, theobj.minY, theobj.minZ,
            theobj.maxX, theobj.minY, theobj.maxZ,
            theobj.minX, theobj.minY, theobj.maxZ,

            // Right face
            theobj.maxX, theobj.minY, theobj.minZ,
            theobj.maxX, theobj.maxY, theobj.minZ,
            theobj.maxX, theobj.maxY, theobj.maxZ,
            theobj.maxX, theobj.minY, theobj.maxZ,

            // Left face
            theobj.minX, theobj.minY, theobj.minZ,
            theobj.minX, theobj.minY, theobj.maxZ,
            theobj.minX, theobj.maxY, theobj.maxZ,
            theobj.minX, theobj.maxY, theobj.minZ,
        ];
        bbverticeslist.push(bbvertices);
    }

    cubevertices = [
        // Front face
        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
        1.0, 1.0, 1.0, -1.0, 1.0, 1.0,

        // Back face
        -1.0, -1.0, -1.0, -1.0, 1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, -1.0, -1.0,

        // Top face
        -1.0, 1.0, -1.0, -1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0, -1.0,

        // Bottom face
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, -1.0, 1.0, -1.0, -1.0, -1.0,
        1.0, -1.0, 1.0, -1.0, -1.0, 1.0,

        // Right face
        1.0, -1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, 1.0, 1.0,
        1.0, -1.0, -1.0,
        1.0, 1.0, 1.0,
        1.0, -1.0, 1.0,

        // Left face
        -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
    ];


    yellow = [
        0.8, 0.8, 0.1,
        0.8, 0.8, 0.1,
        0.8, 0.8, 0.1,
        0.8, 0.8, 0.1,
        0.8, 0.8, 0.1,
        0.8, 0.8, 0.1,
    ];

    green = [
        0.6, 0.6, 0.2,
        0.6, 0.6, 0.2,
        0.6, 0.6, 0.2,
        0.6, 0.6, 0.2,
        0.6, 0.6, 0.2,
        0.6, 0.6, 0.2,
    ];

    blue = [
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
    ];

    greyblue = [
        0.3, 0.5, 0.7,
        0.3, 0.5, 0.7,
        0.3, 0.5, 0.7,
        0.3, 0.5, 0.7,
        0.3, 0.5, 0.7,
        0.3, 0.5, 0.7,
    ];

    lightblue = [
        0.0, 1.0, 1.0,
        0.0, 1.0, 1.0,
        0.0, 1.0, 1.0,
        0.0, 1.0, 1.0,
        0.0, 1.0, 1.0,
        0.0, 1.0, 1.0,
    ];

    grey = [
        0.3, 0.3, 0.3,
        0.3, 0.3, 0.3,
        0.3, 0.3, 0.3,
        0.3, 0.3, 0.3,
        0.3, 0.3, 0.3,
        0.3, 0.3, 0.3,
    ];
    level1 = (((((level1.concat(yellow)).concat(green)).concat(blue)).concat(grey)).concat(lightblue)).concat(greyblue);
    level2 = (((((level2.concat(green)).concat(green)).concat(blue)).concat(blue)).concat(lightblue)).concat(grey);
    selectedcube = [
        // Front face
        // Bottom face
        0.3, 1.0, 1.0,
        0.3, 1.0, 1.0,
        0.3, 1.0, 1.0,
        0.3, 1.0, 1.0,
        0.3, 1.0, 1.0,
        0.3, 1.0, 1.0,
    ];
    selectedcube = selectedcube.concat(level1.slice(18));

    resetcolors(level1);

    //translations for the blocks
    for (v = 1; v < 8; v++) {
        count = v - 1;
        for (c = 0; c < v; c++) {
            trxyz = [-count * 1.4 * .06, (-v + 3) * 0.06 * 1.9, v * 0.06];
            count -= 2;
            blockstranslation.push(trxyz);
        }
    }
    blockstranslation.push([0.48, -0.1, 0]);
    blockstranslation.push([-0.48, -0.1, 0]);
    //  blockstranslation.push([0,0,0]);
    //  chartranslate[5] = [0,-0.58,0];


    boardleveltranslate = [
        [0, 0],
        [0.01, 0.01],
        [0.01, 0.01],
        [0.02, 0.02],
        [0.02, 0.02],
        [0.02, 0.02],
        [0.03, 0.03],
        [0.03, 0.03],
        [0.03, 0.03],
        [0.03, 0.03],
        [0.04, 0.04],
        [0.04, 0.04],
        [0.04, 0.04],
        [0.04, 0.04],
        [0.04, 0.04],
        [0.05, 0.05],
        [0.05, 0.05],
        [0.05, 0.05],
        [0.05, 0.05],
        [0.05, 0.05],
        [0.05, 0.05],
        [0.06, 0.06],
        [0.06, 0.06],
        [0.06, 0.06],
        [0.06, 0.06],
        [0.06, 0.06],
        [0.06, 0.06],
        [0.06, 0.06],
        [0.0, 0.0],
        [0.0, 0.0]
    ];
}

function resetcolors(level) {
    cubecolorArray = [];
    for (w = 0; w < 28; w++) {
        cubecolorArray.push(level);
        gameboard[w] = 0;
    }
}


jumpcount = 0;
/*
Method handles the key input and does appropriate transformations.
*/
function animate() {
    document.onkeydown = function(e) {
        switch (e.keyCode) {
            case 66:
                console.log("Cheater !!! ");
                gamestatus = WIN;
                applause.play();
                resetcolors(level2);
                currentposition[0] = 0;
                lives = 3;
                collected = 0;
                currentlevel = 2;
                break;
            case 81: //left
                charrotate[0][2] -= 5;
                break;
            case 69: //left
                charrotate[0][2] += 5;
                break;
            case 87: //left
                charrotate[0][1] += 5;
                break;
            case 83: //left
                charrotate[0][1] -= 5;
                break;
            case 65: //left
                charrotate[0][0] -= 5;
                break;
            case 68: //left
                charrotate[0][0] += 5;
                break;
            case 37: //left
                jump.play();
                charrotate[0] = [-5,10,-10];
                newposition = neighbours[currentposition[0]][2] - 1;
                break;

            case 38: //up
                jump.play();
                charrotate[0] = [-145,-30,-45];
                newposition = neighbours[currentposition[0]][0] - 1;
                break;

            case 39: //right
                jump.play();
                charrotate[0] = [130,-20,0];
                newposition = neighbours[currentposition[0]][3] - 1;
                break;

            case 40: //down
                jump.play();
                charrotate[0] = [40,30,0];
                newposition = neighbours[currentposition[0]][1] - 1;
                break;
        }
        if ([37, 38, 39, 40].indexOf(e.keyCode) == -1) {
            return;
        }
        hitposition = -1;
        gamestarted = 1;
        if (newposition < 0) {
            currentposition[0] = 0;
            charrotate[0] = [40,30,0];
            lives--;
            if (lives == 0) {
                gameover.play();
                level =1;
                collected =0;
                charrotate[0] = [25,180,0];
                gamestatus = GAMEOVER;
            }
            return;
        }
        if (gameboard[newposition] != 1) {
            jumpflag[0] = 1;
            def[0] = 0.8;
            oldpos[0] = currentposition[0];
            currentposition[0] = newposition;


        } else {
            // charrotate[0][2]-=30;
            // charrotate[0][1]+=30
            jumpflag[0] = 1;
            def[0] = 0.8;
            oldpos[0] = currentposition[0];
            currentposition[0] = newposition;
        }
    };
}

/*
Method repeatedly draws the scene.
*/
function tick() {
    requestAnimFrame(tick); // Method from webgl-utils file. Code from http://learningwebgl.com/ tutorials
    render();
    animate();
    var c = document.getElementById("canvas2d");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, 600, 770);
    ctx.font = "22px Verdana";
    var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
    gradient.addColorStop("0", "red");
    gradient.addColorStop("0.5", "white");
    gradient.addColorStop("1.0", "blue");
    // Fill with gradient
    ctx.fillStyle = gradient;
    var img = document.getElementById("lives");
    var img2 = document.getElementById("gameover");

    if(gamestatus == GAMEOVER)
    {
      ctx.drawImage(img2, 140 , 10, 300, 100);
    }
    else if(gamestatus == WIN){
      ctx.fillText("LEVEL 2 !!! ", 200, 100);
    }
    else{
      ctx.fillText("Score: " + score, 10, 25);
      ctx.fillText("Level: " + currentlevel, 10, 60);
      for (liv = 0; liv < lives; liv++) {
          ctx.drawImage(img, 10 + (50 * liv), 70, 50, 50);
      }
    }

    img.style.visibility = "hidden";
    img2.style.visibility = "hidden";
}

// TODO:  Remove this. Temporary
function getJumpOffset(block) {
        if (block == 0)
            return 0.1;
        if (block > 0 && block < 3)
            return 0.6;
        if (block >= 3 && block < 6)
            return 3;
        if (block >= 6 && block < 10)
            return 15;
        if (block >= 10 && block < 15)
            return 22;
        if (block >= 15 && block < 21)
            return 35;
        if (block >= 21 && block < 30)
            return 57;
}

function rotatedisc()
{
  rotatearray = theObjVertexTextureCoordBuffers[7];
  temp = rotatearray.slice(2000);
  temp =temp.concat(rotatearray.slice(0,2000));
  theObjVertexTextureCoordBuffers[7] = temp;
  theObjVertexTextureCoordBuffers[8] = temp;
}

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

var elapsedTime = 0;
var frameCount = 0;
var lastTime = 0;
/*
Method binds the buffers and performs the transformations on the model view matrix.
*/
function render() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gamecounter = (gamecounter + 1) % 1000;
    if (gamestatus == GAMEOVER) {
        charrotate[0] = [25,180,0];
        gameovertransition++;
        renderboard = 0;
        step = 0.008;
        jumpflag[0] = jumpflag[1] = jumpflag[2] = jumpflag[3] = jumpflag[6] =1;
        render[0] = render[1] = render[2] = render[3] = render[6] = 1 ;
        render[4] = render[5] =0;
        oldpos[0] = 12; currentposition [0] = 12;
        oldpos[1] = 3; currentposition [1] = 3;
        oldpos[2] = 4; currentposition [2] = 4;
        oldpos[3] = 5; currentposition [3] = 5;
        oldpos[6] = 6; currentposition [6] = 6;
        if (gameovertransition == 200) {
            gamestatus = RUNNING;
            gameovertransition = 0;
            renderboard = 1;
            initialCharacterTransforms();
            gamecounter = 0;
            lives = 3;
            currentlevel =1;
            resetcolors(level1);
        }
    }
    if (gamestatus == WIN) {
        if(gameovertransition ==0)
        {
          ep3=0;
        }
        gameovertransition++;
        renderboard = 0;
        step = 0.03;
        if(jumpflag[0]==0){
            jumpflag[0] = jumpflag[1] = jumpflag[2] = jumpflag[3] = jumpflag[6] =1;
            render[0] = render[1] = render[2] = render[3] = render[6] = 1 ;
            render[4] = render[5] =0;
            oldpos[0] = e3path[(ep3+9)%18]; currentposition [0] = e3path[(ep3+10)%18];
            oldpos[1] = e3path[(ep3+3)%18]; currentposition [1] = e3path[(ep3+4)%18];
            oldpos[2] = e3path[(ep3+5)%18]; currentposition [2] = e3path[(ep3+6)%18];
            oldpos[3] = e3path[(ep3+7)%18]; currentposition [3] = e3path[(ep3+8)%18];
            oldpos[6] = e3path[(ep3+1)%18]; currentposition [6] = e3path[(ep3+2)%18];
            ep3=(ep3+7)%18;
          }
        if (gameovertransition == 300) {
            gamestatus = RUNNING;
            gameovertransition = 0;
            renderboard = 1;
            initialCharacterTransforms();
            gamecounter = 0;
            lives = 3;
            level=2;
            resetcolors(level2);
        }
    }
    if (gamecounter == 200 && enemy1flag == 0 && gamestatus == RUNNING) {
        render[1] = 1;
        currentposition[1] = 0;
        enemy1flag = 1;
        ep = 0;
        slowe1 = 0
    }
    if (gamecounter == 400 && enemy2flag == 0 && gamestatus == RUNNING) {
        render[2] = 1;
        currentposition[2] = 0;
        enemy2flag = 1;
        slowe2 = 0
    }
    if (gamecounter == 600 && enemy3flag == 0 && gamestatus == RUNNING) {
        render[3] = 1;
        currentposition[3] = 0;
        enemy3flag = 1;
        ep3 = 0;
        slowe3 = 0
    }
    if (gamecounter == 800 && enemy4flag == 0 && currentlevel ==2 && gamestatus == RUNNING) {
        render[6] = 1;
        currentposition[6] = 0;
        enemy4flag = 1;
        ep4 = 0;
        slowe4 = 0
    }


    mat4.perspective(projectionMatrix, 45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);
    bufferindex = 0;

    // jump translation
    // jumpcode
    for (k = 0; k < charobjs.length; k++) {
        if (render[k] == 0) continue;
        if (jumpflag[k] == 1) {
            if (jumpcount[k] == 0) {
                startx[k] = blockstranslation[oldpos[k]][0] + chartranslate[k][0];
                endx[k] = blockstranslation[currentposition[k]][0] + chartranslate[k][0];
                starty[k] = blockstranslation[oldpos[k]][1] + chartranslate[k][1] + boardleveltranslate[oldpos[k]][0];
                endy[k] = blockstranslation[currentposition[k]][1] + chartranslate[k][1] + boardleveltranslate[currentposition[k]][0];
                startz[k] = blockstranslation[oldpos[k]][2] + chartranslate[k][2] + boardleveltranslate[oldpos[k]][0];
                endz[k] = blockstranslation[currentposition[k]][2] + chartranslate[k][2] + boardleveltranslate[currentposition[k]][0];
                // bezierx = (startx + endx)/2;
                // beziery = (starty+endy)/2;
                if (oldpos[k] < currentposition[k]) {
                    bezierx[k] = (startx[k] + endx[k]) / 2;
                    beziery[k] = ((Math.abs(starty[k]) + Math.abs(endy[k])) / 2) + (40-getJumpOffset(currentposition[k]))*0.01;
                    bezierz[k] = (startz[k] + endz[k]) / 2;
                } else {
                    bezierx[k] = (startx[k] + endx[k]) / 2;
                    beziery[k] = ((Math.abs(starty[k]) + Math.abs(endy[k])) / 2) + (40-getJumpOffset(currentposition[k]))*0.01;
                    bezierz[k] = (startz[k] + endz[k]) / 2;
                }
            }
            trax[k] = (1 - jumpcount[k]) * (1 - jumpcount[k]) * startx[k] + 2 * (1 - jumpcount[k]) * jumpcount[k] * bezierx[k] + jumpcount[k] * jumpcount[k] * endx[k];
            tray[k] = (1 - jumpcount[k]) * (1 - jumpcount[k]) * starty[k] + 2 * (1 - jumpcount[k]) * jumpcount[k] * beziery[k] + jumpcount[k] * jumpcount[k] * endy[k];
            traz[k] = (1 - jumpcount[k]) * (1 - jumpcount[k]) * startz[k] + 2 * (1 - jumpcount[k]) * jumpcount[k] * bezierz[k] + jumpcount[k] * jumpcount[k] * endz[k];

            translate[k] = [trax[k], tray[k], traz[k]];
            jumpcount[k] += step;
            if (jumpcount[k] >= 1) {
                def[k] = 1;
                if(k==0 && gameboard[currentposition[k]] == 0 && gamestatus == RUNNING){
                  gameboard[currentposition[k]] = 1;
                  cubecolorArray[currentposition[k]] = selectedcube;
                  collected++;
                  score += 5;
                  if (collected == 28 || score == 140) {
                      gamestatus = WIN;
                      applause.play();
                      resetcolors(level2);
                      currentposition[0] = 0;
                      lives = 3;
                      currentlevel =2;
                  }
                }
                jumpcount[k] = 0;
                jumpflag[k] = 0;
            }
        } else {
            translate[k] = [blockstranslation[currentposition[k]][0] + chartranslate[k][0], blockstranslation[currentposition[k]][1] + chartranslate[k][1] + boardleveltranslate[currentposition[k]][0], blockstranslation[currentposition[k]][2] + chartranslate[k][2] + boardleveltranslate[currentposition[k]][0]];
        }
    }

    for (k = 0; k < charobjs.length; k++) {

        if (render[k] == 0) {
            bufferindex += charobjs[k].groups.length;
            continue;
        }

        mat4.identity(modelViewMatrix);
        mat4.lookAt(modelViewMatrix, [0, 0, 2], [0, 0, 0], [0, 1, 0]);
        mat4.translate(modelViewMatrix, modelViewMatrix, translate[k]);
        mat4.scale(modelViewMatrix, modelViewMatrix, [charscales[k], charscales[k]*def[k], charscales[k]]);
        mat4.rotate(modelViewMatrix, modelViewMatrix, degToRad(charrotate[k][0]), [0, 1, 0]);
        mat4.rotate(modelViewMatrix, modelViewMatrix, degToRad(charrotate[k][1]), [1, 0, 0]);
        mat4.rotate(modelViewMatrix, modelViewMatrix, degToRad(charrotate[k][2]), [0, 0, 1]);
        mat3.normalFromMat4(transformMatrix, modelViewMatrix);

        gl.uniformMatrix4fv(shaderProgram.projectionMatrixUniform, false, projectionMatrix);
        gl.uniformMatrix4fv(shaderProgram.modelViewMatrixUniform, false, modelViewMatrix);
        gl.uniformMatrix3fv(shaderProgram.transformMatrixUniform, false, transformMatrix);
        gl.uniform1fv(shaderProgram.ltUniform, ltArray);
        gl.uniform1f(shaderProgram.bbUniform, 0.0);



        theobj = charobjs[k];
        mtlobj = charmtls[k];
        for (i = 0; i < mtlobj.length; i++) {
            var matvertices = [];
            var matnormals = [];
            var mattextureCoords = [];
            mvno = 0;
            material = mtlobj[i];
            groups = material.groups;
            for (j = 0; j < groups.length; j++) {
                index = bufferindex + groups[j];
                matvertices = matvertices.concat(theObjVertexPositionBuffers[index]);
                matnormals = matnormals.concat(theObjVertexNormalBuffers[index]);
                mattextureCoords = mattextureCoords.concat(theObjVertexTextureCoordBuffers[index]);
            }
            mvno = matvertices.length / 3;
            theObjVertexPositionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, theObjVertexPositionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(matvertices), gl.STATIC_DRAW);
            theObjVertexPositionBuffer.itemSize = 3;
            theObjVertexPositionBuffer.numItems = mvno;
            gl.bindBuffer(gl.ARRAY_BUFFER, theObjVertexPositionBuffer);
            gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, theObjVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

            theObjVertexNormalBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, theObjVertexNormalBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(matnormals), gl.STATIC_DRAW);
            theObjVertexNormalBuffer.itemSize = 3;
            theObjVertexNormalBuffer.numItems = mvno;
            gl.bindBuffer(gl.ARRAY_BUFFER, theObjVertexNormalBuffer);
            gl.vertexAttribPointer(shaderProgram.vertexNormalsAttribute, theObjVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);


            theObjVertexTextureCoordBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, theObjVertexTextureCoordBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mattextureCoords), gl.STATIC_DRAW);
            theObjVertexTextureCoordBuffer.itemSize = 2;
            theObjVertexTextureCoordBuffer.numItems = mvno;
            gl.bindBuffer(gl.ARRAY_BUFFER, theObjVertexTextureCoordBuffer);
            gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, theObjVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
            gl.uniform1f(shaderProgram.bbUniform, 0.0);

            tindex = texfiles.indexOf(material.map_Kd);
            gl.uniform1i(shaderProgram.samplerUniform0, 0);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, textures[tindex]);

            gl.uniform3fv(shaderProgram.kdUniform, material.kd);
            gl.uniform3fv(shaderProgram.ksUniform, material.ks);
            gl.uniform3fv(shaderProgram.kaUniform, material.ka);
            gl.uniform1f(shaderProgram.nUniform, material.Ns);

            gl.drawArrays(gl.TRIANGLES, 0, mvno);

        }
        bufferindex += theobj.groups.length;
    }
    //Game board display
    //  mat4.ortho(projectionMatrix, 100,100,100,100, 0.1, 100.0);
    if (renderboard == 1) {
        blockcount = 0;
        for (v = 1; v < 8; v++) {
            count = v - 1;
            for (c = 0; c < v; c++) {
                mat4.identity(modelViewMatrix);
                mat4.lookAt(modelViewMatrix, [0, -.3, 2], [0, 0, 0], [0, 1, 0]);
                mat4.translate(modelViewMatrix, modelViewMatrix, blockstranslation[blockcount]);
                count -= 2;
                mat4.scale(modelViewMatrix, modelViewMatrix, [0.06, 0.06, 0.06]);
                mat4.rotate(modelViewMatrix, modelViewMatrix, degToRad(0), [0, 1, 0]);
                mat4.rotate(modelViewMatrix, modelViewMatrix, degToRad(45), [-1, 0, 0]);
                mat4.rotate(modelViewMatrix, modelViewMatrix, degToRad(45), [0, 0, 1]);
                mat3.normalFromMat4(transformMatrix, modelViewMatrix);

                gl.uniformMatrix4fv(shaderProgram.projectionMatrixUniform, false, projectionMatrix);
                gl.uniformMatrix4fv(shaderProgram.modelViewMatrixUniform, false, modelViewMatrix);
                gl.uniformMatrix3fv(shaderProgram.transformMatrixUniform, false, transformMatrix);


                cubeVertexPositionBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubevertices), gl.STATIC_DRAW);
                cubeVertexPositionBuffer.itemSize = 3;
                cubeVertexPositionBuffer.numItems = 36;
                gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
                gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

                gl.uniform1f(shaderProgram.bbUniform, 1.0);

                cubeVertexColorBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubecolorArray[blockcount]), gl.STATIC_DRAW);
                cubeVertexColorBuffer.itemSize = 3;
                cubeVertexColorBuffer.numItems = 36;
                gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer);
                gl.vertexAttribPointer(shaderProgram.vertexNormalsAttribute, cubeVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

                blockcount++;
                gl.drawArrays(gl.TRIANGLES, 0, cubeVertexPositionBuffer.numItems);

            }
        }

        if (enemy1flag == 1) {
            slowe1++;
            if (slowe1 == 60) {
              if ([currentposition[2],currentposition[3],currentposition[6]].indexOf(enemy1path[ep]) == -1 || enemy1path[ep]==0) {
                oldpos[1] = currentposition[1];
                currentposition[1] = enemy1path[ep++];
                jumpflag[1] = 1;
                def[1]=0.8;
              }

                if (currentposition[1] == -1) {
                    render[1] = 0;
                    enemy1flag = 0;
                }
                slowe1 = 0;
            }
        }
        if (enemy2flag == 1) {
            slowe2++;
            if (slowe2 == 60) {
                while (1) {
                    nextposition = neighbours[currentposition[2]][parseInt(Math.random() * 4)];
                    if ([-1, currentposition[1], currentposition[3],currentposition[6], 29, 30].indexOf(nextposition) != -1) continue;
                    oldpos[2] = currentposition[2];
                    currentposition[2] = nextposition - 1;
                    jumpflag[2] = 1;
                    def[2]=0.8;
                    break;
                }
                slowe2 = 0;
            }
        }
        if (enemy3flag == 1) {
            slowe3++;
            if (slowe3 == 60) {
                if ([currentposition[2],currentposition[1],currentposition[6]].indexOf(enemy3path[ep3]) == -1 || enemy3path[ep3]==0) {
                    oldpos[3] = currentposition[3];
                    currentposition[3] = enemy3path[ep3++];
                    jumpflag[3] = 1;
                    def[3]=0.8;
                }
                if (currentposition[3] == -1) {
                    render[3] = 0;
                    enemy3flag = 0;
                }
                slowe3 = 0;
            }
        }
        if (enemy4flag == 1) {
            slowe4++;
            if (slowe4 == 40) {
                while (1) {
                    min =99;
                    for(m =0;m<4;m++)
                    {
                      if([-1,29,30].indexOf(neighbours[currentposition[6]][m]) != -1) continue;
                      if((themin = (Math.abs(currentposition[0]-neighbours[currentposition[6]][m])))<min)
                      {
                        min = themin;
                        nextposition = neighbours[currentposition[6]][m];
                      }
                    }
                    if ([-1, currentposition[1], currentposition[2],currentposition[3], 29, 30].indexOf(nextposition) != -1)
                    {
                      break;
                    }
                    oldpos[6] = currentposition[6];
                    currentposition[6] = nextposition - 1;
                    jumpflag[6]=1
                    def[6] = 0.8;
                    break;
                }
                slowe4 = 0;
            }
        }

        if (((currentposition[0] == currentposition[1] && render[1] == 1)
            || (currentposition[0] == currentposition[2] && render[2] == 1)
            || (currentposition[0] == currentposition[3] && render[3] == 1)
            || (currentposition[0] == currentposition[6] && render[6] == 1))
            && gamestarted == 1 && currentposition[0]!= hitposition && currentposition[0] !=0 ) {
            smash.play();
            hitposition = currentposition[0];
            currentposition[0] = 0;
            charrotate[0] = [40,30,0];
            lives--;
            if (lives == 0) {
                gameover.play();
                level =1;
                collected =0;
                charrotate[0] = [25,180,0];
                gamestatus = GAMEOVER;
            }
        }
        if ([28, 29].indexOf(currentposition[0]) != -1) {
            jumpflag[0] = 1;
            def[0] =0.8;
            oldpos[0] = currentposition[0];
            collected--;
            gameboard[currentposition[0]] = 0;
            currentposition[0] = 0;
            charrotate[0] = [40,30,0];
        }
        // charrotate[4][0]= (charrotate[4][0]+1)%360;
        // charrotate[5][0]= (charrotate[5][0]+1)%360;
        if(gamecounter%20 == 0)
        {
          rotatedisc();
        }

    }
}

window.onload = drawImage;
