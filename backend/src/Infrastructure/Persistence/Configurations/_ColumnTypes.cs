namespace Infrastructure.Persistence.Configurations
{
    internal  class _ColumnTypes
    {
        private  _ColumnTypes(string value) { Value = value; }

        public  string Value { get; private set; }

        public static _ColumnTypes decimalType { get { return new _ColumnTypes("decimal(18, 2)"); } }
        public static _ColumnTypes intType { get { return new _ColumnTypes("int"); } }
        public static _ColumnTypes BitType { get { return new _ColumnTypes("Bit"); } }
        public static _ColumnTypes nvarchar { get { return new _ColumnTypes("nvarchar()"); } }
        public static _ColumnTypes nvarcharMax { get { return new _ColumnTypes("nvarchar(max)"); } }
    }
}
