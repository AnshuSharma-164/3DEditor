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
    chest.position.set(0, 0, 230);
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

        this.group = function () {

    	}
        //cube spawn function
        this.cube = function () {
        	var colour = new THREE.MeshBasicMaterial({color: 'black'});
        	var boxGeometry = new THREE.BoxGeometry(4,4,4);
    		var box = new THREE.Mesh(boxGeometry, colour);
    		scene.add(box);
    		box.position.set(0,10,230);
        }

        //sphere spawn function
        this.sphere = function () {
        	var colour = new THREE.MeshBasicMaterial({color: 'black'});
        	var sphereGeometry = new THREE.SphereGeometry(0.75,16,16);
    		var sphere = new THREE.Mesh(sphereGeometry, colour);
    		scene.add(sphere);
    		sphere.position.set(5,0,230);
        }

        //cylinder spawn function
        this.cylinder = function () {
            var colour = new THREE.MeshBasicMaterial({color: 'black'});
            var cylinderGeometry = new THREE.CylinderBufferGeometry(1,1,5,16);
            var cylinder = new THREE.Mesh(cylinderGeometry, colour);
            scene.add(cylinder);
            cylinder.position.set(-5,0,230);
        }

        //cone spawn function
        this.cone = function () {
            var colour = new THREE.MeshBasicMaterial({color: 'black'});
            var coneGeometry = new THREE.ConeBufferGeometry(1,5,16);
            var cone = new THREE.Mesh(coneGeometry, colour);
            scene.add(cone);
            cone.position.set(0,-20,230);
        }

        //Octahedron spawn function
        this.tetrahedron = function () {
            var colour = new THREE.MeshBasicMaterial({color: 'black'});
            var octaGeometry = new THREE.TetrahedronBufferGeometry(1, 1);
            var tetra = new THREE.Mesh(octaGeometry, colour);
            scene.add(tetra);
            tetra.position.set(0,-10,230);
        }

        //Torus spawn function
        this.torus = function () {
            var colour = new THREE.MeshBasicMaterial({color: 'black'});
            var torusGeometry = new THREE.TorusBufferGeometry(
                1, 0.5,
                16, 48);
            var torus = new THREE.Mesh(torusGeometry, colour);
            scene.add(torus);
            torus.position.set(5,10,230);
        }

        //Delete selected mesh
        this.delete = function () {
            scene.remove(coloredMesh);
        }



        this.xScaling = 1 //Default x scaling parameter
        this.yScaling = 1 //Default y scaling parameter
        this.zScaling = 1 //Default z scaling parameter
        this.xRotation = 0 //Default camera x rotation parameter 
        this.yRotation = 0 //Default camera y rotation parameter
        this.oxRotation = 0 //Default object x rotation parameter
        this.oyRotation = 0 //Default object y rotation parameter
        this.ozRotation = 0 //Default object z rotation parameter
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
        controls.xScaling = coloredMesh.scale.x;
        controls.yScaling = coloredMesh.scale.y;
        controls.zScaling = coloredMesh.scale.z;
        
        //Reset the rotation parameters so the clicked object doesn't get the previous object rotations
        controls.oxRotation = coloredMesh.rotation.x;
        controls.oyRotation = coloredMesh.rotation.y;
        controls.ozRotation = coloredMesh.rotation.z;
      }
    }


    var n = 0
    var gui = new dat.GUI();
    var conf = {color : '#ffae23'};
    var folder1 = gui.addFolder('Object Selection'); // Gui Folder for object selection
    var folder2 = gui.addFolder('Object Parameters'); // Gui Folder for object parameters
    var folder3 = gui.addFolder( 'Scene Controls ' ); // Gui Folder for camera controls

    //Object selection gui elements (Folder 1)
    folder1.add(controls, 'sphere').onChange(controls.redraw);
    folder1.add(controls, 'cylinder').onChange(controls.redraw);
    folder1.add(controls, 'cube').onChange(controls.redraw);
    folder1.add(controls, 'cone').onChange(controls.redraw);
    folder1.add(controls, 'tetrahedron').onChange(controls.redraw);
    folder1.add(controls, 'torus').onChange(controls.redraw);
    folder1.add(controls, 'delete').onChange(controls.redraw);

    //Object parameters gui elements (Folder 2)
    folder2.add(controls, 'xScaling', 0.01, 5).onChange(controls.redraw);
    folder2.add(controls, 'yScaling', 0.01, 5).onChange(controls.redraw);
    folder2.add(controls, 'zScaling', 0.01, 5).onChange(controls.redraw);
    folder2.add(controls, 'oxRotation', 0, Math.PI*2).onChange(controls.redraw); // Object x rotation gui
    folder2.add(controls, 'oyRotation', 0, Math.PI*2).onChange(controls.redraw); // Object y rotation gui
    folder2.add(controls, 'ozRotation', 0, Math.PI*2).onChange(controls.redraw); // Object z rotation gui
    folder2.add(controls, 'zPosition', -50, 285).onChange(controls.redraw);
    folder2.add(controls, 'yPosition', -30, 30).onChange(controls.redraw);
    folder2.add(controls, 'xPosition', -50, 50).onChange(controls.redraw);
    //gui color picker to control the color of the selected mesh
    folder2.addColor(conf, 'color').onChange( function(colorValue) {
        coloredMesh.material.color.set(colorValue);
    });

    //Camera controls gui elements (Folder 3)
    folder3.add(controls, 'xRotation', 0, Math.PI*0.5).onChange(controls.redraw);
    folder3.add(controls, 'yRotation', 0, Math.PI*0.5).onChange(controls.redraw);
    //gui color picker to control the background color
    folder3.addColor(conf, 'color').onChange( function(colorValue) {
        renderer.setClearColor(colorValue);
    });

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

        //Changes the selected object rotation parameters.
        coloredMesh.rotation.x = controls.oxRotation
        coloredMesh.rotation.y = controls.oyRotation
        coloredMesh.rotation.z = controls.ozRotation

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