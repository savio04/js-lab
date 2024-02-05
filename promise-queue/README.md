# Promise Queue
## 📘 Implementing a promise queue.

This application was made with the aim of showing how to solve a concurrency problem on a nodejs endpoint.

### Running the project

```bash
# Clone this repository
$ git clone <git@github.com:savio04/js-lab.git>

# Access the promise-queue folder
$ cd js-lab/promise-queue

# Install dependencies
$ npm install

# Run docker command to create the container with the database
# Optional if you have Postgres installed locally
$ sudo docker run -p 5432:5432 \
    --name db-pg \
    -e POSTGRES_PASSWORD=your_password \
    -e POSTGRES_USER=your_user \
    -d postgres

# Run the application
# After you have filled in the database credentials in the db.js file
$ node src/server.js
```
