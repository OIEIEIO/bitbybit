import { simplifyDeclaration } from './simplify-declaration';

export const jscadHullsString = simplifyDeclaration(`
import { Context } from '../context';
import * as Inputs from '../inputs/inputs';
/**
 * Contains various functions for Solid hulls from JSCAD library http://openjscad.org
 * Thanks JSCAD community for developing this kernel
 */
export declare class JSCADHulls {
    private readonly context;
    constructor(context: Context);
    /**
     * Hull chain connects solids or 2d geometries by filling an empty space in between objects in order.
     * Geometries need to be of the same type.
     * <div>
     *  <img src="../assets/images/blockly-images/jscad/hulls/chainHull.svg" alt="Blockly Image"/>
     * </div>
     * @link https://docs.bitbybit.dev/classes/bitbybit_jscad_hulls.jscadhulls.html#chainhull
     * @param inputs Geometries
     * @returns Chain hulled geometry
     */
    hullChain(inputs: Inputs.JSCAD.HullDto): any | any[];
    /**
     * Convex hull connects solids or 2d geometries by filling an empty space in between without following order.
     * Geometries need to be of the same type.
     * <div>
     *  <img src="../assets/images/blockly-images/jscad/hulls/chainHull.svg" alt="Blockly Image"/>
     * </div>
     * @link https://docs.bitbybit.dev/classes/bitbybit_jscad_hulls.jscadhulls.html#chainhull
     * @param inputs Geometries
     * @returns Hulled geometry
     */
    hull(inputs: Inputs.JSCAD.HullDto): any | any[];
}

`);