using System;

namespace Web.Infrastructure.Services
{
    public class SearchFileCommand : FileCommand
    {
        public SearchFileCommand(string folderName, string fileName) : base(folderName, fileName)
        {
        }
    }
}
