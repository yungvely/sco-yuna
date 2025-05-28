/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  eslint: {
    ignoreDuringBuilds: true, //개발 중 우선 배포를 위한 임시 설정입니다.
  },
  images: {
    domains: ["assets.sco-yuna.kr"],
  },
};

module.exports = nextConfig;
