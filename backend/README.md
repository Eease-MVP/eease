# Backend

## Description

This is a backend project built with Spring Boot and Kotlin. The project features user authentication and authorization using JWT, data persistence with JPA, and web functionalities with Spring Web.

### Key Features:

- User Authentication and Authorization with JWT
- Data Persistence using JPA
- Web functionalities with Spring Web

## Prerequisites

Ensure you have the following installed on your system:

- JDK 17 or higher
- Gradle 6.0 or higher (Optional, if using the Gradle wrapper)

## Getting Started

### Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/Eease-MVP/eease
```

### Navigate to the Project Directory

Change into the project directory:

```bash
cd your-repo
```

### Build the Project

Use Gradle to build the project. If you have Gradle installed, you can use:

```bash
gradle build
```

Or, use the provided Gradle wrapper:

```bash
./gradlew build
```

### Run the Application

To run the application, use the Gradle `bootRun` task. This can be done with:

```bash
./gradlew bootRun
```

### Access the Application

By default, the application will be accessible at `http://localhost:8080`.

## Project Structure

Here's an overview of the project structure:

```
backend/
├── build.gradle.kts                # Gradle build script in Kotlin
├── settings.gradle.kts             # Gradle settings script
├── gradlew                         # Unix shell script for Gradle wrapper
├── gradlew.bat                     # Windows batch script for Gradle wrapper
├── src/
│   ├── main/
│   │   ├── kotlin/
│   │   │   └── eease/
│   │   │       └── backend/
│   │   │           ├── BackendApplication.kt         # Main Spring Boot application
│   │   │           ├── controller/                   # REST Controllers
│   │   │           ├── model/                        # Data Models
│   │   │           ├── security/                     # Security configurations and JWT
│   │   │           └── service/                      # Service layer
│   │   └── resources/
│   │       └── application.properties                # Application configuration
│   └── test/
│       └── kotlin/
│           └── eease/
│               └── backend/
│                   └── BackendApplicationTests.kt    # Test class
├── .gitignore                                         # Git ignore file
└── README.md                                          # Project documentation
```

## Configuration

The main configuration file is located at `src/main/resources/application.properties`. Adjust any settings there as needed.

# Backend Setup

## Environment Variables

The following environment variables are required:

JWT_SECRET_KEY=your_secure_jwt_key

JWT_EXPIRATION=2592000000 # 30 days in milliseconds

H2_PASSWORD=your_secure_password
