using System.Collections.Generic;
using System.Linq;
using CoronaGlass.Core.Interfaces;

namespace CoronaGlass.Core.Models
{
    /// <summary>
    /// A generic 'Plank'
    /// </summary>
    public class Plank
    {
        public Plank(float length)
        {
            OriginalLength = length;
        }

        public float FreeLength => OriginalLength - Cuts.Sum(l => l.Length);

        public float OriginalLength;

        public readonly List<ISnippet> Cuts = new();

        public void Cut(ISnippet snippet)
        {
            Cuts.Add(snippet);
        }
    }
}
