/** @type {import('next').NextConfig} */
const nextConfig = {
    reactProductionProfiling: false,
    images: {
        remotePatterns:[
            {
                protocol:'https',
                hostname:'ucarecdn.com'
            },
            {
                protocol:'https',
                hostname:'wordpress-1320300-4825588.cloudwaysapps.com'
            },
        ]
    },
    async headers(){
        return [
            {
                source: '/(api|dashboard|integration)/:path*',
                headers: [
                    {
                        key: 'x-custom-header',
                        value: 'my custom header value',
                    },
                ],   
            }
        ]
    }
};

export default nextConfig;
