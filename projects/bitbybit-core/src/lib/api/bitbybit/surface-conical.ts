import { Injectable } from '@angular/core';
import { Context } from '../context';
import * as Inputs from '../inputs/inputs';

/**
 * Conical surface functions.
 * These functions wrap around Verbnurbs library that you can find here http://verbnurbs.com/.
 * Thanks Peter Boyer for his work.
 */
@Injectable()
export class SurfaceConical {

    constructor(private readonly context: Context) { }

    /**
     * Creates the conical Nurbs surface
     * <div>
     *  <img src="../assets/images/blockly-images/surface/conical/create.svg" alt="Blockly Image"/>
     * </div>
     * @link https://docs.bitbybit.dev/classes/bitbybit_surface_conical.surfaceconical.html#create
     * @param inputs Parameters for Nurbs conical surface
     * @returns Conical Nurbs surface
     */
    create(inputs: Inputs.Surface.ConeAndCylinderParametersDto): any {
        return new this.context.verb.geom.ConicalSurface(inputs.axis, inputs.xAxis, inputs.base, inputs.height, inputs.radius);
    }

    /**
     * Get cone axis
     * <div>
     *  <img src="../assets/images/blockly-images/surface/conical/axis.svg" alt="Blockly Image"/>
     * </div>
     * @link https://docs.bitbybit.dev/classes/bitbybit_surface_conical.surfaceconical.html#axis
     * @param inputs Nurbs conical surface
     * @returns Axis vector
     */
    axis(inputs: Inputs.Surface.ConeDto): number[] {
        return inputs.cone.axis();
    }

    /**
     * Get cone base
     * <div>
     *  <img src="../assets/images/blockly-images/surface/conical/base.svg" alt="Blockly Image"/>
     * </div>
     * @link https://docs.bitbybit.dev/classes/bitbybit_surface_conical.surfaceconical.html#base
     * @param inputs Nurbs conical surface
     * @returns Base point
     */
    base(inputs: Inputs.Surface.ConeDto): number[] {
        return inputs.cone.base();
    }

    /**
     * Get cone height
     * <div>
     *  <img src="../assets/images/blockly-images/surface/conical/height.svg" alt="Blockly Image"/>
     * </div>
     * @link https://docs.bitbybit.dev/classes/bitbybit_surface_conical.surfaceconical.html#height
     * @param inputs Nurbs conical surface
     * @returns Height
     */
    height(inputs: Inputs.Surface.ConeDto): number {
        return inputs.cone.height();
    }

    /**
     * Get cone radius
     * <div>
     *  <img src="../assets/images/blockly-images/surface/conical/radius.svg" alt="Blockly Image"/>
     * </div>
     * @link https://docs.bitbybit.dev/classes/bitbybit_surface_conical.surfaceconical.html#radius
     * @param inputs Nurbs conical surface
     * @returns Radius
     */
    radius(inputs: Inputs.Surface.ConeDto): number {
        return inputs.cone.radius();
    }
    /**
     * Get cone x axis
     * <div>
     *  <img src="../assets/images/blockly-images/surface/conical/xAxis.svg" alt="Blockly Image"/>
     * </div>
     * @link https://docs.bitbybit.dev/classes/bitbybit_surface_conical.surfaceconical.html#xaxis
     * @param inputs Nurbs conical surface
     * @returns X axis vector
     */
    xAxis(inputs: Inputs.Surface.ConeDto): number[] {
        return inputs.cone.xaxis();
    }
}