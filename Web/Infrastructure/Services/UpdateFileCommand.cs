using System;
using Web.Features.Customer;

namespace Web.Infrastructure.Services
{
    public class UpdateFileCommand : FileCommand
    {
        public CertificateRequest Data { get; }

        public UpdateFileCommand(string folderName, string fileName, CertificateRequest data) : base(folderName, fileName)
        {
            Data = data ?? throw new ArgumentNullException(nameof(data));
        }
    }
}
