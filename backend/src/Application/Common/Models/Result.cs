using System;
using System.Collections.Generic;
using System.Linq;

namespace Application.Common.Models
{
    public class Result
    {
        private bool v;
        private object p;

        internal Result(bool succeeded, IEnumerable<string> errors)
        {
            Succeeded = succeeded;
            Errors = errors.ToArray();
        }

        public Result(bool v, object p)
        {
            this.v = v;
            this.p = p;
        }

        public bool Succeeded { get; set; }
        public string[] Errors { get; set; }

        public bool IsLoading { get; set; } = false;
        public DateTime LastFetched { get; set; } = DateTime.UtcNow;

        public object Data { get; set; } = new object();
        public List<string> Messages { get; set; } = new List<string>();

        public static Result Success()
        {
            return new Result(true, new string[] { });
        }

        public static Result Failure(IEnumerable<string> errors)
        {
            return new Result(false, errors);
        }
    }
}