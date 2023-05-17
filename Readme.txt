## AI Chat App

This is an AI-powered chat application that uses OpenAI's GPT-4 language model for generating chat responses. It has a front-end designed to be used anywhere through the internet.

### Prerequisites

You should have the following installed:
- [Python](https://www.python.org/) (Version 3.6 or later)
- [pip](https://pip.pypa.io/en/stable/installing/) (Python Package Installer)
- [Node.js](https://nodejs.org/) and npm (Node Package Manager)
- [Ngrok](https://ngrok.com/)

### Installation

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/ai-chat-app.git
   ```
   Replace `yourusername` with your actual GitHub username.

2. **Install Python Dependencies**
   Navigate into the project directory and install the required Python dependencies:
   ```
   cd ai-chat-app
   pip install -r requirements.txt
   ```

3. **Install Node.js Dependencies**
   Navigate into the frontend directory and install the required Node.js dependencies:
   ```
   cd client
   npm install
   ```

4. **Set up Ngrok**
   
   To use Ngrok, you need to sign up for a free account on [ngrok.com](https://ngrok.com/). Once you've created an account, you'll be provided with an authtoken. Replace `<your_auth_token>` in the `ngrok.yml` file with your actual ngrok auth token. 

   The `ngrok.yml` file should be placed in the home directory of your machine. On Unix systems, this is `$HOME/.ngrok2/ngrok.yml`, and on Windows, it's `C:\Users\<you>\.ngrok2\ngrok.yml`.

### Running the Application

There are two main ways to run this application. One is to run it locally, and the other is to expose the application to the internet using Ngrok.

#### Running Locally

1. **Start the Backend Server**

   Open a terminal, navigate to the project directory, and run the Python server:
   ```
   cd ai-chat-app
   python server.py
   ```
   This will start the backend server on `localhost:5000`.

2. **Start the Frontend Server**

   ```
   cd ai-chat-app/client
   npm start
   ```
   This will start the frontend server on `localhost:3000`.

Now, you can access the AI Chat App on your local machine by navigating to `localhost:3000` in your web browser.

#### Running with Ngrok

1. **Start Ngrok Tunnels**

   Before starting Ngrok, ensure your `ngrok.yml` configuration file has the following content:
   ```
   authtoken: <your_auth_token>
   tunnels:
     backend:
       addr: 5000
       proto: http
     client:
       addr: 3000
       proto: http
   ```
   Replace `<your_auth_token>` with your actual ngrok auth token. 

   Open a terminal and start ngrok:
   ```
   ngrok start --all
   ```
   This will start ngrok tunnels for both the backend and frontend servers. Ngrok will provide you with HTTPS URLs for both services. 

2. **Update the Frontend Proxy**

   Once Ngrok is running, copy the HTTPS URL provided for the backend tunnel. Update the `"proxy"` line in the app.js` file in the client directory with this URL. It should look something like this:
   ```
   "app.use('/api/chat', createProxyMiddleware({ target: 'Ngrok backend link', changeOrigin: true }));"
   ```
   Replace `Ngrok backend link` with your actual backend tunnel ID.

3. **Start the Backend Server**

   Open a new terminal, navigate to the project directory, and run the Python server:
   ```
   cd ai-chat-app
   python server.py
   ```
   This will start the backend server on `localhost:5000`.

4. **Start the Frontend Server**

   Open another terminal, navigate to the client directory, and start the Node.js server:
   ```
   cd ai-chat-app/frontend
   npm start
   ```
   This will start the frontend server on `localhost:3000`.

Now, the AI Chat App is accessible from anywhere through the ngrok-provided frontend URL. Enjoy chatting with the AI!

### Troubleshooting

1. If you're using the free tier of ngrok, remember it only allows one online ngrok process at a time. To run multiple tunnels simultaneously, you'll need to upgrade to a paid ngrok plan.

2. If you encounter any errors related to packages, try reinstalling the dependencies as mentioned in the Installation section.

3. If the application isn't accessible over the internet, ensure that your local servers and ngrok tunnels are running properly. If you've followed all the steps correctly and the problem persists, it might be a network issue.

### License

This project is licensed under the MIT License. For more information, see the [LICENSE](LICENSE) file.
