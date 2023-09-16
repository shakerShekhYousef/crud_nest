import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isImage', async: false })
export class IsImageConstraint implements ValidatorConstraintInterface {
  validate(buffer: Buffer, args: ValidationArguments) {
    if (!buffer) {
      return false;
    }

    const supportedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const mimeType = args.object['mimetype'];

    return supportedMimeTypes.includes(mimeType);
  }

  defaultMessage(args: ValidationArguments) {
    return 'File must be an image of type JPEG, PNG, or GIF';
  }
}

export function IsImage(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsImageConstraint,
    });
  };
}