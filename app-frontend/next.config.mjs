import nextIntl from'next-intl/plugin'

const nextConfig = {

}

const withNextIntl = nextIntl("./src/i18n.ts");

export default withNextIntl(nextConfig);
