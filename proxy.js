var proxy = require('redbird')({port: 80});

proxy.register("admin.cote.co", "http://localhost:5000");
proxy.register("end-user.cote.co", "http://localhost:5001");
proxy.register("monitoring.cote.co", "http://localhost:5555");
