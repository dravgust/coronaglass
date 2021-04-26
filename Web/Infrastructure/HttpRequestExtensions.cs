﻿using System;
using Microsoft.AspNetCore.Http;

namespace VralumGlassWeb.Data.Utilities
{
    public static class HttpRequestExtensions
    {
        private const string RequestedWithHeader = "X-Requested-With";
        private const string XmlHttpRequest = "XMLHttpRequest";

        public static bool IsAjaxRequest(this HttpRequest request)
        {
            if(request == null)
                throw new ArgumentException("request");

            if (request.Headers != null)
                return request.Headers[RequestedWithHeader] == XmlHttpRequest;

            return false;
        }
    }
}
