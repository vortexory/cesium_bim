// Environment settings for BIM project
export function getViewerOptions() {
    return {
        timeline: false,
        animation: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        skyBox: false,
        shadows: true,
        terrainShadows: Cesium.ShadowMode.ENABLED,
        terrainProvider: new Cesium.EllipsoidTerrainProvider()
    };
}

export async function configureCommonEnvironment(viewer) {
    // Configure base map
    const esri = await Cesium.ArcGisMapServerImageryProvider.fromUrl('https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer');
    viewer.baseLayer = Cesium.ImageryLayer.fromProviderAsync(esri);

    // Basic terrain configuration
    viewer.scene.globe.enableLighting = true;
    viewer.scene.globe.shadows = Cesium.ShadowMode.DISABLED; // Disabled terrain shadows
    viewer.scene.globe.terrainExaggeration = 12.0;
    viewer.scene.globe.terrainExaggerationRelativeHeight = 0.0;

    // Angled lighting setup for better curve visualization
    const noonLight = new Cesium.DirectionalLight({
        direction: new Cesium.Cartesian3(0.3, 0.3, -0.9),
        intensity: 3.0 // Increased for stronger shadows
    });
    viewer.scene.light = noonLight;
    viewer.scene.globe.ambientOcclusionOnly = true;
    viewer.scene.globe.ambientOcclusionRadius = 0.1; // Reduced for more concentrated shadows
    viewer.scene.globe.ambientOcclusionIntensity = 0.8; // Increased for less transparent shadows

    // Enhanced shadow settings for curve definition
    viewer.scene.globe.shadowMapSize = 4096; // Increased for better quality
    viewer.scene.globe.shadowMapSoftness = 0.03; // Even sharper shadows
    viewer.scene.globe.shadowMapBias = 0.0001;

    // Enhanced curve visualization settings
    viewer.scene.globe.baseColor = new Cesium.Color(0.1, 0.1, 0.1, 1.0); // Darker base color
    viewer.scene.globe.depthTestAgainstTerrain = true;
    viewer.scene.globe.atmosphereBrightnessShift = 0.02; // Reduced for darker shadows
    viewer.scene.globe.atmosphereSaturationShift = 1.0; // Increased for more contrast

    // Enhanced normal mapping for curves
    viewer.scene.globe.enableLighting = true;
    viewer.scene.globe.normalMap = true;
    viewer.scene.globe.maximumScreenSpaceError = 0.5; // Higher quality for better curve definition
}

// Function to add supplementary lighting
export function addSupplementaryLighting(viewer, modelCenter) {
    // Add 4 supplementary fill lights from different sides
    const directions = [
        { name: "North", position: new Cesium.Cartesian3(0, 1, 0) },
        { name: "South", position: new Cesium.Cartesian3(0, -1, 0) },
        { name: "East", position: new Cesium.Cartesian3(1, 0, 0) },
        { name: "West", position: new Cesium.Cartesian3(-1, 0, 0) }
    ];

    directions.forEach(dir => {
        viewer.entities.add({
            position: modelCenter,
            name: `${dir.name} Fill Light`,
            point: {
                color: new Cesium.Color(1.0, 1.0, 1.0, 1.0),
                pixelSize: 1,
                show: false
            },
            properties: {
                isLight: true,
                intensity: 2.0
            }
        });
    });
}

// Function to configure model edge highlighting
export function configureModelEdgeHighlighting(entity) {
    if (entity.model) {
        // Set up the model with clean boundary edge highlighting
        entity.model.silhouetteColor = new Cesium.Color(0.9, 0.9, 0.9, 1.0); // Bright grey color
        entity.model.silhouetteSize = 0.5; // Slightly thicker outline for better visibility
        
        // Configure the model's appearance
        entity.model.color = new Cesium.Color(1.0, 1.0, 1.0, 1.0);
        entity.model.colorBlendMode = Cesium.ColorBlendMode.DISABLED;
        
        // Enable primitive outline with clean boundary settings
        entity.model.silhouetteSizeByDistance = new Cesium.NearFarScalar(
            0.0,    // Near distance
            0.2,    // Near size
            2000.0, // Far distance
            0.1     // Far size (same as near for consistency)
        );
        
        // Configure the model's material for clean boundary edges
        entity.model.silhouetteAlpha = 1.0; // Full opacity for the outline
        entity.model.silhouetteOnly = true; // Show only the outline
        
        // Additional settings to reduce surface noise
        entity.model.silhouetteSize = 0.5;
        entity.model.silhouetteColor = new Cesium.Color(0.9, 0.9, 0.9, 1.0); // Bright grey color
        entity.model.silhouetteAlpha = 1.0;
        
        // Configure model for clean edge detection
        entity.model.silhouetteSize = 1.0;
        entity.model.silhouetteColor = new Cesium.Color(0.9, 0.9, 0.9, 1.0); // Bright grey color
        entity.model.silhouetteAlpha = 1.0;
        
        // Remove any custom post-processing stages
        if (entity.model.postProcessStages) {
            entity.model.postProcessStages.removeAll();
        }
    }
}

// Function to configure viewer for edge highlighting
export function configureViewerForEdgeHighlighting(viewer) {
    // Disable depth testing to ensure boundary edges are visible
    viewer.scene.globe.depthTestAgainstTerrain = false;
    
    // Disable shadows for cleaner boundary detection
    viewer.scene.globe.shadows = Cesium.ShadowMode.DISABLED;
    viewer.scene.globe.shadowMapSize = 4096;
    viewer.scene.globe.shadowMapSoftness = 0.1;
    
    // Disable lighting for better boundary visibility
    viewer.scene.globe.enableLighting = false;
    
    // Disable FXAA to prevent edge smearing
    viewer.scene.postProcessStages.fxaa.enabled = false;
    
    // Configure scene for clean edge rendering
    viewer.scene.globe.enableLighting = false;
    viewer.scene.globe.normalMap = false;
    viewer.scene.globe.atmosphereBrightnessShift = 0.0;
    viewer.scene.globe.atmosphereSaturationShift = 0.0;
    
    // Disable any post-processing that might affect edges
    viewer.scene.globe.ambientOcclusionOnly = false;
    viewer.scene.globe.ambientOcclusionRadius = 0.0;
    viewer.scene.globe.ambientOcclusionIntensity = 0.0;
} 