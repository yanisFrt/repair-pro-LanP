module.exports = {
  apps: [
    {
      name: "repair-pro",
      script: "node",
      args: "node_modules/next/dist/bin/next start -p 3001",
      cwd: "./",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "200M",
      kill_timeout: 5000,
      restart_delay: 3000,
      // error_file: "./logs/error.log",
      // out_file: "./logs/output.log",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
  ],
};
