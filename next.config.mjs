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
            {
                protocol:'https',
                hostname:'pusher.com'
            }
        ]
    }
};

export default nextConfig;
