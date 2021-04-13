using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using CoronaGlass.Core.Interfaces;
using CoronaGlass.Core.Models;

namespace CoronaGlass.Core
{
    public class CuttingStock
    {
        private readonly List<ISnippet> _snippets;

        public CuttingStock(List<ISnippet> snippets)
        {
            _snippets = snippets ?? throw new ArgumentNullException(nameof(snippets)); 
        }

        public List<Plank> CalculateFor(Stock stock)
        {
            if (stock == null)
                throw new ArgumentNullException(nameof(stock));
            if (stock.IsEmpty)
                throw new ArgumentException("The stock is empty.", nameof(stock));

            var totalSnippetsLength = _snippets.Sum(e => e.Length);
            var totalStockLength = stock.TotalLength;

            if(totalSnippetsLength > totalStockLength)
                throw new Exception("There are no not enough items in the stock for cutting.");

            var snippets = new List<ISnippet>();
            foreach (var snippet in _snippets)
            {
                var maxInStock = stock.GetMaxPlankLength();
                if (snippet.Length > maxInStock)
                {
                    float snippetLength;
                    var divider = 1;

                    do
                    {
                        snippetLength = snippet.Length;
                        snippetLength /= ++divider;

                    }
                    while (snippetLength > maxInStock);

                    snippets.AddRange(Enumerable.Range(1, divider).Select(i => snippet.Clone(snippetLength)));
                }
                else
                {
                    snippets.Add(snippet);
                }
            }

            snippets.Sort();
            snippets.Reverse();

            return Calculate(stock, snippets);
        }

        private static List<Plank> Calculate(Stock stock, IEnumerable<ISnippet> snippets)
        {
            var planks = new List<Plank>();

            foreach (var i in snippets)
            {
                //if no eligible planks can be found
                if (!planks.Any(plank => plank.FreeLength >= i.Length))
                {
                    //make a plank
                    var maxPlank = stock.GetMaxPlank();
                    if (maxPlank == null)
                        throw new NoNullAllowedException(nameof(maxPlank));

                    planks.Add(maxPlank);
                }

                //cut where possible
                foreach (var plank in planks.Where(plank => plank.FreeLength >= i.Length))
                {
                    plank.Cut(i);
                    break;
                }
            }

            //cut down on waste by minimizing length of plank
            foreach (var plank in planks)
            {
                float newLength = plank.OriginalLength;
                foreach (float possibleLength in stock.GetPlankLengths())
                {
                    if (Math.Abs(possibleLength - plank.OriginalLength) > 0.0 && plank.OriginalLength - plank.FreeLength <= possibleLength)
                    {
                        newLength = possibleLength;
                        break;
                    }
                }

                stock.Add(plank.OriginalLength, 1);
                plank.OriginalLength = stock.GetPlank(newLength).OriginalLength;
            }

            return planks;
        }

        //Calculate how much waste/free length is left in a list of planks
        public static float GetFree(IEnumerable<Plank> planks)
        {
            float free = 0;

            foreach (var plank in planks)
            {
                free += plank.FreeLength;
            }
            return free;
        }
    }
}
