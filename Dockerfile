FROM ubuntu:22.04

RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash
RUN apt-get install -y nodejs tree wkhtmltopdf
# Put in fonts here

WORKDIR /app
COPY . .
COPY ./scripts/ .
RUN npm install -g npm@latest yarn@latest
RUN yarn install
RUN yarn build

EXPOSE 3000
ENTRYPOINT [ "./run.sh" ]
