using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace CoronaGlass.Core
{
	public interface IFileStorage
	{
		Task<List<FileStorageInfo>> ListFolderAsync(string path = null);
		Task<string> Upload(string folder, string file, byte[] content);
        Task<string> Upload(string folder, string file, Stream content);
        Task<byte[]> Download(string folder, string file);
        Task<List<string>> Search(string path, string query, ulong maxResults = 100UL);
	}
}
