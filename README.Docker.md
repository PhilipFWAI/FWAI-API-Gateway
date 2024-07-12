# BUILD DOCKER IMAGE

When you're ready, start your application by running:
- Run this command to start docker ```docker-compose up --build```. This is in case you used Dockerfile.xxx file instead of Dockerfile.
- Access Your application and will be available at http://localhost:3000.

- Run this command to start docker ```docker build -t api-gateway .``` and ```docker run -p 3000:3000 api-gateway```. This is in case you used Dockerfile file instead of Dockerfile.xxx.
- Access Your application and will be available at http://localhost:3000.

- Run this command to list running images ``` docker ps```.
- Run this command to list container configurations ```docker inspect CONTAINER ID```.

- Reference: https://imel.co.za/boosting-availability-and-performance-how-to-load-balance-a-node-api-gateway-with-docker/