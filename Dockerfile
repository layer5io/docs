###############
# Build Stage #
###############
FROM jakejarvis/hugo-extended:latest as builder
# Base URL
ARG HUGO_BASEURL=
ENV HUGO_BASEURL=${HUGO_BASEURL}
# Build site
COPY . /src
RUN set -e && hugo --minify --gc --enableGitInfo

###############
# Final Stage #
###############
FROM jakejarvis/hugo-extended:latest as final
COPY --from=builder /src/public /site
