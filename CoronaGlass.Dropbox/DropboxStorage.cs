using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CoronaGlass.Core;
using Dropbox.Api;
using Dropbox.Api.Files;
using Microsoft.Extensions.Options;

namespace coronaGlass.Dropbox
{
	public class DropboxStorage : IFileStorage
	{
		public FileStorageSettings FileStorageSettings { get; }

		public DropboxStorage(IOptions<FileStorageSettings> fileStorageOptions)
		{
			FileStorageSettings = fileStorageOptions?.Value;
		}

		public async Task<List<string>> Search(string path, string query, ulong maxResults = 100UL)
		{
            //throw new Exception("dropbox search exception");
			var result = new List<string>();
            try
            {
                using var dbx = new DropboxClient(FileStorageSettings.AccessToken);
                var args = new SearchV2Arg(query, new SearchOptions(path, 1, filenameOnly: true));
                var searchResult = await dbx.Files.SearchV2Async(args);

                result.AddRange(searchResult.Matches.Select(resultMatch => resultMatch.Metadata.AsMetadata.Value.PathLower));
            }
            catch (DropboxException e)
            { 
                throw;
            }
			return result;
		}

		public async Task<List<FileStorageInfo>> ListFolderAsync(string path = null)
		{
			var result = new List<FileStorageInfo>();

            try
            {
                using (var dbx = new DropboxClient(FileStorageSettings.AccessToken))
                {
                    var list = await dbx.Files.ListFolderAsync(path ?? string.Empty);


                    foreach (var item in list.Entries.Where(i => i.IsFolder))
                    {
                        result.Add(new FileStorageInfo
                        {
                            Id = item.AsFolder.Id,
                            Name = item.Name,
                            Path = item.PathDisplay,
                            IsFolder = true
                        });
                    }

                    foreach (var item in list.Entries.Where(i => i.IsFile))
                    {
                        result.Add(new FileStorageInfo
                        {
                            Id = item.AsFile.Id,
                            Name = item.Name,
                            Path = item.PathDisplay,
                            Size = item.AsFile.Size
                        });
                    }
                }
            }
            catch (DropboxException e)
            {

                throw;
            }

			return result;
		}

        public async Task<byte[]> Download(string folder, string file)
        {
            try
            {
                using (var dbx = new DropboxClient(FileStorageSettings.AccessToken))
                {
                    using (var response = await dbx.Files.DownloadAsync(Combine(folder, file)))
                    {
                        return await response.GetContentAsByteArrayAsync();
                    }
                }
            }
            catch (DropboxException e)
            {
                throw;
            }
        }
        public async Task<string> Upload(string folder, string file, Stream content)
        {
            try
            {
                using (var dbx = new DropboxClient(FileStorageSettings.AccessToken))
                {
                    var updated = await dbx.Files.UploadAsync(Combine(folder, file), WriteMode.Overwrite.Instance, body: content);
                    return $"Saved {folder}/{file} rev {updated.Rev}";
                }
            }
            catch (DropboxException)
            {
                throw;
            }
        }

        public async Task<string> Upload(string folder, string file, byte[] content)
		{
            try
            {
                using (var dbx = new DropboxClient(FileStorageSettings.AccessToken))
                {
                    using (var mem = new MemoryStream(content))
                    {
                        var updated = await dbx.Files.UploadAsync(Combine(folder, file), WriteMode.Overwrite.Instance, body: mem);
                        return $"Saved {folder}/{file} rev {updated.Rev}";
                    }
                }
            }
            catch (DropboxException)
            {
                throw;
            }
		}

        private string Combine(string folder, string file)
        {
            var baseFolder = string.Empty;
            if (!string.IsNullOrEmpty(FileStorageSettings.BaseFolder))
            {
                baseFolder = $"/{FileStorageSettings.BaseFolder.Trim('/')}";
            }

            var path = $"{baseFolder}/{folder.Trim('/')}/{file}";
            return path;
        }
	}
}
