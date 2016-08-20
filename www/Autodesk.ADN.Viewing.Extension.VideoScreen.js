AutodeskNamespace("Autodesk.ADN.Viewing.Extension");
AutodeskNamespace("Autodesk.ADN.Viewing.Extension.VideoScreen");

Autodesk.ADN.Viewing.Extension.VideoScreen = function(viewer, options) {
    _self=this;
    var _viewer=viewer;
    var _container=$(_viewer.container)
    Autodesk.Viewing.Extension.call(this, viewer, options);
    var _cssRenderer =new THREE.CSS3DRenderer () ;
    var _element;

    var Element = function ( id, x, y, z, ry ) {
        var div = document.createElement( 'div' );
        div.style.width = '480px';
        div.style.height = '360px';
        div.style.backgroundColor = '#000';

        var iframe = document.createElement( 'iframe' );
        iframe.style.width = '480px';
        iframe.style.height = '360px';
        iframe.style.border = '0px';
        iframe.src = [ 'http://www.youtube.com/embed/', id, '?rel=0&autoplay=1' ].join( '' );
        div.appendChild( iframe );
        var object = new THREE.CSS3DObject( div );
        object.position.set(100,100,1.2);
        object.rotation.set (10, 10, 10) ;
        object.scale.set (_viewer.impl.scale, _viewer.impl.scale, _viewer.impl.scale) ;
        return object;
    };  

    _self.update =function (timeStamp) {
        _cssRenderer.render (_viewer.impl.scene, _viewer.impl.camera) ;
    }  

    _self.load = function() {
        _viewer.impl.camera.getEffectiveFOV=getEffectiveFOV;
        _cssRenderer.setSize (_container.outerWidth (), _container.outerHeight ()) ;
          // container.appendChild( _cssRenderer.domElement );
        $(_cssRenderer.domElement)
            .css ('position', 'absolute')
            .css ('top', '0px')
            .css ('z-index', 10)
            .css ('pointer-events', 'none')
            .appendTo (_container) ;

        _element=new Element( 'njCDZWTI-xg', 0, 0, 240, 0 );
        _viewer.impl.scene.add(_element);
        animate();
        console.log("Heat Map Floor loaded.");
        return true;
    }

    function getEffectiveFOV () {
        return THREE.Math.RAD2DEG * 2 * Math.atan(
        Math.tan( THREE.Math.DEG2RAD * 0.5 * this.fov ) / this.zoom );
    };

    function animate() {
        requestAnimationFrame(animate);
        _cssRenderer.render (_viewer.impl.scene, _viewer.impl.camera) ;
        _viewer.impl.invalidate(true, false, true);
    }
}

// Extension registration
Autodesk.ADN.Viewing.Extension.VideoScreen.prototype =
    Object.create(Autodesk.Viewing.Extension.prototype);

Autodesk.ADN.Viewing.Extension.VideoScreen.prototype.constructor =
    Autodesk.ADN.Viewing.Extension.VideoScreen;

Autodesk.Viewing.theExtensionManager.registerExtension(
    "VideoScreen",
    Autodesk.ADN.Viewing.Extension.VideoScreen);

