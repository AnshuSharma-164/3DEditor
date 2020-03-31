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
    torso.add(chest);

    //top button
    var sphereGeometry_top_button = new THREE.SphereGeometry(1,16,16);
    var top_button = new THREE.Mesh(sphereGeometry_top_button,faceMaterial_orange);
    torso.add(top_button);
    top_button.position.set(0,4,11.5);

    //bottom button
    var sphereGeometry_bottom_button = new THREE.SphereGeometry(1,16,16);
    var bottom_button = new THREE.Mesh(sphereGeometry_bottom_button,faceMaterial_orange);
    torso.add(bottom_button);
    bottom_button.position.set(0,-4,13);
    
    // head group
    var headGroup = new THREE.Group();
    torso.add(headGroup);
    headGroup.position.set(0, 7, 0);
    
    //head
    var teapotGeometry_head = new THREE.TeapotBufferGeometry(8, 20, true, true, true, false, false);
    var head = new THREE.Mesh(teapotGeometry_head, faceMaterial_white);
    headGroup.add(head)
    head.position.set(0,16,0);
    
    //neck
    var cylinderGeometry_neck = new THREE.CylinderGeometry(4, 5, 14, 32);
    var neck = new THREE.Mesh(cylinderGeometry_neck,faceMaterial_orange);
    headGroup.add(neck);
    neck.position.set(0,7,0);

    //left eye
    var sphereGeometry_left_eye = new THREE.SphereGeometry(2,16,16);
    left_eye = new THREE.Mesh(sphereGeometry_left_eye,faceMaterial_black);
    headGroup.add(left_eye);
    left_eye.position.set(-3,16,6);

    //right eye
    var sphereGeometry_right_eye = new THREE.SphereGeometry(2,16,16);
    right_eye = new THREE.Mesh(sphereGeometry_right_eye,faceMaterial_black);
    headGroup.add(right_eye);
    right_eye.position.set(3,16,6);

    //left leg
    var leftLegGroup = new THREE.Group();
    torso.add(leftLegGroup);
    leftLegGroup.position.set(-7,-13,0)
    //left quad
    var cylinderGeometry_left_quad = new THREE.CylinderGeometry(4,3,16,32);
    left_quad = new THREE.Mesh(cylinderGeometry_left_quad,faceMaterial_orange);
    leftLegGroup.add(left_quad);
    left_quad.position.set(0,-1,0);
    //left shin
    var cylinderGeometry_left_shin = new THREE.CylinderGeometry(3,2,10,32);
    left_shin = new THREE.Mesh(cylinderGeometry_left_shin,faceMaterial_orange);
    leftLegGroup.add(left_shin);
    left_shin.position.set(0,-12,0);
    //left shoe
    var sphereGeometry_left_shoe = new THREE.SphereGeometry(2,16,16);
    left_shoe = new THREE.Mesh(sphereGeometry_left_shoe, faceMaterial_black);
    leftLegGroup.add(left_shoe)
    left_shoe.position.set(0,-18,0);
    leftLegs.push(leftLegGroup)
    //leftLegGroup.rotation.z = -Math.PI*0.5

    //right leg
    var rightLegGroup = new THREE.Group();
    torso.add(rightLegGroup);
    rightLegGroup.position.set(7,-13,0)
    //right quad
    var cylinderGeometry_right_quad = new THREE.CylinderGeometry(4,3,16,32);
    right_quad = new THREE.Mesh(cylinderGeometry_right_quad,faceMaterial_orange);
    rightLegGroup.add(right_quad);
    right_quad.position.set(0,-1,0);
    //right shin
    var cylinderGeometry_right_shin = new THREE.CylinderGeometry(3,2,10,32);
    right_shin = new THREE.Mesh(cylinderGeometry_right_shin,faceMaterial_orange);
    rightLegGroup.add(right_shin);
    right_shin.position.set(0,-12,0);
    //right shoe
    var sphereGeometry_right_shoe = new THREE.SphereGeometry(2,16,16);
    right_shoe = new THREE.Mesh(sphereGeometry_right_shoe, faceMaterial_black);
    rightLegGroup.add(right_shoe)
    right_shoe.position.set(0,-18,0);
    rightLegs.push(rightLegGroup);

    //left arm
    var leftArmGroup = new THREE.Group();
    torso.add(leftArmGroup);
    leftArmGroup.position.set(-9,11,0)
    //left bicep
    var cylinderGeometry_left_bicep = new THREE.CylinderGeometry(2,3,12,32);
    left_bicep = new THREE.Mesh(cylinderGeometry_left_bicep, faceMaterial_pink);
    leftArmGroup.add(left_bicep)
    left_bicep.position.set(0,-6,0);
    //left forearm
    var cylinderGeometry_left_forearm = new THREE.CylinderGeometry(3,8,12,32);
    left_forearm = new THREE.Mesh(cylinderGeometry_left_forearm, faceMaterial_pink);
    leftArmGroup.add(left_forearm)
    left_forearm.position.set(0,-17,0)
    //left hand
    var sphereGeometry_left_hand = new THREE.SphereGeometry(3,16,16);
    left_hand = new THREE.Mesh(sphereGeometry_left_hand, faceMaterial_white);
    leftArmGroup.add(left_hand);
    left_hand.position.set(0,-23,0);
    leftArmGroup.rotation.z = -Math.PI/4
    leftArms.push(leftArmGroup);

    //right arm
    var rightArmGroup = new THREE.Group();
    torso.add(rightArmGroup);
    rightArmGroup.position.set(9,11,0)
    //right bicep
    var cylinderGeometry_right_bicep = new THREE.CylinderGeometry(2,3,12,32);
    right_bicep = new THREE.Mesh(cylinderGeometry_right_bicep, faceMaterial_pink);
    rightArmGroup.add(right_bicep)
    right_bicep.position.set(0,-6,0);
    //right forearm
    var cylinderGeometry_right_forearm = new THREE.CylinderGeometry(3,8,12,32);
    right_forearm = new THREE.Mesh(cylinderGeometry_right_forearm, faceMaterial_pink);
    rightArmGroup.add(right_forearm)
    right_forearm.position.set(0,-17,0)
    //right hand
    var sphereGeometry_right_hand = new THREE.SphereGeometry(3,16,16);
    right_hand = new THREE.Mesh(sphereGeometry_right_hand, faceMaterial_white);
    rightArmGroup.add(right_hand);
    right_hand.position.set(0,-23,0);
    rightArmGroup.rotation.z = Math.PI/4
    rightArms.push(rightArmGroup)

    //string and marble
    var stringGroup = new THREE.Group();
    torso.add(stringGroup);
    stringGroup.position.set(0,-20,-7);
    //string
    var cylinderGeometry_string = new THREE.CylinderGeometry(0.25,0.25,35,32);
    string = new THREE.Mesh(cylinderGeometry_string, faceMaterial_black);
    stringGroup.add(string);
    //marble
    var sphereGeometry_marble = new THREE.SphereGeometry(1,16,16);
    marble = new THREE.Mesh(sphereGeometry_marble, faceMaterial_white);
    stringGroup.add(marble);
    marble.position.set(0,-18,0);
    marbles.push(stringGroup);



    //focal point
    var pointGroup = new THREE.Group()
    scene.add(pointGroup);
    var sphereGeometry_point = new THREE.SphereGeometry(1,16,16);
    var faceMaterial_clearblack = new THREE.MeshBasicMaterial({color:'black'});
    faceMaterial_clearblack.transparent = true;
    point = new THREE.Mesh(sphereGeometry_point, faceMaterial_clearblack);
    pointGroup.add(point);
    point.position.set(0,0,0);


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


    //number of dolls
    var dolls = 1;
    
    // setup the control gui
    var controls = new function () {
        this.focalPoint = true
        this.animation = 1
        this.yRotation = 0
        this.xRotation = 0
        this.zPosition = 300
        this.yPosition = 0
        this.xPosition = 0
        this.xHead = 0
        this.yHead = 0
        this.x = 0
        this.y = 0
        this.duplicates = function spawn() {
            clone = new THREE.Group()
            c = chest.clone();
            tb = top_button.clone();
            bb = bottom_button.clone();
            h = headGroup.clone();
            ll = leftLegGroup.clone();
            rl = rightLegGroup.clone();
            la = leftArmGroup.clone();
            ra = rightArmGroup.clone();
            ms = stringGroup.clone();
            clone.add(c);
            clone.add(tb);
            clone.add(bb);
            clone.add(h);
            clone.add(ll);
            clone.add(rl);
            clone.add(la);
            clone.add(ra);
            clone.add(ms);
            leftLegs.push(ll);
            rightLegs.push(rl);
            leftArms.push(la);
            rightArms.push(ra);
            marbles.push(ms);
            clone.position.set(controls.x, controls.y, 0);
            scene.add(clone);
        }
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
      }
    }

    var coloredMesh = chest; //Variable to control the color of the selected mesh

    var n = 0
    var gui = new dat.GUI();
    var conf = {color : '#ffae23'};
    gui.add(controls, 'focalPoint').onChange(controls.redraw);
    gui.add(controls, 'animation',0,1).step(1).onChange(controls.redraw);
    gui.add(controls, 'yRotation', 0, Math.PI*0.5).onChange(controls.redraw);
    gui.add(controls, 'xRotation', 0, Math.PI*0.5).onChange(controls.redraw);
    gui.add(controls, 'zPosition', 100, 500).onChange(controls.redraw);
    gui.add(controls, 'yPosition', -100, 100).onChange(controls.redraw);
    gui.add(controls, 'xPosition', -100, 100).onChange(controls.redraw);
    gui.add(controls, 'xHead', -Math.PI*0.10, Math.PI*0.10).onChange(controls.redraw);
    gui.add(controls, 'yHead', -Math.PI*0.10, Math.PI*0.10).onChange(controls.redraw);
    gui.add(controls, 'x', -400, 400).onChange(controls.redraw);
    gui.add(controls, 'y', -400, 400).onChange(controls.redraw);
    gui.add(controls, 'duplicates').onChange(controls.redraw);
    //gui color picker to control the color of the selected mesh
    gui.addColor(conf, 'color').onChange( function(colorValue) {
        coloredMesh.material.color.set(colorValue);
    });

    function animate(s,l,r,la,ra) {
        s.position.y = stringGroup.position.y + 0.05*Math.sin((n*0.01))*animation;
        l.rotation.z = (Math.sin(stringGroup.position.y)*Math.PI*0.2) - Math.PI*0.2
        r.rotation.z = (Math.sin(stringGroup.position.y-Math.PI)*Math.PI*0.2)+ Math.PI*0.2
        la.rotation.z = (Math.sin(stringGroup.position.y)* Math.PI * 0.2)-Math.PI*0.5
        ra.rotation.z = (Math.sin(stringGroup.position.y-Math.PI) * Math.PI* 0.2)+Math.PI*0.5; 
    }


    render();

    function render() {
        // render using requestAnimationFrame - register function
        requestAnimationFrame(render);
        

        //test = torso.clone();
        //scene.add(test);
        //test.position.set(75,0,0);

        yRotation = controls.yRotation
        xRotation = controls.xRotation
        zPosition = controls.zPosition
        yPosition = controls.yPosition
        xPosition = controls.xPosition
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
        
        for(i = 0; i < leftLegs.length; i++){
            animate(marbles[i],leftLegs[i],rightLegs[i],leftArms[i],rightArms[i]);
        }
        
        //stringGroup.position.y = stringGroup.position.y + 0.05*Math.sin((n*0.01))*animation;
        //torso.children[4].rotation.z = (Math.sin(stringGroup.position.y)*Math.PI*0.2) - Math.PI*0.2
        //rightLegGroup.rotation.z = (Math.sin(stringGroup.position.y-Math.PI)*Math.PI*0.2)+ Math.PI*0.2
        //leftArmGroup.rotation.z = (Math.sin(stringGroup.position.y)* Math.PI * 0.2)-Math.PI*0.5
        //rightArmGroup.rotation.z = (Math.sin(stringGroup.position.y-Math.PI) * Math.PI* 0.2)+Math.PI*0.5; 
        
        
        //old animation
        //leftLegGroup.rotation.z = (Math.sin(n*0.01) * Math.PI * 0.2* animation)-Math.PI*0.2;
        //rightLegGroup.rotation.z = (Math.sin((n-(Math.PI*100))*0.01) * Math.PI* 0.2*animation)+Math.PI*0.2;
        //leftArmGroup.rotation.z = (Math.sin(n*0.01)* Math.PI * 0.2)*animation-Math.PI*0.5;
        //rightArmGroup.rotation.z = (Math.sin((n-(Math.PI*100))*0.01) * Math.PI* 0.2*animation)+Math.PI*0.5;
        //stringGroup.position.y = stringGroup.position.y + 0.25*Math.sin((n*0.01))*animation;

        headGroup.rotation.x = yHead
        headGroup.rotation.y = xHead

        pointGroup.rotation.x = 2*Math.PI*Math.sin(yRotation);
        pointGroup.rotation.y = 2*Math.PI*Math.sin(xRotation);
        camera.position.z = zPosition;
        pointGroup.position.x = xPosition;
        pointGroup.position.y = yPosition;

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