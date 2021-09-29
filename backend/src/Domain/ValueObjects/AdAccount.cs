using Domain.Common;
using Domain.Exceptions;
using System;
using System.Collections.Generic;

namespace Domain.ValueObjects
{
    // AdAccount Stands For Microsoft Active Directory Account
    public class AdAccount : ValueObject
    {

        private AdAccount()
        {
        }

        public string Name { get; private set; }
        public string Domain { get; private set; }

        public override string ToString() => $"{Domain}\\{Name}";

        public static implicit operator string(AdAccount account) => account.ToString();

        public static explicit operator AdAccount(string accountString) => For(accountString);

        public static AdAccount For(string accountString)
        {
            var account = new AdAccount();

            try
            {
                var index = accountString.IndexOf("\\", StringComparison.Ordinal);
                account.Domain = accountString.Substring(0, index);
                account.Name = accountString.Substring(index + 1);
            }
            catch (Exception ex)
            {

                throw new AdAccountInvalidException(accountString, ex);
            }

            return account;
        }
        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Domain;
            yield return Name;
        }
    }
}
