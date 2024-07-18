#### Instructions to Set IP Address for Metro Expo Go:

To ensure the application connects to the backend correctly when using Metro Expo Go, follow these steps to determine and set your IP address:

1. **Determine Your IP Address:**
   - When connected with **Expo Go** app, the correct IP address is shown in the bundler terminal window.
   - On **Windows**: Open Command Prompt and type `ipconfig`. Look for the `IPv4 Address` under the network you are connected to.
   - On **macOS/Linux**: Open Terminal and type `ifconfig`. Look for the `inet` address under the network interface you are using.

3. **Update Configuration:**
   - Open the `user-api.ts` file located in the `Eease/store` directory.
   - Replace the hardcoded IP address in the `BASE_URL` variable with your determined IP address:
     ```typescript
     const BASE_URL = 'http://your_ip_address:8080/api';
     ```

#### Backend Setup Instructions

To set up the backend server, follow these steps (from the backend README):

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Eease-MVP/eease
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd eease/backend
   ```

3. **Build the Project:**
   ```bash
   ./gradlew build
   ```

4. **Run the Application:**
   ```bash
   ./gradlew bootRun
   ```

5. **Access the Application:**
   By default, the application will be accessible at `http://localhost:8080`.

6. **Configuration:**
   The main configuration file is located at `src/main/resources/application.properties`. Adjust any settings there as needed.
   
#### Notes:

- Ensure that the backend server is running and properly configured before testing the frontend application.
- Verify that any required environment variables or configuration settings are correctly set up in the application.
