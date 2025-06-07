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
        shadows: false,
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
    viewer.scene.globe.shadows = Cesium.ShadowMode.DISABLED; // Disable terrain shadows
    viewer.scene.globe.terrainExaggeration = 12.0;
    viewer.scene.globe.terrainExaggerationRelativeHeight = 0.0;

    // Angled lighting setup for better curve visualization
    const noonLight = new Cesium.DirectionalLight({
        direction: new Cesium.Cartesian3(0.3, 0.3, -0.9),
        intensity: 3.0 // Increased for stronger shadows
    });
    viewer.scene.light = noonLight;
    viewer.scene.globe.ambientOcclusionOnly = true;
    viewer.scene.globe.ambientOcclusionRadius = 1.0; // Reduced for more concentrated shadows
    viewer.scene.globe.ambientOcclusionIntensity = 0.2; // Increased for less transparent shadows

    // Enhanced shadow settings for curve definition
    viewer.scene.globe.enableSoftShadows = true;
    viewer.scene.globe.shadowMapSoftness = 1.0; // Increased for softer shadows
    viewer.scene.globe.shadowMapBias = 0.001; // Small bias to prevent shadow acne
    viewer.scene.globe.shadowMapSize = 4096; // Increased for better quality
    

    // Enhanced curve visualization settings
    viewer.scene.globe.baseColor = new Cesium.Color(0.1, 0.1, 0.1, 1.0); // Darker base color
    viewer.scene.globe.depthTestAgainstTerrain = true;
    viewer.scene.globe.atmosphereBrightnessShift = 0.1; // Reduced for darker shadows
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