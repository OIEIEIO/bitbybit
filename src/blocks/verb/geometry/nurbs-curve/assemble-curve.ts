import { createCurveByKnotsControlPointsWeightsBlock } from './curve-by-knots-control-points-weights';
import { createCurveByPointsBlock } from './curve-by-points';
import { createCurveDivideByArcLengthPointsBlock } from './curve-divide-by-arc-length-points';
import { createCurveDivideByEqualArcLengthPointsBlock } from './curve-divide-by-arc-equal-length-point';
import { createCurveDivideByArcLengthParamsBlock } from './curve-divide-by-arc-length-params';
import { createCurveDivideByEqualArcLengthParamsBlock } from './curve-divide-by-arc-equal-length-params';
import { createCurveClosestPointBlock } from './curve-closest-point';
import { createCurveClosestPointsBlock } from './curve-closest-points';
import { createCurveSplitBlock } from './curve-split';
import { createCurveClosestParamBlock } from './curve-closest-param';
import { createCurveClosestParamsBlock } from './curve-closest-params';
import { createCurveLengthBlock } from './curve-length';
import { createCurveLengthAtParamBlock } from './curve-length-at-param';
import { createCurveParamAtLengthBlock } from './curve-param-at-length';
import { createCurveDegreeBlock } from './curve-degree';
import { createCurveKnotsBlock } from './curve-knots';
import { createCurveControlPointsBlock } from './curve-control-points';
import { createCurveWeightsBlock } from './curve-weights';
import { createCurveCloneBlock } from './curve-clone';
import { createCurveDomainBlock } from './curve-domain';
import { createCurveTransformBlock } from './curve-transform';

export function assembleCurveBlocks() {
    createCurveByKnotsControlPointsWeightsBlock();
    createCurveByPointsBlock();
    createCurveDivideByArcLengthPointsBlock();
    createCurveDivideByEqualArcLengthPointsBlock();
    createCurveDivideByArcLengthParamsBlock();
    createCurveDivideByEqualArcLengthParamsBlock();
    createCurveClosestPointBlock();
    createCurveClosestPointsBlock();
    createCurveSplitBlock();
    createCurveClosestParamBlock();
    createCurveClosestParamsBlock();
    createCurveLengthBlock();
    createCurveLengthAtParamBlock();
    createCurveParamAtLengthBlock();
    createCurveDegreeBlock();
    createCurveKnotsBlock();
    createCurveControlPointsBlock();
    createCurveWeightsBlock();
    createCurveCloneBlock();
    createCurveDomainBlock();
    createCurveTransformBlock();
    
}