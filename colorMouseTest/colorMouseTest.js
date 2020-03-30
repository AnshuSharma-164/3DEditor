// initialization of Three.js
function init() {
    // Check if WebGL is available see Three/examples
    // No need for webgl2 here - change as appropriate
    if (THREE.WEBGL.isWebGLAvailable() === false) {
        // if not print error on console and exit
        document.body.appendChild(THREE.WEBGL.getWebGLErrorMessage());
    }
    // add our rendering surface and initialize the renderer
    var container = document.createElement('div');
    document.body.appendChild(container);
    // WebGL2 examples suggest we need a canvas
    // canvas = document.createElement( 'canvas' );
    // var context = canvas.getContext( 'webgl2' );
    // var renderer = new THREE.WebGLRenderer( { canvas: canvas, context: context } );
    renderer = new THREE.WebGLRenderer();
    // set some state - here just clear color
    renderer.setClearColor(new THREE.Color(0x333333));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);


    // All drawing will be organized in a scene graph
    var scene = new THREE.Scene();

    //Body Group
    var bodyGroup = new THREE.Group();
    scene.add(bodyGroup)
    var bodyMaterial = new THREE.MeshBasicMaterial({ color: '#ffae23' });
    var bodyGeometry = new THREE.BoxGeometry(10, 10, 10);
    var body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(7.5, 0, 0);
    bodyGroup.add(body);

    var bodyGroup2 = new THREE.Group();
    scene.add(bodyGroup2)
    var bodyMaterial2 = new THREE.MeshBasicMaterial({ color: '#ffae23' });
    var bodyGeometry2 = new THREE.BoxGeometry(10, 10, 10);
    var body2 = new THREE.Mesh(bodyGeometry2, bodyMaterial2);
    body2.position.set(-7.5, 0, 0);
    bodyGroup2.add(body2);

    var bodyGroup3 = new THREE.Group();
    scene.add(bodyGroup3)
    var bodyMaterial3 = new THREE.MeshBasicMaterial({ color: '#ffae23' });
    var bodyGeometry3 = new THREE.BoxGeometry(10, 10, 10);
    var body3 = new THREE.Mesh(bodyGeometry3, bodyMaterial3);
    body3.position.set(0, 15, 0);
    bodyGroup3.add(body3);

    var bodyGroup4 = new THREE.Group();
    scene.add(bodyGroup4)
    var bodyMaterial4 = new THREE.MeshBasicMaterial({ color: '#ffae23' });
    var bodyGeometry4 = new THREE.BoxGeometry(10, 10, 10);
    var body4 = new THREE.Mesh(bodyGeometry4, bodyMaterial4);
    body4.position.set(0, -15, 0);
    bodyGroup4.add(body4);

    
 
    // need a camera to look at things
    // calcaulate aspectRatio
    var aspectRatio = window.innerWidth / window.innerHeight;
    var width = 20;
    // Camera needs to be global
    camera = new THREE.PerspectiveCamera(45, aspectRatio, 1, 1000);
    // position the camera back and point to the center of the scene
    camera.position.z = 100;
    camera.lookAt(scene.position);

    // render the scene
    renderer.render(scene, camera);

    //declared once at the top of your code
    var camera_axis = new THREE.Vector3(-30,30,30).normalize(); // viewing axis

   
    //Variable to stop and start the animation
    var stop = 1;
    //Counter for the sine function
    var w = 0;
    //Variable to remove and add the pointer
    var addRemove = 1;

    // setup the control gui
    var controls = new function () {
    this.xHead = 0
        this.redraw = function () {
        };
    this.zHead = 0
        this.redraw = function () {
        };
    this.zCamera = 100
        this.redraw = function () {
        };
    this.yCamera = 0
        this.redraw = function () {
        };
    this.xCamera = 0
        this.redraw = function () {
        };
    this.xRoCamera = 0
        this.redraw = function () {
        };
    this.yRoCamera = 0
        this.redraw = function () {
        };
    this.piker = function () {
        if (COLL == true) {
            bClone = body2;
            COLL = false;
        } else {
            bClone = body;
            COLL = true;
        }
    }
    }


    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    
    window.addEventListener('click', onDocumentMouseDown, false);

    function onDocumentMouseDown( event ) {

    event.preventDefault();

    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );

    var intersects = raycaster.intersectObjects(scene.children, true); 
    for( var i = 0; i < intersects.length; i++ ) {
        var intersection = intersects[ i ],
        obj = intersection.object;
        console.log("Intersected object", obj);
        bClone = obj;
      }

    }


    var COLL = true;
    var bClone = body;

    var gui = new dat.GUI();
    var conf = {color : '#ffae23'};
    gui.add(controls, 'xHead', -24, 24).onChange(controls.redraw);
    gui.add(controls, 'zHead', -24, 24).onChange(controls.redraw);
    gui.add(controls, 'zCamera', 60, 140).onChange(controls.redraw);
    gui.add(controls, 'yCamera', -24, 24).onChange(controls.redraw);
    gui.add(controls, 'xCamera', -24, 24).onChange(controls.redraw);
    gui.add(controls, 'xRoCamera', 0, 2*(Math.PI)).onChange(controls.redraw);
    gui.add(controls, 'yRoCamera', 0, 2*(Math.PI)).onChange(controls.redraw);
    gui.add(controls, 'piker').listen();
    gui.addColor(conf, 'color').onChange( function(colorValue) {
        bClone.material.color.set(colorValue);
    });
    
    render();

    function render() {
    // render using requestAnimationFrame - register function
    requestAnimationFrame(render);
    
    renderer.render(scene, camera);
    }

}



function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    // If we use a canvas then we also have to worry of resizing it
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = init;

// register our resize event function
window.addEventListener('resize', onResize, true);
//render();





