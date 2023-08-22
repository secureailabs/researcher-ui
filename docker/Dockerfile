FROM ubuntu:20.04

ENV TZ=America/Toronto
LABEL authors="aman@arrayinsights.com"
USER root

# Set time zone data
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update && \
  apt-get -y upgrade && \
  apt-get install -y curl

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
  apt-get install -y nodejs

RUN npm install -g yarn

WORKDIR /app
COPY ./ /app

RUN yarn install --production --frozen-lockfile
RUN yarn add eslint-config-prettier --dev
RUN yarn global add serve

COPY docker/Entrypoint.sh /Entrypoint.sh
RUN chmod +x /Entrypoint.sh

ENTRYPOINT [ "/Entrypoint.sh" ]