using HKxUtilities.Exceptions;
using System;

namespace HKxUtilities.Type
{
    public static class TypeUtils
    {
        public static T To<T>(this object input)
        {
            try
            {
                if (input == null || input == DBNull.Value) throw new InputIsNotConvertableToRequiredTypeException();

                return (T)Convert.ChangeType(input, typeof(T));
            }
            catch (Exception ex)
            {
                throw new InputIsNotConvertableToRequiredTypeException(ex.Message);
            }
        }

        public static T To<T>(this Enum input)
        {
            try
            {
                if (input == null) throw new InputIsNotConvertableToRequiredTypeException();

                return (T)Convert.ChangeType(input, typeof(T));
            }
            catch (Exception ex)
            {
                throw new InputIsNotConvertableToRequiredTypeException(ex.Message);
            }
        }
    }
}
