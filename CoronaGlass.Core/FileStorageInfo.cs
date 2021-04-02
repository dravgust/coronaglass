namespace CoronaGlass.Core
{
	public class FileStorageInfo
	{
		public string Id { set; get; }

		public string Name { set; get; }

		public string Path { set; get; }

		public bool IsFolder { set; get; }

		public ulong Size { set; get; }
	}
}
