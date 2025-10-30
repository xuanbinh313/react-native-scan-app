/**
 * Utility for mapping and validating field selections for database queries
 */
export class FieldMapper {
  /**
   * Map domain fields to ORM entity fields
   * Always includes 'id' if fields are specified for proper entity identification
   * @param fields - Array of domain field names
   * @param fieldMap - Optional custom mapping of domain fields to ORM fields
   * @param validFields - Optional array of valid field names for validation
   * @returns Array of ORM field names to select from database
   * @throws FieldValidationException if invalid fields are provided
   */
  static mapFields(
    fields: string[] | undefined,
    fieldMap?: Record<string, string>,
    validFields?: string[]
  ): string[] | undefined {
    if (!fields || fields.length === 0) {
      return undefined; // Return undefined to fetch all fields
    }

    // Validate fields if validFields is provided
    if (validFields && validFields.length > 0) {
      const invalidFields = fields.filter(field => !validFields.includes(field));
      if (invalidFields.length > 0) {
        const { FieldValidationException } = require('../filters/field-validation.exception.js');
        throw new FieldValidationException(
          `Invalid fields: ${invalidFields.join(', ')}. Valid fields are: ${validFields.join(', ')}`
        );
      }
    }

    const defaultFieldMap = fieldMap || {};
    const mappedFields = new Set<string>();

    fields.forEach(field => {
      const ormField = defaultFieldMap[field] || field;
      mappedFields.add(ormField);
    });

    // Always include id for entity identification
    if (!mappedFields.has('id')) {
      mappedFields.add('id');
    }

    return Array.from(mappedFields);
  }

  /**
   * Get valid fields from an entity class dynamically
   * @param EntityClass - The ORM entity class constructor
   * @returns Array of valid field names extracted from the entity
   */
  static getValidFieldsFromEntity(EntityClass: any): string[] {
    if (!EntityClass || !EntityClass.prototype) {
      return [];
    }

    // Get all property names from the entity class instance
    const instance = Object.create(EntityClass.prototype);
    const fields: string[] = [];

    // Get all keys from the prototype and instance
    const allKeys = new Set<string>([
      ...Object.keys(instance),
      ...Object.getOwnPropertyNames(EntityClass.prototype),
    ]);

    // Filter out methods, constructor, and internal MikroORM fields
    allKeys.forEach(key => {
      if (
        key !== 'constructor' && 
        typeof instance[key] !== 'function' &&
        !key.startsWith('__') && // Filter out __entity, __meta, etc.
        !key.startsWith('_')     // Filter out private fields
      ) {
        fields.push(key);
      }
    });

    return fields;
  }

  /**
   * Validate and filter fields to only include valid ones
   * @param fields - Array of field names to validate
   * @param validFields - Array of valid field names or entity class
   * @param throwError - Whether to throw error on invalid fields (default: true)
   * @returns Array of valid field names
   * @throws FieldValidationException if invalid fields are provided and throwError is true
   */
  static validateFieldsWithList(
    fields: string[] | undefined, 
    validFields: string[],
    entityName: string = 'entity',
    throwError: boolean = true
  ): string[] | undefined {
    if (!fields || fields.length === 0) {
      return undefined;
    }

    const invalidFields = fields.filter(field => !validFields.includes(field));
    
    if (invalidFields.length > 0) {
      if (throwError) {
        const { FieldValidationException } = require('../filters/field-validation.exception.js');
        throw new FieldValidationException(
          `Invalid fields for ${entityName}: ${invalidFields.join(', ')}. Valid fields are: ${validFields.join(', ')}`
        );
      }
      // Filter out invalid fields if not throwing error
      return fields.filter(field => validFields.includes(field));
    }

    return fields;
  }
}
