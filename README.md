<p align="center">
  <img src="https://github.com/kanhaiyadav/KisaanSetu/blob/main/client/public/icon.png?raw=true" alt="Invictus Logo" width="200">
</p>

# KisaanSetu

KisaanSetu is an online platform that connects farmers directly with consumers, enabling them to buy fresh produce without intermediaries. The platform allows farmers to list their products, set prices, and manage orders, while consumers can browse, order, and learn about sustainable agriculture practices.  
Production Deploy: [https://kisaansetu.kanhaiya.me](https://kisaansetu.kanhaiya.me)     
Video Preview: [https://youtu.be/VdaOQMOajNc?si=f58zDN_X4GyYSynF](https://youtu.be/VdaOQMOajNc?si=f58zDN_X4GyYSynF)   
**Note**: We couldn't deploy our model for free on any platform, in doing so it was just running out of memory of the free tier of any hosting platform. So the image classification part will not be working in the the given production link, so you won't be able to add any product to inventory. You might just run the classifier server locally that can resolve the issue, since the website is making request to the local server only for classification.

## Features

- **Easy Product Listing**: Farmers can easily add their products with detailed descriptions and prices.
- **Inventory Management**: Farmers can seemlessly add, edit and delete their products.
- **Order Management**: Farmers can manage their incoming orders and update product availability.
- **Consumer Transparency**: Consumers can learn about the origin, quality, and freshness of the products.
- **Educational Content**: Consumers can explore educational resources on sustainable agriculture and local farming.
- **Product Reviews**: Consumers can rate products, providing valuable feedback to the farmers.

## Tech Stack

- **Frontend**: React, Redux, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have [Node.js](https://nodejs.org/) and npm (Node Package Manager) installed on your machine. You can check if they're installed by running:

  ```bash
  node -v
  npm -v

If not installed, follow the [Node.js installation guide](https://nodejs.org/en/download/).

- You have [MongoDBCompass](https://www.mongodb.com/) installed and running on your local machine. For setup, refer to the official [MongoDB installation guide](https://docs.mongodb.com/manual/installation/).

Make sure your MongoDB server is running on the default port (`mongodb://localhost:27017`) or adjust the connection settings in the project configuration if using a custom setup.


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kanhaiyadav/KisaanSetu.git
2. Navigate to the project directory:
   ```bash
   cd kisaan-setu
3. Navigate to client directory:
   ```bash
   cd client
5. Install dependencies:
   ```bash
   npm install
6. 3. **Configure environment variables**  
   Create a `.env` file in the root of `server` directory and set up the following variables:
   ```env
   # Aws credentials
   BUCKET_REGION=
   BUCKET_NAME=
   ACCESS_KEY=
   SECRET_ACCESS_KEY=

   # MongoDb uri
   MONGODB_URI=
   ```
   Create a `.env` file in the root of `client` directory and set up the following variables:
   ```env
   VITE_BACKEND_URL=http://localhost:3000
   ```
7. Navigate to classifier directory
   ```bash
   cd classifier
   ```
8. Create a Virtual Environment
   Run the following command:
   ```sh
   python -m venv venv
   ```
    This will create a virtual environment named `venv`.

9. Activate the Virtual Environment
    #### **On Windows (Command Prompt)**
    ```sh
    venv\Scripts\activate
    ```
    If using **PowerShell**, run:
    ```sh
    venv\Scripts\Activate.ps1
    ```

    #### **On macOS/Linux (Terminal)**
    ```sh
    source venv/bin/activate
    ```

10. Install Dependencies
    Once the virtual environment is activated, install required dependencies:
    ```sh
    pip install -r requirements.txt
    ```
11. Start the classifier model server
    ```bash
    python app.py
    ```

12. Start the client(frontend) server:
    ```bash
    npm run dev
    ```
13. Navigate to server(backend) directory:
    ```bash
    cd client
    ```
14. Install dependencies:
    ```bash
    npm install
    ```
15. Start the backend server:
    ```bash
    npm run dev
    ```

## Usage
- For Farmers: Sign up, create your profile, and list your produce. Manage your orders from the sales page.
- For Consumers: Browse the available products, place orders on phone or chat, and leave reviews after your purchase

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


