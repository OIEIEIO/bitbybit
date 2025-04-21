
import * as BABYLON from "@babylonjs/core";
import * as Inputs from "../inputs";
import { BabylonNode } from "./babylon/node";
import { Tag, DrawCore } from "@bitbybit-dev/core";
import { Context } from "../context";
import { GridMaterial } from "@babylonjs/materials";
import { DrawHelper } from "../draw-helper";

export class Draw extends DrawCore {

    private defaultBasicOptions = new Inputs.Draw.DrawBasicGeometryOptions();
    private defaultPolylineOptions: Inputs.Draw.DrawBasicGeometryOptions = {
        ...new Inputs.Draw.DrawBasicGeometryOptions(),
        size: 2,
        colours: "#ff00ff",
    };
    private defaultNodeOptions: Inputs.Draw.DrawNodeOptions = {
        colorX: "#ff0000",
        colorY: "#00ff00",
        colorZ: "#0000ff",
        size: 2,
    };
    constructor(
        /**
         * @ignore true
         */
        public readonly drawHelper: DrawHelper,
        /**
         * @ignore true
         */
        public readonly node: BabylonNode,
        /**
         * @ignore true
         */
        public readonly tag: Tag,
        /**
         * @ignore true
         */
        public readonly context: Context,
    ) {
        super();
    }

    /**
     * Draws any kind of geometry and does not return anything
     * @param inputs Contains options and entities to be drawn
     * @group draw async
     * @shortname draw async void
     * @disposableOutput true
     * @drawable true
     */
    async drawAnyAsyncNoReturn(inputs: Inputs.Draw.DrawAny): Promise<void> {
        this.drawAnyAsync(inputs);
    }

    /**
     * Draws any kind of geometry and returns the babylon mesh
     * @param inputs Contains options and entities to be drawn
     * @returns BabylonJS Mesh Promise
     * @group draw async
     * @shortname draw async
     * @drawable true
     * @disposableOutput true
     */
    async drawAnyAsync(inputs: Inputs.Draw.DrawAny): Promise<BABYLON.Mesh> {
        const entity = inputs.entity;
        if (entity === undefined || (Array.isArray(entity) && entity.length === 0)) {
            return Promise.resolve(undefined);
        }
        // we start with async ones
        if (this.detectJscadMesh(entity)) {
            return this.handleJscadMesh(inputs);
        } else if (this.detectOcctShape(entity)) {
            return this.handleOcctShape(inputs);
        } else if (this.detectOcctShapes(entity)) {
            return this.handleOcctShapes(inputs);
        } else if (this.detectJscadMeshes(entity)) {
            return this.handleJscadMeshes(inputs);
        } else if (this.detectManifoldShape(entity)) {
            return this.handleManifoldShape(inputs);
        } else if (this.detectManifoldShapes(entity)) {
            return this.handleManifoldShapes(inputs);
        } else {
            // here we have all sync drawer functions
            return Promise.resolve(this.drawAny(inputs));
        }
    }

    private updateAny(inputs: Inputs.Draw.DrawAny): BABYLON.Mesh {
        let result;
        if (inputs.babylonMesh && inputs.babylonMesh.metadata) {

            const type = inputs.babylonMesh.metadata.type as Inputs.Draw.drawingTypes;
            switch (type) {
                case Inputs.Draw.drawingTypes.point:
                    result = this.handlePoint(inputs);
                    break;
                case Inputs.Draw.drawingTypes.points:
                    result = this.handlePoints(inputs);
                    break;
                case Inputs.Draw.drawingTypes.line:
                    result = this.handleLine(inputs);
                    break;
                case Inputs.Draw.drawingTypes.lines:
                    result = this.handleLines(inputs);
                    break;
                case Inputs.Draw.drawingTypes.polyline:
                    result = this.handlePolyline(inputs);
                    break;
                case Inputs.Draw.drawingTypes.polylines:
                    result = this.handlePolylines(inputs);
                    break;
                case Inputs.Draw.drawingTypes.verbCurve:
                    result = this.handleVerbCurve(inputs);
                    break;
                case Inputs.Draw.drawingTypes.verbCurves:
                    result = this.handleVerbCurves(inputs);
                    break;
                case Inputs.Draw.drawingTypes.verbSurface:
                    result = this.handleVerbSurface(inputs);
                    break;
                case Inputs.Draw.drawingTypes.verbSurfaces:
                    result = this.handleVerbSurfaces(inputs);
                    break;
                case Inputs.Draw.drawingTypes.tag:
                    result = this.handleTag(inputs);
                    break;
                case Inputs.Draw.drawingTypes.tags:
                    result = this.handleTags(inputs);
                    break;
                case Inputs.Draw.drawingTypes.node:
                    result = this.handleNode(inputs);
                    break;
                case Inputs.Draw.drawingTypes.nodes:
                    result = this.handleNodes(inputs);
                    break;
                default:
                    break;
            }
        }
        return result;
    }

    /**
     * Draws any kind of geometry that does not need asynchronous computing, thus it cant be used with shapes coming from occt or jscad
     * @param inputs Contains options and entities to be drawn
     * @returns BabylonJS Mesh
     * @group draw sync
     * @shortname draw sync void
     */
    drawAnyNoReturn(inputs: Inputs.Draw.DrawAny): void {
        this.drawAny(inputs);
    }

    /**
     * Draws any kind of geometry that does not need asynchronous computing, thus it cant be used with shapes coming from occt or jscad
     * @param inputs Contains options and entities to be drawn
     * @returns BabylonJS Mesh
     * @group draw sync
     * @shortname draw sync
     */
    drawAny(inputs: Inputs.Draw.DrawAny): BABYLON.Mesh {
        let result;
        const entity = inputs.entity;
        if (!inputs.babylonMesh) {
            if (this.detectLine(entity)) {
                result = this.handleLine(inputs);
            } else if (this.detectPoint(entity)) {
                result = this.handlePoint(inputs);
            } else if (this.detectPolyline(entity)) {
                result = this.handlePolyline(inputs);
            } else if (this.detectNode(entity)) {
                result = this.handleNode(inputs);
            } else if (this.detectVerbCurve(entity)) {
                result = this.handleVerbCurve(inputs);
            } else if (this.detectVerbSurface(entity)) {
                result = this.handleVerbSurface(inputs);
            } else if (this.detectPolylines(entity)) {
                result = this.handlePolylines(inputs);
            } else if (this.detectLines(entity)) {
                result = this.handleLines(inputs);
            } else if (this.detectPoints(entity)) {
                result = this.handlePoints(inputs);
            } else if (this.detectNodes(entity)) {
                result = this.handleNodes(inputs);
            } else if (this.detectVerbCurves(entity)) {
                result = this.handleVerbCurves(inputs);
            } else if (this.detectVerbSurfaces(entity)) {
                result = this.handleVerbSurfaces(inputs);
            } else if (this.detectTag(entity)) {
                result = this.handleTag(inputs);
            } else if (this.detectTags(entity)) {
                result = this.handleTags(inputs);
            }
        } else {
            // here types are marked on mesh metadata
            result = this.updateAny(inputs);
        }
        return result;
    }

    /**
     * Draws a grid mesh on the ground plane in 3D space. This helps to orient yourself in the world.
     * @param inputs Describes various parameters of the grid mesh like size, colour, etc.
     * @group grid
     * @shortname draw grid no return
     * @disposableOutput true
     */
    drawGridMeshNoReturn(inputs: Inputs.Draw.SceneDrawGridMeshDto): void {
        this.drawGridMesh(inputs);
    }

    /**
     * Draws a grid mesh on the ground plane in 3D space. This helps to orient yourself in the world.
     * @param inputs Describes various parameters of the grid mesh like size, colour, etc.
     * @returns grid mesh
     * @group grid
     * @shortname draw grid
     * @disposableOutput true
     */
    drawGridMesh(inputs: Inputs.Draw.SceneDrawGridMeshDto): BABYLON.Mesh {
        try {
            const groundMaterial = new GridMaterial(`groundMaterial${Math.random()}`, this.context.scene);
            groundMaterial.majorUnitFrequency = inputs.majorUnitFrequency;
            groundMaterial.minorUnitVisibility = inputs.minorUnitVisibility;
            groundMaterial.gridRatio = inputs.gridRatio;
            groundMaterial.backFaceCulling = inputs.backFaceCulling;
            groundMaterial.mainColor = BABYLON.Color3.FromHexString(inputs.mainColor);
            groundMaterial.lineColor = BABYLON.Color3.FromHexString(inputs.secondaryColor);
            groundMaterial.opacity = inputs.opacity;

            const ground = BABYLON.MeshBuilder.CreateGround(`bitbybit-ground${Math.random()}`,
                {
                    width: inputs.width,
                    height: inputs.height,
                    subdivisions: inputs.subdivisions,
                    updatable: false,

                },
                this.context.scene,
            );

            ground.material = groundMaterial;
            return ground;
        } catch (e) {
            console.log("Error happened: ", e);
            return new BABYLON.Mesh("error-ground", this.context.scene);
        }
    }

    /**
     * Creates draw options for basic geometry types like points, lines, polylines, surfaces and jscad meshes
     * @param inputs option definition
     * @returns options
     * @group options
     * @shortname simple
     */
    optionsSimple(inputs: Inputs.Draw.DrawBasicGeometryOptions): Inputs.Draw.DrawBasicGeometryOptions {
        return inputs;
    }

    /**
     * Creates draw options for occt shape geometry like edges, wires, faces, shells, solids and compounds
     * @param inputs option definition
     * @returns options
     * @group options
     * @shortname occt shape
     */
    optionsOcctShape(inputs: Inputs.Draw.DrawOcctShapeOptions): Inputs.Draw.DrawOcctShapeOptions {
        return inputs;
    }

    /**
     * Creates simple draw options for occt shape geometry
     * @param inputs option definition
     * @returns options
     * @group options
     * @shortname occt shape simple
     */
    optionsOcctShapeSimple(inputs: Inputs.Draw.DrawOcctShapeSimpleOptions): Inputs.Draw.DrawOcctShapeSimpleOptions {
        return inputs;
    }

    /**
     * Creates simple draw options with custom face material for occt shape geometry
     * @param inputs option definition
     * @returns options
     * @group options
     * @shortname occt shape with material
     */
    optionsOcctShapeMaterial(inputs: Inputs.Draw.DrawOcctShapeMaterialOptions): Inputs.Draw.DrawOcctShapeMaterialOptions {
        return inputs;
    }

    /**
     * Creates draw options for manifold gemetry
     * @param inputs option definition
     * @returns options
     * @group options
     * @shortname manifold shape draw options
     */
    optionsManifoldShapeMaterial(inputs: Inputs.Draw.DrawManifoldOrCrossSectionOptions): Inputs.Draw.DrawManifoldOrCrossSectionOptions {
        return inputs;
    }

    /**
     * Creates draw options for babylon js nodes
     * @param inputs option definition
     * @returns options
     * @group options
     * @shortname babylon node
     */
    optionsBabylonNode(inputs: Inputs.Draw.DrawNodeOptions): Inputs.Draw.DrawNodeOptions {
        return inputs;
    }

    private handleTags(inputs: Inputs.Draw.DrawAny) {
        const options = inputs.options ? inputs.options : {
            updatable: false,
        };
        // TODO look into this, seems like a bad idea to use babylon mesh for tag updates
        const result = this.tag.drawTags({
            tagsVariable: inputs.babylonMesh as any,
            tags: inputs.entity as Inputs.Tag.TagDto[],
            ...options as Inputs.Draw.DrawBasicGeometryOptions
        });

        (result as any).metadata = { type: Inputs.Draw.drawingTypes.tags, options } as any;
        return result;
    }

    private handleTag(inputs: Inputs.Draw.DrawAny) {
        let options = inputs.options ? inputs.options : {
            updatable: false,
        };
        if (!inputs.options && inputs.babylonMesh && inputs.babylonMesh.metadata.options) {
            options = inputs.babylonMesh.metadata.options;
        }
        const result = this.tag.drawTag({
            tagVariable: inputs.babylonMesh as any,
            tag: inputs.entity as Inputs.Tag.TagDto,
            ...options as Inputs.Draw.DrawBasicGeometryOptions
        });
        (result as any).metadata = { type: Inputs.Draw.drawingTypes.tag, options } as any;
        return result;
    }

    private handleVerbSurfaces(inputs: Inputs.Draw.DrawAny) {
        let options = inputs.options ? inputs.options : this.defaultBasicOptions;
        if (!inputs.options && inputs.babylonMesh && inputs.babylonMesh.metadata.options) {
            options = inputs.babylonMesh.metadata.options;
        }
        const result = this.drawHelper.drawSurfacesMultiColour({
            surfacesMesh: inputs.babylonMesh,
            surfaces: inputs.entity as Inputs.Base.VerbSurface[],
            ...options as Inputs.Draw.DrawBasicGeometryOptions
        });
        this.applyGlobalSettingsAndMetadataAndShadowCasting(Inputs.Draw.drawingTypes.verbSurfaces, options, result);
        return result;
    }

    private handleVerbCurves(inputs: Inputs.Draw.DrawAny) {
        let options = inputs.options ? inputs.options : this.defaultBasicOptions;

        if (!inputs.options && inputs.babylonMesh && inputs.babylonMesh.metadata.options) {
            options = inputs.babylonMesh.metadata.options;
        }
        const result = this.drawHelper.drawCurves({
            curvesMesh: inputs.babylonMesh as BABYLON.GreasedLineMesh,
            curves: inputs.entity as Inputs.Base.VerbCurve[],
            ...options as Inputs.Draw.DrawBasicGeometryOptions
        });

        this.applyGlobalSettingsAndMetadataAndShadowCasting(Inputs.Draw.drawingTypes.verbCurves, options, result);
        return result;
    }

    private handleNodes(inputs: Inputs.Draw.DrawAny) {
        let options = inputs.options ? inputs.options : this.defaultNodeOptions;
        if (!inputs.options && inputs.babylonMesh && inputs.babylonMesh.metadata.options) {
            options = inputs.babylonMesh.metadata.options;
        }
        const result = inputs.entity;
        this.node.drawNodes({
            nodes: inputs.entity as any,
            ...options as Inputs.Draw.DrawNodeOptions
        });
        this.applyGlobalSettingsAndMetadataAndShadowCasting(Inputs.Draw.drawingTypes.nodes, options, result as any);
        return result;
    }

    private handlePoints(inputs: Inputs.Draw.DrawAny) {
        let options = inputs.options ? inputs.options : this.defaultBasicOptions;
        if (!inputs.options && inputs.babylonMesh && inputs.babylonMesh.metadata.options) {
            options = inputs.babylonMesh.metadata.options;
        }
        const result = this.drawHelper.drawPoints({
            pointsMesh: inputs.babylonMesh,
            points: inputs.entity as Inputs.Base.Point3[],
            ...options as Inputs.Draw.DrawBasicGeometryOptions
        });
        this.applyGlobalSettingsAndMetadataAndShadowCasting(Inputs.Draw.drawingTypes.points, options, result);
        return result;
    }

    private handleLines(inputs: Inputs.Draw.DrawAny) {
        let options = inputs.options ? inputs.options : this.defaultPolylineOptions;
        if (!inputs.options && inputs.babylonMesh && inputs.babylonMesh.metadata.options) {
            options = inputs.babylonMesh.metadata.options;
        }
        const lines = inputs.entity as Inputs.Base.Line3[];
        const result = this.drawHelper.drawPolylinesWithColours({
            polylinesMesh: inputs.babylonMesh as BABYLON.GreasedLineMesh,
            polylines: lines.map(e => ({ points: [e.start, e.end] })),
            ...options as Inputs.Draw.DrawBasicGeometryOptions
        });
        this.applyGlobalSettingsAndMetadataAndShadowCasting(Inputs.Draw.drawingTypes.lines, options, result);
        return result;
    }

    private handlePolylines(inputs: Inputs.Draw.DrawAny) {
        let options = inputs.options ? inputs.options : this.defaultPolylineOptions;
        if (!inputs.options && inputs.babylonMesh && inputs.babylonMesh.metadata.options) {
            options = inputs.babylonMesh.metadata.options;
        }
        const result = this.drawHelper.drawPolylinesWithColours({
            polylinesMesh: inputs.babylonMesh as BABYLON.GreasedLineMesh,
            polylines: inputs.entity as Inputs.Base.Polyline3[],
            ...options as Inputs.Draw.DrawBasicGeometryOptions
        });
        this.applyGlobalSettingsAndMetadataAndShadowCasting(Inputs.Draw.drawingTypes.polylines, options, result);
        return result;
    }

    private handleVerbSurface(inputs: Inputs.Draw.DrawAny) {
        let options = inputs.options ? inputs.options : this.defaultBasicOptions;
        if (!inputs.options && inputs.babylonMesh && inputs.babylonMesh.metadata.options) {
            options = inputs.babylonMesh.metadata.options;
        }
        const result = this.drawHelper.drawSurface({
            surfaceMesh: inputs.babylonMesh,
            surface: inputs.entity,
            ...options as Inputs.Draw.DrawBasicGeometryOptions
        });
        this.applyGlobalSettingsAndMetadataAndShadowCasting(Inputs.Draw.drawingTypes.verbSurface, options, result);
        return result;
    }

    private handleVerbCurve(inputs: Inputs.Draw.DrawAny) {
        let options = inputs.options ? inputs.options : this.defaultPolylineOptions;
        if (!inputs.options && inputs.babylonMesh && inputs.babylonMesh.metadata.options) {
            options = inputs.babylonMesh.metadata.options;
        }
        const result = this.drawHelper.drawCurve({
            curveMesh: inputs.babylonMesh as BABYLON.GreasedLineMesh,
            curve: inputs.entity,
            ...options as Inputs.Draw.DrawBasicGeometryOptions
        });
        this.applyGlobalSettingsAndMetadataAndShadowCasting(Inputs.Draw.drawingTypes.verbCurve, options, result);
        return result;
    }

    private handleNode(inputs: Inputs.Draw.DrawAny) {
        let options = inputs.options ? inputs.options : this.defaultNodeOptions;
        if (!inputs.options && inputs.babylonMesh && inputs.babylonMesh.metadata.options) {
            options = inputs.babylonMesh.metadata.options;
        }
        const result = inputs.entity;
        this.node.drawNode({
            node: inputs.entity as any,
            ...options as Inputs.Draw.DrawNodeOptions
        });
        this.applyGlobalSettingsAndMetadataAndShadowCasting(Inputs.Draw.drawingTypes.node, options, result as any);
        return result;
    }

    private handlePolyline(inputs: Inputs.Draw.DrawAny) {
        let options = inputs.options ? inputs.options : this.defaultPolylineOptions;
        if (!inputs.options && inputs.babylonMesh && inputs.babylonMesh.metadata.options) {
            options = inputs.babylonMesh.metadata.options;
        }
        const result = this.drawHelper.drawPolylineClose({
            polylineMesh: inputs.babylonMesh as BABYLON.GreasedLineMesh,
            polyline: inputs.entity as Inputs.Base.Polyline3,
            ...options as Inputs.Draw.DrawBasicGeometryOptions
        });
        this.applyGlobalSettingsAndMetadataAndShadowCasting(Inputs.Draw.drawingTypes.polyline, options, result);
        return result;
    }

    private handlePoint(inputs: Inputs.Draw.DrawAny) {
        let options = inputs.options ? inputs.options : this.defaultBasicOptions;
        if (!inputs.options && inputs.babylonMesh && inputs.babylonMesh.metadata.options) {
            options = inputs.babylonMesh.metadata.options;
        }
        const result = this.drawHelper.drawPoint({
            pointMesh: inputs.babylonMesh,
            point: inputs.entity as Inputs.Base.Point3,
            ...options as Inputs.Draw.DrawBasicGeometryOptions
        });
        this.applyGlobalSettingsAndMetadataAndShadowCasting(Inputs.Draw.drawingTypes.point, options, result);
        return result;
    }

    private handleLine(inputs: Inputs.Draw.DrawAny) {
        let options = inputs.options ? inputs.options : this.defaultPolylineOptions;
        if (!inputs.options && inputs.babylonMesh && inputs.babylonMesh.metadata.options) {
            options = inputs.babylonMesh.metadata.options;
        }
        const line = inputs.entity as Inputs.Base.Line3;
        const result = this.drawHelper.drawPolylinesWithColours({
            polylinesMesh: inputs.babylonMesh as BABYLON.GreasedLineMesh,
            polylines: [{ points: [line.start, line.end] }],
            ...options as Inputs.Draw.DrawBasicGeometryOptions
        });
        this.applyGlobalSettingsAndMetadataAndShadowCasting(Inputs.Draw.drawingTypes.line, options, result);
        return result;
    }

    private handleJscadMeshes(inputs: Inputs.Draw.DrawAny) {
        let options = inputs.options ? inputs.options : this.defaultPolylineOptions;
        if (!inputs.options && inputs.babylonMesh && inputs.babylonMesh.metadata.options) {
            options = inputs.babylonMesh.metadata.options;
        }
        return this.drawHelper.drawSolidOrPolygonMeshes({
            jscadMesh: inputs.babylonMesh,
            meshes: inputs.entity as any,
            ...options as Inputs.Draw.DrawBasicGeometryOptions
        }).then(r => {
            this.applyGlobalSettingsAndMetadataAndShadowCasting(Inputs.Draw.drawingTypes.jscadMeshes, options, r);
            return r;
        });
    }

    private handleManifoldShape(inputs: Inputs.Draw.DrawAny) {
        let options = inputs.options ? inputs.options : new Inputs.Manifold.DrawManifoldOrCrossSectionDto(inputs.entity);
        if (!inputs.options && inputs.babylonMesh && inputs.babylonMesh.metadata.options) {
            options = inputs.babylonMesh.metadata.options;
        }
        return this.drawHelper.drawManifoldOrCrossSection({
            manifoldOrCrossSection: inputs.entity as Inputs.Manifold.ManifoldPointer,
            ...new Inputs.Draw.DrawManifoldOrCrossSectionOptions(),
            ...options as Inputs.Draw.DrawManifoldOrCrossSectionOptions
        }).then(r => {
            this.applyGlobalSettingsAndMetadataAndShadowCasting(Inputs.Draw.drawingTypes.manifold, options, r);
            return r;
        });
    }

    private handleManifoldShapes(inputs: Inputs.Draw.DrawAny) {
        let options = inputs.options ? inputs.options : new Inputs.Manifold.DrawManifoldOrCrossSectionDto(inputs.entity);
        if (!inputs.options && inputs.babylonMesh && inputs.babylonMesh.metadata.options) {
            options = inputs.babylonMesh.metadata.options;
        }
        return this.drawHelper.drawManifoldsOrCrossSections({
            manifoldsOrCrossSections: inputs.entity as Inputs.Manifold.ManifoldPointer[],
            ...new Inputs.Manifold.DrawManifoldOrCrossSectionDto(),
            ...options as Inputs.Draw.DrawManifoldOrCrossSectionOptions
        }).then(r => {
            this.applyGlobalSettingsAndMetadataAndShadowCasting(Inputs.Draw.drawingTypes.manifold, options, r);
            return r;
        });
    }

    private handleOcctShape(inputs: Inputs.Draw.DrawAny) {
        let options = inputs.options ? inputs.options : new Inputs.OCCT.DrawShapeDto(inputs.entity);
        if (!inputs.options && inputs.babylonMesh && inputs.babylonMesh.metadata.options) {
            options = inputs.babylonMesh.metadata.options;
        }
        return this.drawHelper.drawShape({
            shape: inputs.entity as Inputs.OCCT.TopoDSShapePointer,
            ...new Inputs.Draw.DrawOcctShapeOptions(),
            ...options as Inputs.Draw.DrawOcctShapeOptions
        }).then(r => {
            this.applyGlobalSettingsAndMetadataAndShadowCasting(Inputs.Draw.drawingTypes.occt, options, r);
            return r;
        });
    }

    private handleOcctShapes(inputs: Inputs.Draw.DrawAny) {
        let options = inputs.options ? inputs.options : new Inputs.OCCT.DrawShapeDto(inputs.entity);
        if (!inputs.options && inputs.babylonMesh && inputs.babylonMesh.metadata.options) {
            options = inputs.babylonMesh.metadata.options;
        }
        return this.drawHelper.drawShapes({
            shapes: inputs.entity as Inputs.OCCT.TopoDSShapePointer[],
            ...new Inputs.Draw.DrawOcctShapeOptions(),
            ...options as Inputs.Draw.DrawOcctShapeOptions
        }).then(r => {
            this.applyGlobalSettingsAndMetadataAndShadowCasting(Inputs.Draw.drawingTypes.occt, options, r);
            return r;
        });
    }

    private handleJscadMesh(inputs: Inputs.Draw.DrawAny) {
        let options = inputs.options ? inputs.options : this.defaultBasicOptions;
        if (!inputs.options && inputs.babylonMesh && inputs.babylonMesh.metadata.options) {
            options = inputs.babylonMesh.metadata.options;
        }
        return this.drawHelper.drawSolidOrPolygonMesh({
            jscadMesh: inputs.babylonMesh,
            mesh: inputs.entity,
            ...options as Inputs.Draw.DrawBasicGeometryOptions
        }).then(r => {
            this.applyGlobalSettingsAndMetadataAndShadowCasting(Inputs.Draw.drawingTypes.jscadMesh, options, r);
            return r;
        });
    }

    private applyGlobalSettingsAndMetadataAndShadowCasting(type: Inputs.Draw.drawingTypes, options: Inputs.Draw.DrawOptions, result: BABYLON.Mesh | undefined) {
        if (result) {
            const typemeta = { type, options };
            const sgs = this.context.scene.metadata.shadowGenerators as BABYLON.ShadowGenerator[];

            result.isPickable = false;
            result.getChildMeshes().forEach(m => { m.isPickable = false; });

            let shadowsEnabled = true;
            if (result.metadata && result.metadata.shadows === false) {
                shadowsEnabled = false;
            }
            if (shadowsEnabled) {
                if (sgs.length > 0) {
                    result.receiveShadows = true;
                    sgs.forEach(sg => sg.addShadowCaster(result));
                    result.getChildMeshes().forEach(m => {
                        m.receiveShadows = true;
                        sgs.forEach(sg => sg.addShadowCaster(m));
                    });
                }
            }
            result.metadata = result.metadata ? { ...result.metadata, ...typemeta } : typemeta;
        }
    }

}
