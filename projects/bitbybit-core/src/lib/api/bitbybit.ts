import { Injectable } from '@angular/core';
import { Scene } from './bitbybit/scene';
import { Transforms } from './bitbybit/transforms';
import { Vector } from './bitbybit/vector';
import { Node } from './bitbybit/node';
import { Point } from './bitbybit/point';
import { Line } from './bitbybit/line';
import { Polyline } from './bitbybit/polyline';
import { Curve } from './bitbybit/curve';
import { Surface } from './bitbybit/surface';
import { JSCAD } from './bitbybit/jscad';
import { Intersect } from './bitbybit/intersect';
import { Tag } from './bitbybit/tag';
import { Time } from './bitbybit/time';
import { OCC } from './bitbybit/occ/occ';

@Injectable()
export class BitByBitBase {
    constructor(
        public readonly scene: Scene,
        public readonly transforms: Transforms,
        public readonly vector: Vector,
        public readonly node: Node,
        public readonly point: Point,
        public readonly line: Line,
        public readonly polyline: Polyline,
        public readonly curve: Curve,
        public readonly surface: Surface,
        public readonly jscad: JSCAD,
        public readonly intersect: Intersect,
        public readonly tag: Tag,
        public readonly time: Time,
        public readonly occ: OCC,
    ) {
    }
}