import { createClearAllDrawnBlock } from './clear-all-drawn';
import { createDrawCurveBlock } from './draw-curve';
import { createDrawCurvesBlock } from './draw-curves';
import { createDrawGridBlock } from './draw-grid';
import { createDrawLineBlock } from './draw-line';
import { createDrawLinesBlock } from './draw-lines';
import { createDrawPointBlock } from './draw-point';
import { createDrawPointsBlock } from './draw-points';
import { createDrawPolylineBlock } from './draw-polyline';
import { createDrawPolylinesBlock } from './draw-polylines';
import { createDrawSurfaceBlock } from './draw-surface';
import { createDrawSurfacesBlock } from './draw-surfaces';
import { createDrawSurfacesColoursBlock } from './draw-surfaces-colours';
import { createDrawCsgMeshBlock } from './draw-csg-mesh';
import { createDrawCsgMeshesBlock } from './draw-csg-meshes';
import { createDrawNodeBlock } from './draw-node';
import { createDrawNodesBlock } from './draw-nodes';
import { createDraw2dPathBlock } from './draw-2d-path';

export function assembleDrawBlocks(): void{
    createDrawPointBlock();
    createDrawPointsBlock();
    createDrawGridBlock();
    createDrawLineBlock();
    createDrawLinesBlock();
    createDrawPolylineBlock();
    createDraw2dPathBlock();
    createDrawCurveBlock();
    createDrawCurvesBlock();
    createDrawSurfaceBlock();
    createDrawSurfacesBlock();
    createDrawSurfacesColoursBlock();
    createClearAllDrawnBlock();
    createDrawPolylinesBlock();
    createDrawCsgMeshBlock();
    createDrawCsgMeshesBlock();
    createDrawNodeBlock();
    createDrawNodesBlock();
}