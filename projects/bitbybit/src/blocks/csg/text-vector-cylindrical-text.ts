import { ALIGN_RIGHT, Block, Blocks } from 'blockly';
import * as JavaScript from 'blockly/javascript';
import { ResourcesInterface, ResourcesService } from '../../resources';
import { createStandardContextIIFE } from '../_shared';
import { getRequired, makeRequiredValidationModelForInputs, BitByBitBlockHandlerService, ValidationEntityInterface } from '../validations';

export function createTextVectorCylindricalTextBlock(): void {

    const resources = ResourcesService.getResources();
    const blockSelector = 'csg_text_vector_cylindrical_text';

    Blocks[blockSelector] = {
        init(): void {
            this.appendValueInput('InputText')
                .setCheck('String')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_csg_text_vector_cylindrical_text_input_input);
            this.appendValueInput('ExtrusionHeight')
                .setCheck('Number')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_csg_text_vector_cylindrical_text_input_extrude_height.toLowerCase());
            this.appendValueInput('ExtrusionSize')
                .setCheck('Number')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_csg_text_vector_cylindrical_text_input_extrude_size.toLowerCase());
            this.appendValueInput('Segments')
                .setCheck('Number')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_csg_text_vector_cylindrical_text_input_segments.toLowerCase());
            this.appendValueInput('XOffset')
                .setCheck('Number')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_csg_text_vector_cylindrical_text_input_x_offset.toLowerCase());
            this.appendValueInput('YOffset')
                .setCheck('Number')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_csg_text_vector_cylindrical_text_input_y_offset.toLowerCase());
            this.appendValueInput('Height')
                .setCheck('Number')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_csg_text_vector_cylindrical_text_input_height.toLowerCase());
            this.appendValueInput('LineSpacing')
                .setCheck('Number')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_csg_text_vector_cylindrical_text_input_line_spacing.toLowerCase());
            this.appendValueInput('LetterSpacing')
                .setCheck('Number')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_csg_text_vector_cylindrical_text_input_letter_spacing.toLowerCase());
            this.appendValueInput('Align')
                .setCheck('String')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_csg_text_vector_cylindrical_text_input_align.toLowerCase());
            this.appendValueInput('ExtrudeOffset')
                .setCheck('Number')
                .setAlign(ALIGN_RIGHT)
                .appendField(resources.block_csg_text_vector_cylindrical_text_input_extrude_offset.toLowerCase());
            this.setOutput(true, 'Array');
            this.setColour('#fff');
            this.setTooltip(resources.block_csg_text_vector_cylindrical_text_description);
            this.setHelpUrl('');
        }
    };

    JavaScript[blockSelector] = (block: Block) => {
        const inputs = {
            inputText: JavaScript.valueToCode(block, 'InputText', JavaScript.ORDER_ATOMIC),
            extrusionHeight: JavaScript.valueToCode(block, 'ExtrusionHeight', JavaScript.ORDER_ATOMIC),
            extrusionSize: JavaScript.valueToCode(block, 'ExtrusionSize', JavaScript.ORDER_ATOMIC),
            segments: JavaScript.valueToCode(block, 'Segments', JavaScript.ORDER_ATOMIC),
            xOffset: JavaScript.valueToCode(block, 'XOffset', JavaScript.ORDER_ATOMIC),
            yOffset: JavaScript.valueToCode(block, 'YOffset', JavaScript.ORDER_ATOMIC),
            height: JavaScript.valueToCode(block, 'Height', JavaScript.ORDER_ATOMIC),
            lineSpacing: JavaScript.valueToCode(block, 'LineSpacing', JavaScript.ORDER_ATOMIC),
            letterSpacing: JavaScript.valueToCode(block, 'LetterSpacing', JavaScript.ORDER_ATOMIC),
            align: JavaScript.valueToCode(block, 'Align', JavaScript.ORDER_ATOMIC),
            extrudeOffset: JavaScript.valueToCode(block, 'ExtrudeOffset', JavaScript.ORDER_ATOMIC),
        };

        // this is first set of validations to check that all inputs are non empty strings
        BitByBitBlockHandlerService.validate(block, block.workspace, makeRequiredValidationModelForInputs(resources, inputs, [
            resources.block_input_text, resources.block_extrusion_height, resources.block_extrusion_size, resources.block_segments,
            resources.block_x_offset, resources.block_y_offset, resources.block_height,
            resources.block_line_spacing, resources.block_letter_spacing, resources.block_align, resources.block_extrude_offset
        ]));

        // this creates validation model to be used at runtime to evaluate real values of inputs
        const runtimeValidationModel = makeRuntimeValidationModel(resources, Object.keys(inputs));
        (block as any).validationModel = runtimeValidationModel;

        const code = createStandardContextIIFE(block, blockSelector, inputs, true,
            `
            const text = BitByBit.CSG.text.vectorText({
                input: inputs.inputText,
                xOffset: inputs.xOffset,
                yOffset: inputs.yOffset,
                height: inputs.height,
                lineSpacing: inputs.lineSpacing,
                letterSpacing: inputs.letterSpacing,
                align: inputs.align,
                extrudeOffset: inputs.extrudeOffset,
            });
            return text.map(txt => {
                const cylinders = txt.map(center => {
                    return BitByBit.CSG.primitives.cylinder({
                        center: [center[0], center[1], 0],
                        height: inputs.extrusionHeight,
                        radius: inputs.extrusionSize,
                        segments: inputs.segments,
                    });
                });
                return BitByBit.CSG.hulls.hullChain(...cylinders);
            });
`
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
            getRequired(resources, resources.block_input_text),
        ]
    }, {
        entity: keys[1],
        validations: [
            getRequired(resources, resources.block_extrusion_height),
        ]
    }, {
        entity: keys[2],
        validations: [
            getRequired(resources, resources.block_extrusion_size),
        ]
    }, {
        entity: keys[3],
        validations: [
            getRequired(resources, resources.block_segments),
        ]
    }, {
        entity: keys[4],
        validations: [
            getRequired(resources, resources.block_x_offset),
        ]
    }, {
        entity: keys[5],
        validations: [
            getRequired(resources, resources.block_y_offset),
        ]
    }, {
        entity: keys[6],
        validations: [
            getRequired(resources, resources.block_height),
        ]
    }, {
        entity: keys[7],
        validations: [
            getRequired(resources, resources.block_line_spacing),
        ]
    }, {
        entity: keys[8],
        validations: [
            getRequired(resources, resources.block_letter_spacing),
        ]
    }, {
        entity: keys[9],
        validations: [
            getRequired(resources, resources.block_align),
        ]
    }, {
        entity: keys[10],
        validations: [
            getRequired(resources, resources.block_extrude_offset),
        ]
    }];
}