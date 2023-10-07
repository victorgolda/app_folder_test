module.exports = {
  apps: [
    {
      name: 'nitro-netvault',
      script: '.next/standalone/server.js',
      args: '-p ' + (process.env.PORT || 3000),
      watch: false,
      autorestart: true
    }
  ]
}
