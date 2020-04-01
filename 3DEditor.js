// initialization of Three.js
function init() {

    // Check if WebGL
    if (THREE.WEBGL.isWebGLAvailable() === false) {
        // if not print error on console and exit
        document.body.appendChild(WEBGL.getWebGLErrorMessage());
    }
    // add our rendering surface and initialize the renderer
    var container = document.createElement('div');
    document.body.appendChild(container);

    renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);



    var scene = new THREE.Scene();

    var faceMaterial_pink = new THREE.MeshBasicMaterial({ color: 'pink' });
    var faceMaterial_white = new THREE.MeshBasicMaterial({ color: 'white' });
    var faceMaterial_orange = new THREE.MeshBasicMaterial({ color: 'orange' });
    var faceMaterial_black = new THREE.MeshBasicMaterial({color: 'black'});

    //arrays cause scene doesn't want to work
    leftLegs = [];
    rightLegs = [];
    leftArms = [];
    rightArms = [];
    marbles = [];

    //torso group
    var torso = new THREE.Group();
    scene.add(torso);
    // chest is a child
    var cylinderGeometry = new THREE.CylinderGeometry(10, 15, 26, 32);
    var chest = new THREE.Mesh(cylinderGeometry, faceMaterial_pink);
    // position chest on the center
    chest.position.set(0, 0, 0);
    // add the chest to the torso group
    //torso.add(chest);


    //focal point
    var pointGroup = new THREE.Group()
    scene.add(pointGroup);
    var faceMaterial_clearblack = new THREE.MeshBasicMaterial({color:'black'});
    faceMaterial_clearblack.transparent = true;


    // need a camera to look at things
    // calcaulate aspectRatio
    var aspectRatio = window.innerWidth / window.innerHeight;
 
    // Camera needs to be global
    camera = new THREE.PerspectiveCamera(45, aspectRatio, 1, 1000);
    pointGroup.add(camera)
    // position the camera back and point to the center of the scene
    //pointGroup.position.z = 100;
    camera.position.z = 300;
    camera.lookAt(pointGroup.position);

    // render the scene
    renderer.render(scene, camera);


    var coloredMesh = chest; //Variable to control the color of the selected mesh
    // setup the control gui
    var controls = new function () {
        this.xScaling = 1 //Default x scaling parameter
        this.yScaling = 1 //Default y scaling parameter
        this.zScaling = 1 //Default z scaling parameter
        this.animation = 1
        this.yRotation = 0
        this.xRotation = 0
        this.zPosition = coloredMesh.position.z //the default position of zPosition is now the one of the clicked object
        this.yPosition = coloredMesh.position.y //the default position of yPosition is now the one of the clicked object
        this.xPosition = coloredMesh.position.x //the default position of yPosition is now the one of the clicked object
        this.redraw = function () {
        };
    };

    var raycaster = new THREE.Raycaster(); // raycaster vector
    var mouse = new THREE.Vector2(); // mouse vector
    
    window.addEventListener('click', onDocumentMouseDown, false); // Event listener

    // Mouse click function
    function onDocumentMouseDown( event ) {

    event.preventDefault();

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera( mouse, camera );

    //calulate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children, true); 
    
    for( var i = 0; i < intersects.length; i++ ) {
        var intersection = intersects[ i ],
        obj = intersection.object; // Store the intersected mesh in the obj var
        coloredMesh = obj; // Store the obj var in the colored mesh var

        //Changing the controls.(z,y,x)Position so the clicked object doesn't respawn at the previous object position
        controls.zPosition = coloredMesh.position.z
        controls.yPosition = coloredMesh.position.y
        controls.xPosition = coloredMesh.position.x

        //Reset the scaling parameters so the clicked object doesn't get the previous object scaling
        controls.xScaling = 1;
        controls.yScaling = 1;
        controls.zScaling = 1;
      }
    }


    var n = 0
    var gui = new dat.GUI();
    var conf = {color : '#ffae23'};
    gui.add(controls, 'animation',0,1).step(1).onChange(controls.redraw);
    gui.add(controls, 'xScaling', 0.01, 5).onChange(controls.redraw);
    gui.add(controls, 'yScaling', 0.01, 5).onChange(controls.redraw);
    gui.add(controls, 'zScaling', 0.01, 5).onChange(controls.redraw);
    gui.add(controls, 'yRotation', 0, Math.PI*0.5).onChange(controls.redraw);
    gui.add(controls, 'xRotation', 0, Math.PI*0.5).onChange(controls.redraw);
    gui.add(controls, 'zPosition', -50, 250).onChange(controls.redraw);
    gui.add(controls, 'yPosition', -100, 100).onChange(controls.redraw);
    gui.add(controls, 'xPosition', -100, 100).onChange(controls.redraw);
    //gui color picker to control the color of the selected mesh
    gui.addColor(conf, 'color').onChange( function(colorValue) {
        coloredMesh.material.color.set(colorValue);
    });

    // set up the controls for the primitives gui
    var controls2 = new function () {
    	this.group = function () {

    	}
        //cube spawn function
        this.cube = function () {
        	var colour = new THREE.MeshBasicMaterial({color: 'black'});
        	var boxGeometry = new THREE.BoxGeometry(4,4,4);
    		var box = new THREE.Mesh(boxGeometry, colour);
    		scene.add(box);
    		box.position.set(0,50,0);
        }

        //sphere spawn function
        this.sphere = function () {
        	var colour = new THREE.MeshBasicMaterial({color: 'black'});
        	var sphereGeometry = new THREE.SphereGeometry(3,16,16);
    		var sphere = new THREE.Mesh(sphereGeometry, colour);
    		scene.add(sphere);
    		sphere.position.set(50,0,0);
        }

        //cone spawn function
        this.cylinder = function () {
        }

        this.redraw = function () {
        	
        };
    };

    // primitive gui
    var gui2 = new dat.GUI();
    gui2.add(controls2, 'sphere').onChange(controls.redraw);
    gui2.add(controls2, 'cylinder').onChange(controls.redraw);
    gui2.add(controls2, 'cube').onChange(controls.redraw);


    render();

    function render() {
        // render using requestAnimationFrame - register function
        requestAnimationFrame(render);
        

        //test = torso.clone();
        //scene.add(test);
        //test.position.set(75,0,0);

        yRotation = controls.yRotation
        xRotation = controls.xRotation

        //Changes the selected object z, y and x position.
        coloredMesh.position.z = controls.zPosition
        coloredMesh.position.y = controls.yPosition
        coloredMesh.position.x = controls.xPosition

        //Changes the selected object scaling parameters.
        coloredMesh.scale.x = controls.xScaling
        coloredMesh.scale.y = controls.yScaling
        coloredMesh.scale.z = controls.zScaling

        animation = controls.animation
        xHead = controls.xHead
        yHead = controls.yHead
        duplicates = controls.duplicates

        if(controls.focalPoint === true){
            faceMaterial_clearblack.opacity =1;
        }else {
            faceMaterial_clearblack.opacity =0;
        }
        
        
        n = n+Math.PI;

        //torso.rotation.x = (torso.rotation.x + 3*speed);
        if(animation===0){
            n= 0;
            stringGroup.position.y = -20;
        }

        if(duplicates===1){
            spawn()
        }

        pointGroup.rotation.x = 2*Math.PI*Math.sin(yRotation);
        pointGroup.rotation.y = 2*Math.PI*Math.sin(xRotation);
        //camera.position.z = zPosition;
        //pointGroup.position.x = xPosition;
        //pointGroup.position.y = yPosition;

        document.body
    
        renderer.render(scene, camera);
    }

}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = init;

// register our resize event function
window.addEventListener('resize', onResize, true);