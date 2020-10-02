import { ALIGN_RIGHT, Block, Blocks } from 'blockly';
import * as JavaScript from 'blockly/javascript';
import { ResourcesInterface, ResourcesService } from '../../../../resources';
import { createStandardContextIIFE } from '../../../_shared';
import { getRequired, makeRequiredValidationModelForInputs, BitByBitBlockHandlerService, ValidationEntityInterface } from '../../../validations';

export function createArcBlock() {

    const resources = ResourcesService.getResources();
    const blockSelector = 'verb_geometry_nurbs_curve_arc';

    Blocks[blockSelector] = {
        init() {
            this.appendValueInput('Center')
                .setCheck('Array')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_verb_geometry_nurbs_curve_arc_input_center);
            this.appendValueInput('XAxis')
                .setCheck('Array')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_verb_geometry_nurbs_curve_arc_input_x_axis.toLowerCase());
            this.appendValueInput('YAxis')
                .setCheck('Array')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_verb_geometry_nurbs_curve_arc_input_y_axis.toLowerCase());
            this.appendValueInput('Radius')
                .setCheck('Number')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_verb_geometry_nurbs_curve_arc_input_radius.toLowerCase());
            this.appendValueInput('MinAngle')
                .setCheck('Number')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_verb_geometry_nurbs_curve_arc_input_min_angle.toLowerCase());
            this.appendValueInput('MaxAngle')
                .setCheck('Number')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_verb_geometry_nurbs_curve_arc_input_max_angle.toLowerCase());
            this.setOutput(true, 'NurbsCurve');
            this.setColour('#fff');
            this.setTooltip(resources.block_verb_geometry_nurbs_curve_arc_description);
            this.setHelpUrl('');
        }
    };

    JavaScript[blockSelector] = (block: Block) => {
        const inputs = {
            center: JavaScript.valueToCode(block, 'Center', JavaScript.ORDER_ATOMIC),
            xAxis: JavaScript.valueToCode(block, 'XAxis', JavaScript.ORDER_ATOMIC),
            yAxis: JavaScript.valueToCode(block, 'YAxis', JavaScript.ORDER_ATOMIC),
            radius: JavaScript.valueToCode(block, 'Radius', JavaScript.ORDER_ATOMIC),
            minAngle: JavaScript.valueToCode(block, 'MinAngle', JavaScript.ORDER_ATOMIC),
            maxAngle: JavaScript.valueToCode(block, 'MaxAngle', JavaScript.ORDER_ATOMIC),
        };

        // this is first set of validations to check that all inputs are non empty strings
        BitByBitBlockHandlerService.validate(block, block.workspace, makeRequiredValidationModelForInputs(resources, inputs, [
            resources.block_center,
            resources.block_x_axis,
            resources.block_y_axis,
            resources.block_radius,
            resources.block_min_angle,
            resources.block_max_angle,
        ]));

        // this creates validation model to be used at runtime to evaluate real values of inputs
        const runtimeValidationModel = makeRuntimeValidationModel(resources, Object.keys(inputs));
        (block as any).validationModel = runtimeValidationModel;

        const code = createStandardContextIIFE(block, blockSelector, inputs, true,
            `return new BitByBit.verb.geom.Arc(inputs.center, inputs.xAxis, inputs.yAxis, inputs.radius, BitByBit.BABYLON.Angle.FromDegrees(inputs.minAngle).radians(), BitByBit.BABYLON.Angle.FromDegrees(inputs.maxAngle).radians());`
        );
        return [code, JavaScript.ORDER_ATOMIC];
    };
}

function makeRuntimeValidationModel(
    resources: ResourcesInterface,
    keys: string[]
): ValidationEntityInterface[] {

    return [{
        entity: keys[0],
        validations: [
            getRequired(resources, resources.block_center),
        ]
    }, {
        entity: keys[1],
        validations: [
            getRequired(resources, resources.block_x_axis),
        ]
    }, {
        entity: keys[2],
        validations: [
            getRequired(resources, resources.block_y_axis),
        ]
    }, {
        entity: keys[3],
        validations: [
            getRequired(resources, resources.block_radius),
        ]
    }, {
        entity: keys[4],
        validations: [
            getRequired(resources, resources.block_min_angle),
        ]
    }, {
        entity: keys[5],
        validations: [
            getRequired(resources, resources.block_max_angle),
        ]
    }];
}