module.exports = {
  dryRun: false,
  ci: false,
  repositoryUrl: 'https://github.com/Degray84/figma-detoks.git',
  branches: ['main', { name: 'beta', prerelease: true }],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/git',
    '@semantic-release/github',
  ],
  tagFormat: 'v${version}',
};
