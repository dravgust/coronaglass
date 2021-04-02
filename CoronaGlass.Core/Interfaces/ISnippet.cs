using System;

namespace CoronaGlass.Core.Interfaces
{
	public interface ISnippet : IComparable<ISnippet>
	{
		float Length { get; }

        ISnippet Clone(float length);
    }
}
