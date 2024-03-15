import { FieldValues, FieldPath } from 'react-hook-form'

/**
 * This utility has one purpose : enforce to get existing key of a typed object.
 * @param keyName key of object
 * @returns existing key of object
 */
export function getFieldKey<TFieldValues extends FieldValues>(
    keyName: FieldPath<TFieldValues>
): FieldPath<TFieldValues> {
    return keyName
}
