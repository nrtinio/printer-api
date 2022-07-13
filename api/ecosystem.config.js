module.exports = {
  apps : [{
    name: 'op-id',
    script: 'dist/bundle.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      MONGO_ATLAS_SCHEME: 'mongodb',
      MONGO_ATLAS_HOST: 'localhost:27017,localhost:27018,localhost:27019',
      MONGO_ATLAS_USER: '',
      MONGO_ATLAS_PW: '',
      JWT_KEY: 'secret_this_should_be_longer',
      PORT: '80',
    },
    env_home: {
      NODE_ENV: 'home',
      MONGO_ATLAS_SCHEME: 'mongodb',
      MONGO_ATLAS_HOST: 'localhost:27017/opiddb',
      MONGO_ATLAS_USER: '',
      MONGO_ATLAS_PW: '',
      JWT_KEY: 'secret_this_should_be_longer',
      PORT: '80',
    },
    env_production: {
      NODE_ENV: 'production',
      MONGO_ATLAS_SCHEME: 'mongodb',
      MONGO_ATLAS_HOST: 'localhost:27017,localhost:27018,localhost:27019',
      MONGO_ATLAS_USER: '',
      MONGO_ATLAS_PW: '',
      JWT_KEY: 'secret_this_should_be_longer',
      PORT: '80',
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
