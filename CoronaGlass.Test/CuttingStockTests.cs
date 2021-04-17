using System;
using System.Collections.Generic;
using System.Linq;
using CoronaGlass.Core;
using CoronaGlass.Core.Interfaces;
using CoronaGlass.Core.Models;
using NUnit.Framework;

namespace CoronaGlass.Test
{
	public class CuttingStockTests
	{
        private List<ISnippet> _snippets;

        private Stock _stock;

        private int plankReserve = 50;

		[SetUp]
		public void Setup()
        {
            var list = new List<float>
            {
                1825, 6450, 6450, 3022, 1813, 1654, 5328, 6450, 1646, 1808, 6450, 6450, 3008, 1813, 1644, 5328, 6450,
                1659, 1820, 6450, 6450, 2974, 1812, 1649, 6450, 5322, 1646, 1817, 6450, 6450, 2982, 1812, 1653, 6450,
                5299, 1660, 1811, 6450, 6450, 2979, 1801, 1657, 5279, 6450, 1656, 1832, 6450, 6450, 3010, 1812, 1665,
                5308, 6450, 1669, 1830, 6450, 6450, 2993, 1806, 1663, 6450, 5303, 1666, 1813, 6450, 6450, 2975, 1819,
                1662, 6450, 5302, 1671, 2708, 2913, 5950, 6850, 6850, 6850, 4382, 5950, 2900, 2703, 4150, 3535,
            };

            _snippets = new List<ISnippet>();
            foreach (var e in list)
            {
                _snippets.Add(new TestSnippet(e) { Apartment = 1, Floor = 1 });
            }

            _stock = new Stock { { 6000 - plankReserve, 22 }, { 6500 - plankReserve, 31 }, { 6900 - plankReserve, 3 } };
        }

		[Test]
		public void Test1()
        {
            var cuttingStockJob = new CuttingStock(_snippets);

            var result = cuttingStockJob.CalculateFor(_stock);
            var planks = result.Item1;
            var unused = result.Item2;

            Console.WriteLine($"Use plank sizes: [{string.Join(", ", planks.Select(p => p.OriginalLength + plankReserve).Distinct())}]");
            Console.WriteLine();
            var columns = planks.Max(p => p.Cuts.Count);

            foreach (var plank in planks)
            {
                var tab = "";
                for (var i = 0; i < columns + 1 - plank.Cuts.Count; i++)
                {
                    tab += "\t\t\t";
                }

                Console.WriteLine($"Cut a {plank.OriginalLength + plankReserve} ~ {plank.OriginalLength} by:\t\t{string.Join(",\t", plank.Cuts)}{tab}with {plank.FreeLength} waste.");
            }

            var waste = CuttingStock.GetFree(planks);
            Console.WriteLine("\r\nFinished with {0} waste => {1:#.##}%", waste, waste * 100 / _snippets.Sum(i => i.Length));

            Console.WriteLine($"Unused: {string.Join(" ,", unused.Select(i => i.Length))}");
            Console.WriteLine($"Stock: {string.Join(" ,", _stock.Select(i => $"{i.Item1}:{i.Item2}"))}");


            Assert.Pass();
		}
    }

    public class TestSnippet : Snippet
    {
        public TestSnippet(float length) : base(length)
        {

        }

        public int Apartment { get; set; }
        public int Floor { get; set; }

        public override string ToString()
        {
            return $"{Length}[{Floor}/{Apartment}]";
        }

        public override ISnippet Clone(float length)
        {
            return new TestSnippet(length) { Apartment = Apartment, Floor = Floor };
        }
    }
}