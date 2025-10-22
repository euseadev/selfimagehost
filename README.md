# Self Image Host

A simple self-hosted image upload service that allows you to upload images and get shareable links.

## Discord Embed Preview

When shared on Discord, your images will appear with a nice embed like this:

![Discord Embed Example](https://img.eusea.dev/view/8c6cfd5b.png)

## Features

- Upload images via a simple API endpoint
- Get a shareable link for each uploaded image
- Automatic metadata for better sharing on social media platforms
- Direct image viewing with proper metadata

## Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```

## Usage

### Upload an image

Send a POST request to `/upload` with a file in the form data with the key "file".

Example using curl:
```
curl -F "file=@/path/to/your/image.jpg" http://localhost:4000/upload
```

The server will respond with a URL that can be used to view the image.

### View an image

Access the provided URL to view the image with proper metadata for sharing on social media.

## Configuration

You can modify the following variables in `server.js`:
- `url`: The base URL for your image host (default: https://img.eusea.dev)
- `port`: The port on which the server runs (default: 4000)

## License

ISC

## Author

eusea.dev