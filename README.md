# Microservices case study with cote.js

This project aims to show a microservices architecture built with [cote.js](https://github.com/dashersw/cote), an auto-discovery mesh network framework for building fault-tolerant and scalable applications.

## Installation

Run the following commands:

```
git clone git@github.com:dashersw/cote-workshop.git
cd cote-workshop
npm install
node init-db.js
```

## Getting the system up and running

There are four backend services, an admin interface and a end-user interface.

Run the admin interface:

```
node admin/server
```

Admin interface will be available in http://localhost:5000

Run the end user interface:

```
node end-user/server
```

End user interface will be available in http://localhost:5001

Now run the services in separate terminal windows (or tabs)

```
node services/payment-service
node services/product-service
node services/purchase-service
node services/user-service
```

Navigate to the admin interface, add a few products, and then navigate to the end user interface and buy them.

All in real-time!
