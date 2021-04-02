using Newtonsoft.Json;

namespace CoronaGlass.Core
{
	public static class JsonUtils
	{
		public static string ToJson(this object obj)
		{
			//new JsonSerializerSettings {ReferenceLoopHandling = ReferenceLoopHandling.Ignore }
			return JsonConvert.SerializeObject(obj);
		}

		public static T Deserialize<T>(string json)
		{
			return JsonConvert.DeserializeObject<T>(json);
		}
	}
}
