# E-Commerce Backend
![MIT License](https://img.shields.io/badge/License-MIT-brightgreen)

## Description
The back end for an E-Commerce site. Configured using an Express.js API that uses Sequelize to interact with a MySQL database.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [License](#license)
* [Questions](#questions)

## Installation
Navigate to the directory, set up the database by running schema.sql and seed.sql located in the 'db' directory. 

Run `source db/schema.sql` in MySql CLI to set up the database.

Create a `.env` file with environment variables to match your MySQL credentials:

    DB_NAME="ecommerce_db"
    DB_USER="{your-username}"
    DB_PASSWORD="{your-password}"

In command line and run:

    node install
    npm run seed
    node server.js


## Usage
After running the server you can interract with the REST API (through an application like Insomnia) with the following end-points:

### <b>Products -</b>
|Type|Route|Description|
|---|---|---|
| GET | /api/products | returns a list of all products. |
| GET | /api/products/{id} | returns a specific product with the id of {id} |
| POST | /api/products | creates and adds a product |
| DELETE | /api/products/{id} | deletes the product of {id} |
| PUT | /api/products/{id} | update the product of {id} |

### <b>Tags -</b>
|Type|Route|Description|
|---|---|---|
| GET | /api/tags | returns a list of all tags. |
| GET | /api/tags/{id} | returns a specific tag with the id of {id} |
| POST | /api/tags | creates and adds a tag |
| DELETE | /api/tags/{id} | deletes the tag of {id} |
| PUT | /api/tags/{id} | update the tag of {id} |

### <b>Categories -</b>
|Type|Route|Description|
|---|---|---|
| GET | /api/categories | returns a list of all categories. |
| GET | /api/categories/{id} | returns a specific category with the id of {id} |
| POST | /api/categories | creates and adds a category |
| DELETE | /api/categories/{id} | deletes the category of {id} |
| PUT | /api/categories/{id} | update the category of {id} |

[![Watch the video](/assets/screenshot.PNG)](###)

## Contributing
Contributions are welcome, contact info is below.

## License
The E-Commerce Backend project is under the [MIT License](http://choosealicense.com/licenses/mit/). See the link for more details.

## Questions
GitHub: [vicdotexe](https://www.github.com/vicdotexe)

E-mail: [vicdotexe@gmail.com](mailto:vicdotexe@gmail.com)
