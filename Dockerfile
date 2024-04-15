FROM razonyang/hugo:exts as builder

ARG HUGO_BASEURL=
ENV HUGO_BASEURL=${HUGO_BASEURL}

COPY . /src
RUN hugo --minify --gc --enableGitInfo

FROM razonyang/hugo:nginx
COPY --from=builder /src/public /site