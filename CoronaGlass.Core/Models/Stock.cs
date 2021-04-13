using System.Collections.Generic;
using System.Linq;

namespace CoronaGlass.Core.Models
{
    public class Stock
    {
        private readonly SortedList<float, uint> _warehouse = new();//Comparer<float>.Create((x, y) => y.CompareTo(x))

        public bool IsEmpty => !_warehouse.Any();
        public double TotalLength => _warehouse.Sum(e => e.Key * e.Value);
        public List<float> GetPlankLengths() => _warehouse.Where(e => e.Value != 0).Select(e => e.Key).ToList();
        public void Add(float length, uint count = uint.MaxValue)
        {
            if (count == 0) count = uint.MaxValue;

            if (!_warehouse.ContainsKey(length))
                _warehouse.Add(length, count);
            else
            {
                _warehouse[length] = _warehouse[length] + count;
            }
        }

        public float GetMaxPlankLength() => _warehouse.LastOrDefault(e => e.Value != 0).Key;

        public Plank GetMaxPlank()
        {
            var length = GetMaxPlankLength();
            if (!_warehouse.ContainsKey(length)) return null;

            _warehouse[length]--;
            return new Plank(length);

            //foreach (var (key, value) in _warehouse.Where(e => e.Value != 0))
            //    return new Plank(_warehouse[key]--);
        }

        public Plank GetPlank(float length)
        {
            if (!_warehouse.ContainsKey(length) || _warehouse[length] == 0) return null;

            _warehouse[length]--;
            return new Plank(length);

        }
    }
}
