# Mini APP
This is a Mini App (Nodejs & Reactjs)

## Installation

Import Mysql database

    import database from file "./movies.sql" into mysql server

Install the packages for nodejs (open terminal)

```bash
npm install
```

Change file .env.development to .env connect mysql

```bash
DB_MASTER_DIALECT=mysql
DB_MASTER_HOST=localhost
DB_MASTER_PORT=3306
DB_MASTER_DATABASE=movies
DB_MASTER_USERNAME=root
DB_MASTER_PASSWORD=
```

Run the program (open terminal)

```bash
npm run local
```

If you want override react themes, you go to folder (themes/movies/src). After run "`npm run build`" to update UI
## Use

Open browser and goto link (http://localhost:4000)

## Test Api

Open Postman and run test with host (http://localhost:4000/api/v1/)
* Login API http://localhost:4000/api/v1/login
    * Method: POST
    * Header:
        ```json
        {
          "Content-Type": "application/json"
        }
        ```
    * Body content
        ```json
        {
          "username": "admin@admin.com",
          "password": "123456"
        }
        ```
And test other Router
* http://localhost:4000/api/v1/login
* http://localhost:4000/api/v1/register
* http://localhost:4000/api/v1/shares
* http://localhost:4000/api/v1/share/add
## Unit Test
Run the program (open terminal)

```bash
npm run test
```