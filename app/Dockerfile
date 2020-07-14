FROM node:alpine as base

ARG TUSK_VERSION=v0.5.1

ENV PROJECT_DIR=/app

# 1. Solves `lscpu not found error with parcel`
#    https://github.com/parcel-bundler/parcel/issues/2555#issuecomment-457162656
WORKDIR /app
RUN apk --update --no-cache add \
     curl \
     # 1. \/
     util-linux \
    && curl -sL https://git.io/tusk | sh -s -- -b /usr/local/bin $TUSK_VERSION


#
#
#
FROM base as install

COPY ./package.json \
     ./package-lock.json \
     ./

# parce@next requirements
# RUN apk --no-cache --update add \
#     python2 \
#     make \
#     gcc \
#     g++ \
#     fts-dev

RUN npm install

ENV ENTRYPOINT_TASKS_DIR=/entrypoint.d/

COPY ./entrypoint.sh /entrypoint.sh
COPY ./entrypoint.d/* /entrypoint.d/
RUN chmod +x /entrypoint.sh
RUN chmod +x /entrypoint.d/*

ENTRYPOINT [ "/entrypoint.sh" ]

#
#
#
FROM install as prod

COPY ./src ./src
COPY ./tools ./tools

CMD ["npm", "run", "prod"]
