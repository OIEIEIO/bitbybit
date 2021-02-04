import { Mesh } from '@babylonjs/core';

// tslint:disable-next-line: no-namespace
export namespace Surface {
    export class SurfaceDto {
        /**
         * Nurbs surface
         */
        surface: any;
    }
    export class SurfaceTransformDto {
        /**
         * Nurbs surface
         */
        surface: any;
        /**
         * Transformations
         */
        matrix: number[][] | number[][][];
    }
    export class SurfaceParameterDto {
        /**
         * Nurbs surface
         */
        surface: any;
        /**
         * Parameter on the surface
         */
        parameter: number;
        /**
         * Default parameter is on U direction, use V to switch
         */
        useV: boolean;
    }
    export class IsocurvesParametersDto {
        /**
         * Nurbs surface
         */
        surface: any;
        /**
         * Parameter on the surface
         */
        parameters: number[];
        /**
         * Default parameter is on U direction, use V to switch
         */
        useV: boolean;
    }
    export class IsocurveSubdivisionDto {
        /**
         * Provide undefined options
         */
        constructor(surface?: any, isocurveSegments?: number) {
            this.surface = surface;
            this.isocurveSegments = isocurveSegments;
        }
        /**
         * Nurbs surface
         */
        surface: any;
        /**
         * Default parameter is on U direction, use V to switch
         */
        useV = false;
        /**
         * Check to include the last isocurve
         */
        includeLast = true;
        /**
         * Check to include the first isocurve
         */
        includeFirst = true;
        /**
         * Number of segments including surface start and end
         */
        isocurveSegments: number;
    }
    export class DerivativesDto {
        /**
         * Nurbs surface
         */
        surface: any;
        /**
         * U coordinate
         */
        u: number;
        /**
         * V coordinate
         */
        v: number;
        /**
         * Number of derivatives
         */
        numDerivatives: number;
    }
    export class SurfaceLocationDto {
        /**
         * Nurbs surface
         */
        surface: any;
        /**
         * U coordinate
         */
        u: number;
        /**
         * V coordinate
         */
        v: number;
    }
    export class CornersDto {
        /**
         * Corner 1
         */
        point1: number[];
        /**
         * Corner 2
         */
        point2: number[];
        /**
         * Corner 3
         */
        point3: number[];
        /**
         * Corner 4
         */
        point4: number[];
    }
    export class SurfaceParamDto {
        /**
         * Nurbs surface
         */
        surface: any;
        /**
         * Point
         */
        point: number[];
    }
    export class KnotsControlPointsWeightsDto {
        /**
         * U direction degree
         */
        degreeU: number;
        /**
         * V direction degree
         */
        degreeV: number;
        /**
         * U direction knots
         */
        knotsU: number[];
        /**
         * V direction knots
         */
        knotsV: number[];
        /**
         * Points
         */
        points: number[][];
        /**
         * Weights
         */
        weights: number[];
    }
    export class LoftCurvesDto {
        /**
         * V direction degree
         */
        degreeV: number;
        /**
         * Nurbs curves
         */
        curves: any[];
    }
    export class DrawSurfaceDto {
        /**
         * Provide options without default values
         */
        constructor(surface?: any) {
            this.surface = surface;
        }
        /**
         * Nurbs surface
         */
        surface: any;
        /**
         * Value between 0 and 1
         */
        opacity = 1;
        /**
         * Hex colour string
         */
        colour = '#444444';
        /**
         * Indicates wether the position of this surface will change in time
         */
        updatable = false;
        /**
         * Surface mesh variable in case it already exists and needs updating
         */
        surfaceMesh?: Mesh;
    }
    export class DrawSurfacesDto {
        /**
         * Provide options without default values
         */
        constructor(surfaces?: any[]) {
            this.surfaces = surfaces;
        }
        /**
         * Nurbs surfaces
         */
        surfaces: any[];
        /**
         * Value between 0 and 1
         */
        opacity = 1;
        /**
         * Hex colour string
         */
        colour = '#444444';
        /**
         * Indicates wether the position of these surfaces will change in time
         */
        updatable = false;
        /**
         * Surfaces mesh variable in case it already exists and needs updating
         */
        surfacesMesh?: Mesh;
    }
    export class DrawSurfacesColoursDto {
        /**
         * Provide options without default values
         */
        constructor(surfaces?: any[], colours?: string[]) {
            this.surfaces = surfaces;
            this.colours = colours;
        }
        /**
         * Nurbs surfaces
         */
        surfaces: any[];
        /**
         * Value between 0 and 1
         */
        opacity = 1;
        /**
         * Hex colour strings, there has to be a colour for every single surface and lengths of arrays need to match
         */
        colours: string[];
        /**
         * Indicates wether the position of these surfaces will change in time
         */
        updatable = false;
        /**
         * Surfaces mesh variable in case it already exists and needs updating
         */
        surfacesMesh?: Mesh;
    }
    export class ConeAndCylinderParametersDto {
        /**
         * Defines main axis of the cone
         */
        axis = [0, 1, 0];
        /**
         * X axis of the cone
         */
        xAxis = [1, 0, 0];
        /**
         * Base point for the cone
         */
        base = [0, 0, 0];
        /**
         * Height of the cone
         */
        height = 2;
        /**
         * Radius of the cone
         */
        radius = 1;
    }
    export class ConeDto {
        /**
         * Conical Nurbs surface
         */
        cone: any;
    }
    export class CylinderDto {
        /**
         * Cylindrical Nurbs surface
         */
        cylinder: any;
    }
    export class ExtrusionParametersDto {
        /**
         * Profile Nurbs curve
         */
        profile: any;
        /**
         * Direction vector
         */
        direction: number[];
    }
    export class ExtrusionDto {
        /**
         * Nurbs surface created through extrusion
         */
        extrusion: any;
    }
    export class SphericalParametersDto {
        /**
         * Radius of the sphere
         */
        radius: any;
        /**
         * Center point
         */
        center: number[];
    }
    export class SphereDto {
        /**
         * Spherical Nurbs surface
         */
        sphere: any;
    }
    export class RevolutionParametersDto {
        /**
         * Profile Nurbs curve
         */
        profile: any;
        /**
         * Center point
         */
        center: number[];
        /**
         * Axis around which rotation will happen
         */
        axis: number[];
        /**
         * Angle at which to rotate in degrees
         */
        angle: number;
    }
    export class RevolutionDto {
        /**
         * Revolved Nurbs surface
         */
        revolution: any;
    }
    export class SweepParametersDto {
        /**
         * Profile Nurbs curve
         */
        profile: any;
        /**
         * Rail Nurbs curve
         */
        rail: any;
    }
    export class SweepDto {
        /**
         * Revolved Nurbs surface
         */
        sweep: any;
    }
}