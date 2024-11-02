# Scrimba GPT-4 Vision App

A web application that integrates with OpenAI's GPT-4 Vision API to analyze images. Users can select an image, enter a descriptive query, and receive a detailed analysis based on both the image and text input. This project is built with Nuxt and leverages OpenAI's API for image and text-based AI interactions.

## Features

-   **Image Analysis**: Uses OpenAI's GPT-4 Vision API to analyze images based on a user-provided query.
-   **Markdown Support**: The analysis result is formatted using Markdown, allowing for a more structured and readable output.
-   **Dynamic Image Selection**: Users can select different images from a dropdown list for analysis.
-   **Nuxt 3 Integration**: Built with Nuxt 3, providing a fast and modular development experience.

## Getting Started

### Prerequisites

-   **Node.js**: Make sure you have Node.js installed (version 14 or higher recommended).
-   **OpenAI API Key**: Obtain an API key from OpenAI to use the GPT-4 Vision model.

### Installation

1.  **Clone the Repository**:

    ```bash
    git clone https://github.com/Imaginario27/scrimba-gpt-4-vision.git
    cd scrimba-gpt-4-vision
    ```

2.  **Install Dependencies**:

    ```bash
    npm install
    ```

3.  **Configure Environment Variables**: Create a `.env` file in the root directory and add your OpenAI API key:

    ```bash
    OPENAI_API_KEY=your_openai_api_key
    ```

### Usage

1.  **Run the Development Server**:

    ```bash
    npm run dev
    ```

    This will start the Nuxt 3 development server. Open http://localhost:3000 to view the app in your browser.

2.  **Selecting an Image and Query**:

    -   Select an example image from the dropdown list.
    -   Enter a descriptive query in the text area describing what you want the model to analyze about the image.
    -   Click the "Analyze" button to submit the request.
3.  **Viewing the Result**: The analysis result will be displayed below, formatted with Markdown for readability.

## Project Structure

-   **`/public/images`**: Contains the example images available for analysis.
-   **`/pages`**: Nuxt page components.
-   **`/api`**: Serverless functions, including the API endpoint to interact with OpenAI's GPT-4 Vision model.
-   **`/components`**: Vue components used in the app.

## API Reference

### `/api/bot` Endpoint

-   **Method**: `POST`
-   **Request Body**:
    -   `query` (string): The descriptive query for the analysis.
    -   `image` (string): The filename of the selected image.
-   **Response**:
    -   `output` (string): The formatted analysis result from OpenAI.

## Technologies Used

-   **Nuxt 3**: The framework for building the frontend.
-   **OpenAI API**: Used for GPT-4 Vision model capabilities.
-   **marked**: A Markdown parser for rendering results with Markdown formatting.
-   **Tailwind CSS**: For styling the application.

## Deployment

1.  **Build for Production**:

    ```bash
    npm run build
    ```

2.  **Start the Production Server**:

    ```bash
    npm run start
    ```

## Credits

Special thanks to Scrimba AI Career Path for the inspiration and resources that made this project possible.