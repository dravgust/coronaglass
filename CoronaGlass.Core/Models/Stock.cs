using System.Collections.Generic;
using System.Linq;

namespace CoronaGlass.Core.Models
{
    public class Stock
    {
        private readonly SortedList<float, uint> _warehouse = new(Comparer<float>.Create((x, y) => y.CompareTo(x)));

        public bool IsEmpty => !_warehouse.Any();

        public float MaxLength => _warehouse.FirstOrDefault(e => e.Value != 0).Value;

        public void Add(float length, uint count = uint.MaxValue)
        {
            if (!_warehouse.ContainsKey(length))
                _warehouse.Add(length, count);
            else
            {
                _warehouse[length] = _warehouse[length] + count;
            }
        }

        public Plank Get()
        {
            foreach (var (key, value) in _warehouse.Where(e => e.Value != 0))
                return new Plank(_warehouse[key]--);

            return null;
        }
    }
}
