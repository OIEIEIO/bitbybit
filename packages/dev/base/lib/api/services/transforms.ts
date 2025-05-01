
import { Base } from "../inputs/base-inputs";
import * as Inputs from "../inputs";
import { MathBitByBit } from "./math";
import { Vector } from "./vector";

/**
 * Transformations help to move, scale, rotate objects. You can combine multiple transformations
 * for object to be placed exactly into position and orientation that you want.
 * Contains various methods for transformations that represent 4x4 matrixes in flat 16 number arrays.
 */
export class Transforms {

    constructor(private readonly vector: Vector, private readonly math: MathBitByBit) { }

    /**
     * Creates a rotation transformations around the center and an axis
     * @param inputs Rotation around center with an axis information
     * @returns array of transformations
     * @group rotation
     * @shortname center axis
     * @drawable false
     */
    rotationCenterAxis(inputs: Inputs.Transforms.RotationCenterAxisDto): Base.TransformMatrixes {
        return [
            this.translation(-inputs.center[0], -inputs.center[1], -inputs.center[2]),
            this.rotationAxis(
                inputs.axis,
                this.math.degToRad({ number: inputs.angle })
            ),
            this.translation(inputs.center[0], inputs.center[1], inputs.center[2]),
        ] as Base.TransformMatrixes;
    }

    /**
     * Creates a rotation transformations around the center and an X axis
     * @param inputs Rotation around center with an X axis information
     * @returns array of transformations
     * @group rotation
     * @shortname center x
     * @drawable false
     */
    rotationCenterX(inputs: Inputs.Transforms.RotationCenterDto): Base.TransformMatrixes {
        return [
            this.translation(-inputs.center[0], -inputs.center[1], -inputs.center[2]),
            this.rotationX(this.math.degToRad({ number: inputs.angle })),
            this.translation(inputs.center[0], inputs.center[1], inputs.center[2]),
        ] as Base.TransformMatrixes;
    }

    /**
     * Creates a rotation transformations around the center and an Y axis
     * @param inputs Rotation around center with an Y axis information
     * @returns array of transformations
     * @group rotation
     * @shortname center y
     * @drawable false
     */
    rotationCenterY(inputs: Inputs.Transforms.RotationCenterDto): Base.TransformMatrixes {
        return [
            this.translation(-inputs.center[0], -inputs.center[1], -inputs.center[2]),
            this.rotationY(this.math.degToRad({ number: inputs.angle })),
            this.translation(inputs.center[0], inputs.center[1], inputs.center[2]),
        ] as Base.TransformMatrixes;
    }

    /**
     * Creates a rotation transformations around the center and an Z axis
     * @param inputs Rotation around center with an Z axis information
     * @returns array of transformations
     * @group rotation
     * @shortname center z
     * @drawable false
     */
    rotationCenterZ(inputs: Inputs.Transforms.RotationCenterDto): Base.TransformMatrixes {
        return [
            this.translation(-inputs.center[0], -inputs.center[1], -inputs.center[2]),
            this.rotationZ(this.math.degToRad({ number: inputs.angle })),
            this.translation(inputs.center[0], inputs.center[1], inputs.center[2]),
        ] as Base.TransformMatrixes;
    }

    /**
     * Creates a rotation transformations with yaw pitch and roll
     * @param inputs Yaw pitch roll rotation information
     * @returns array of transformations
     * @group rotation
     * @shortname yaw pitch roll
     * @drawable false
     */
    rotationCenterYawPitchRoll(inputs: Inputs.Transforms.RotationCenterYawPitchRollDto): Base.TransformMatrixes {
        return [
            this.translation(-inputs.center[0], -inputs.center[1], -inputs.center[2]),
            this.rotationYawPitchRoll(
                this.math.degToRad({ number: inputs.yaw }),
                this.math.degToRad({ number: inputs.pitch }),
                this.math.degToRad({ number: inputs.roll })),
            this.translation(inputs.center[0], inputs.center[1], inputs.center[2]),
        ] as Base.TransformMatrixes;
    }

    /**
     * Scale transformation around center and xyz directions
     * @param inputs Scale center xyz trnansformation
     * @returns array of transformations
     * @group rotation
     * @shortname center xyz
     * @drawable false
     */
    scaleCenterXYZ(inputs: Inputs.Transforms.ScaleCenterXYZDto): Base.TransformMatrixes {
        return [
            this.translation(-inputs.center[0], -inputs.center[1], -inputs.center[2]),
            this.scaling(inputs.scaleXyz[0], inputs.scaleXyz[1], inputs.scaleXyz[2]),
            this.translation(inputs.center[0], inputs.center[1], inputs.center[2]),
        ] as Base.TransformMatrixes;
    }

    /**
     * Creates the scale transformation in x, y and z directions
     * @param inputs Scale XYZ number array information
     * @returns transformation
     * @group scale
     * @shortname xyz
     * @drawable false
     */
    scaleXYZ(inputs: Inputs.Transforms.ScaleXYZDto): Base.TransformMatrixes {
        return [this.scaling(inputs.scaleXyz[0], inputs.scaleXyz[1], inputs.scaleXyz[2])] as Base.TransformMatrixes;
    }

    /**
     * Creates a stretch transformation along a specific direction, relative to a center point.
     * This scales points along the given direction vector while leaving points in the
     * plane perpendicular to the direction (passing through the center) unchanged.
     * @param inputs Defines the center, direction, and scale factor for the stretch.
     * @returns Array of transformations: [Translate To Origin, Stretch, Translate Back].
     * @group scale
     * @shortname stretch dir center
     * @drawable false
     */
    stretchDirFromCenter(inputs: Inputs.Transforms.StretchDirCenterDto): Base.TransformMatrixes {
        return [
            this.translation(-inputs.center[0], -inputs.center[1], -inputs.center[2]),
            this.stretchDirection(inputs.direction, inputs.scale),
            this.translation(inputs.center[0], inputs.center[1], inputs.center[2]),
        ] as Base.TransformMatrixes;
    }

    /**
     * Creates uniform scale transformation
     * @param inputs Scale Dto
     * @returns transformation
     * @group scale
     * @shortname uniform
     * @drawable false
     */
    uniformScale(inputs: Inputs.Transforms.UniformScaleDto): Base.TransformMatrixes {
        return [this.scaling(inputs.scale, inputs.scale, inputs.scale)] as Base.TransformMatrixes;
    }

    /**
     * Creates uniform scale transformation from the center
     * @param inputs Scale Dto with center point information
     * @returns array of transformations
     * @group scale
     * @shortname uniform from center
     * @drawable false
     */
    uniformScaleFromCenter(inputs: Inputs.Transforms.UniformScaleFromCenterDto): Base.TransformMatrixes {
        return [
            this.translation(-inputs.center[0], -inputs.center[1], -inputs.center[2]),
            this.scaling(inputs.scale, inputs.scale, inputs.scale),
            this.translation(inputs.center[0], inputs.center[1], inputs.center[2]),
        ] as Base.TransformMatrixes;
    }

    /**
     * Creates the translation transformation
     * @param inputs Translation information
     * @returns transformation
     * @group translation
     * @shortname xyz
     * @drawable false
     */
    translationXYZ(inputs: Inputs.Transforms.TranslationXYZDto): Base.TransformMatrixes {
        return [this.translation(inputs.translation[0], inputs.translation[1], inputs.translation[2])] as Base.TransformMatrixes;
    }

    /**
    * Creates the translation transformation
    * @param inputs Translation information
    * @returns transformation
     * @group translations
     * @shortname xyz
     * @drawable false
    */
    translationsXYZ(inputs: Inputs.Transforms.TranslationsXYZDto): Base.TransformMatrixes[] {
        return inputs.translations.map(translation => [this.translation(translation[0], translation[1], translation[2])]) as Base.TransformMatrixes[];
    }

    /**
     * Creates the identity transformation
     * @returns transformation
     * @group identity
     * @shortname identity
     * @drawable false
     */
    identity(): Base.TransformMatrix {
        return [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0];
    }

    private translation(x: number, y: number, z: number) {
        return [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, x, y, z, 1.0];
    }

    private scaling(x: number, y: number, z: number) {
        return [x, 0.0, 0.0, 0.0, 0.0, y, 0.0, 0.0, 0.0, 0.0, z, 0.0, 0.0, 0.0, 0.0, 1.0];
    }


    private rotationAxis(axis: Base.Vector3, angle: number) {
        const s = Math.sin(-angle);
        const c = Math.cos(-angle);
        const c1 = 1 - c;

        const a = this.vector.normalized({ vector: axis });

        const x = a[0];
        const y = a[1];
        const z = a[2];

        const m = this.identity();

        m[0] = x * x * c1 + c;
        m[1] = x * y * c1 - z * s;
        m[2] = x * z * c1 + y * s;
        m[3] = 0.0;

        m[4] = y * x * c1 + z * s;
        m[5] = y * y * c1 + c;
        m[6] = y * z * c1 - x * s;
        m[7] = 0.0;

        m[8] = z * x * c1 - y * s;
        m[9] = z * y * c1 + x * s;
        m[10] = z * z * c1 + c;
        m[11] = 0.0;

        m[12] = 0.0;
        m[13] = 0.0;
        m[14] = 0.0;
        m[15] = 1.0;

        return m;
    }

    private rotationX(angle: number) {
        const s = Math.sin(angle);
        const c = Math.cos(angle);
        return [1.0, 0.0, 0.0, 0.0, 0.0, c, s, 0.0, 0.0, -s, c, 0.0, 0.0, 0.0, 0.0, 1.0];
    }

    private rotationY(angle: number) {
        const s = Math.sin(angle);
        const c = Math.cos(angle);
        return [c, 0.0, -s, 0.0, 0.0, 1.0, 0.0, 0.0, s, 0.0, c, 0.0, 0.0, 0.0, 0.0, 1.0];
    }

    private rotationZ(angle: number) {
        const s = Math.sin(angle);
        const c = Math.cos(angle);
        return [c, s, 0.0, 0.0, -s, c, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0];
    }

    private rotationYawPitchRoll(yaw: number, pitch: number, roll: number) {
        const halfRoll = roll * 0.5;
        const halfPitch = pitch * 0.5;
        const halfYaw = yaw * 0.5;

        const sinRoll = Math.sin(halfRoll);
        const cosRoll = Math.cos(halfRoll);
        const sinPitch = Math.sin(halfPitch);
        const cosPitch = Math.cos(halfPitch);
        const sinYaw = Math.sin(halfYaw);
        const cosYaw = Math.cos(halfYaw);

        const x = cosYaw * sinPitch * cosRoll + sinYaw * cosPitch * sinRoll;
        const y = sinYaw * cosPitch * cosRoll - cosYaw * sinPitch * sinRoll;
        const z = cosYaw * cosPitch * sinRoll - sinYaw * sinPitch * cosRoll;
        const w = cosYaw * cosPitch * cosRoll + sinYaw * sinPitch * sinRoll;

        return this.rotationMatrixFromQuat(x, y, z, w);
    }

    private rotationMatrixFromQuat(x: number, y: number, z: number, w: number) {
        const xx = x * x;
        const yy = y * y;
        const zz = z * z;
        const xy = x * y;
        const zw = z * w;
        const zx = z * x;
        const yw = y * w;
        const yz = y * z;
        const xw = x * w;

        const m = this.identity();

        m[0] = 1.0 - 2.0 * (yy + zz);
        m[1] = 2.0 * (xy + zw);
        m[2] = 2.0 * (zx - yw);
        m[3] = 0.0;

        m[4] = 2.0 * (xy - zw);
        m[5] = 1.0 - 2.0 * (zz + xx);
        m[6] = 2.0 * (yz + xw);
        m[7] = 0.0;

        m[8] = 2.0 * (zx + yw);
        m[9] = 2.0 * (yz - xw);
        m[10] = 1.0 - 2.0 * (yy + xx);
        m[11] = 0.0;

        m[12] = 0.0;
        m[13] = 0.0;
        m[14] = 0.0;
        m[15] = 1.0;
        return m;
    }

    /**
     * Creates a 4x4 matrix that scales along a given direction vector.
     * @param direction The direction vector (will be normalized).
     * @param scale The scale factor along the direction.
     * @returns A 4x4 column-major transformation matrix.
     */
    private stretchDirection(direction: Base.Vector3, scale: number): Base.TransformMatrix {
        const d = this.vector.normalized({ vector: direction });
        const [dx, dy, dz] = d;

        // Handle potential zero vector after normalization (if input was zero)
        if (isNaN(dx) || (dx === 0 && dy === 0 && dz === 0)) {
            console.warn("Stretch direction vector is zero or invalid. Returning identity matrix.");
            return this.identity();
        }

        const s = scale;
        const sMinus1 = s - 1.0;

        // Calculate elements of the 3x3 directional scaling part
        const m11 = 1.0 + sMinus1 * dx * dx;
        const m12 = sMinus1 * dx * dy;
        const m13 = sMinus1 * dx * dz;
        // m14 = 0

        const m21 = sMinus1 * dy * dx;
        const m22 = 1.0 + sMinus1 * dy * dy;
        const m23 = sMinus1 * dy * dz;
        // m24 = 0

        const m31 = sMinus1 * dz * dx;
        const m32 = sMinus1 * dz * dy;
        const m33 = 1.0 + sMinus1 * dz * dz;
        // m34 = 0

        // m41, m42, m43 = 0, m44 = 1

        // Assemble the 4x4 matrix in COLUMN-MAJOR order
        const m: Base.TransformMatrix = [
            m11, m21, m31, 0.0, // Column 1
            m12, m22, m32, 0.0, // Column 2
            m13, m23, m33, 0.0, // Column 3
            0.0, 0.0, 0.0, 1.0  // Column 4
        ];

        return m;
    }

}
