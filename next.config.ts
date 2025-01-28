import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'avatars.githubusercontent.com',
              port: '',
              pathname: '**',
          },
          {
              protocol: 'http',
              hostname: 'res.cloudinary.com',
              port: '',
              pathname: '**'
          },
          {
              protocol: 'https',
              hostname: 'lh3.googleusercontent.com',
              port: '',
              pathname: '**'
          },
          {
              protocol: 'https',
              hostname: 'workdeeal-recrutador.s3.eu-north-1.amazonaws.com',
              port: '',
              pathname: '**'
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
            pathname: '**'
        },
      ]
  }
};

export default nextConfig;
