# Use floryn90/hugo:ext-alpine as the base image
FROM floryn90/hugo:ext-alpine

# Set the working directory to /src
WORKDIR /src

# Install Git and configure safe directory
RUN apk add --no-cache git && \
    git config --global --add safe.directory /src
