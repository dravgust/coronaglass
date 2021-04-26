﻿using System;
using Microsoft.AspNetCore.Http;

namespace Web.Infrastructure
{
    public static class HttpRequestExtensions
    {
        private const string RequestedWithHeader = "X-Requested-With";
        private const string XmlHttpRequest = "XMLHttpRequest";

        public static bool IsAjaxRequest(this HttpRequest request)
        {
            if(request == null)
                throw new ArgumentNullException(nameof(request));
            
            return request.Headers[RequestedWithHeader] == XmlHttpRequest;
        }
    }
}
