using System.Collections.Generic;
using Newtonsoft.Json;

namespace Service
{
    public class AkkaConfig
    {
        [JsonProperty(PropertyName = "log-config-on-start")]
        public string logconfigonstart { get; set; }
        [JsonProperty(PropertyName = "stdout-loglevel")]
        public string stdoutloglevel { get; set; }
        public string loglevel { get; set; }
        public string[] loggers { get; set; }
        public ActorConfig actor { get; set; }
        public RemoteConfig remote { get; set; }

        public class ActorConfig
        {
            public string provider { get; set; }
            public DebugConfig debug { get; set; }
            public Dictionary<string, string> serializers { get; set; }
            [JsonProperty(PropertyName = "serialization-bindings")]
            public Dictionary<string, string> serializationbindings { get; set; }

            public class DebugConfig
            {
                public string receive { get; set; }
                public string autoreceive { get; set; }
                public string lifecycle { get; set; }
                [JsonProperty(PropertyName = "event-stream")]
                public string eventstream { get; set; }
                public string unhandled { get; set; }
            }
        }

        public class RemoteConfig
        {
            [JsonProperty(PropertyName = "outbound-max-restarts")]
            public int outboundmaxrestarts { get; set; }
            [JsonProperty(PropertyName = "dot-netty.tcp")]
            public NetConfig dotnettytcp { get; set; }
            public class NetConfig
            {
                [JsonProperty(PropertyName = "outbound-hostname")]
                public string outboundhostname { get; set; }
                [JsonProperty(PropertyName = "bind-port")]
                public string bindport { get; set; }
                [JsonProperty(PropertyName = "hostname")]
                public string hostname { get; set; }
                [JsonProperty(PropertyName = "port")]
                public string port { get; set; }
            }
        }
    }
}
