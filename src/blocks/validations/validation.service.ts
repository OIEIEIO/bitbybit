import { Block, Workspace, WorkspaceSvg } from 'blockly';
import { ValidationEntityInterface } from './validation-entity.interface';

export class BlockValidationService {
    static validate(block: Block, workspace: Workspace | WorkspaceSvg, validationEntityModel: ValidationEntityInterface[]) {
        const errors = [];

        validationEntityModel.forEach(validation => {
            validation.validations.forEach(val => {
                if (!val.validationFunc(validation.entity, val.validationData)) {
                    errors.push(val.errorText);
                }
            });
        });

        if (errors.length > 0) {
            block.setColour('ffab91');
            const errorText = `Block failed - \n${errors.join(',\n')}.`;
            block.setWarningText(errorText);
            throw new Error(errorText);
        } else {
            block.setColour('ffffff');
            block.setWarningText(null);
        }
    }
}