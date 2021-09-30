﻿using System;

namespace Application.Common.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException() : base() { }
        public NotFoundException(string message) : base(message) { }
        public NotFoundException(string message, Exception inner) : base(message, inner) { }
        public NotFoundException(string name, object key) : base($"Entity \"{name}\" ({key} was not found.)") { }

    }
}
