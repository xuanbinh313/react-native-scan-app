/**
 * Utility class for handling API responses with field selection
 */
export class ResponseUtil {
  /**
   * Filter response object to include only specified fields
   * @param data - The full response object
   * @param fields - Array of field names to include
   * @returns Partial response with only requested fields
   */
  static filterFields<T extends Record<string, any>>(
    data: T,
    fields: string[],
  ): Partial<T> {
    const response: any = {};
    
    fields.forEach(field => {
      if (field in data) {
        response[field] = data[field];
      }
    });
    
    return response;
  }

  /**
   * Parse comma-separated fields string
   * @param fieldsString - Comma-separated field names
   * @returns Array of trimmed field names
   */
  static parseFields(fieldsString: string): string[] {
    return fieldsString.split(',').map(f => f.trim()).filter(f => f.length > 0);
  }

  /**
   * Check if any search filters are provided (excluding 'fields' parameter)
   * @param searchDto - Search DTO object
   * @returns true if any search filters are present
   */
  static hasSearchFilters<T extends Record<string, any>>(
    searchDto: T | undefined,
  ): boolean {
    if (!searchDto) return false;
    return Object.keys(searchDto).some(
      key => key !== 'fields' && searchDto[key] !== undefined && searchDto[key] !== null
    );
  }
}
