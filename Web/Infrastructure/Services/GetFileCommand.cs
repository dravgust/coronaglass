namespace Web.Infrastructure.Services
{
    public class GetFileCommand : FileCommand
    {
        public GetFileCommand(string folderName, string fileName) : base(folderName, fileName)
        {
        }
    }
}
