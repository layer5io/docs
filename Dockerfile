# Use the base Hugo image
FROM klakegg/hugo:ext-alpine

# Set the working directory
WORKDIR /src

# Install Git (if not already installed)
RUN apk --no-cache add git

# Initialize a new Hugo site if it doesn't exist (optional)
# You can skip this step if you already have a Hugo site in your project directory
RUN hugo new site .

# Expose the port for the Hugo server (if necessary)
EXPOSE 1313

# Start the Hugo server
CMD ["hugo", "server", "--bind", "0.0.0.0"]
