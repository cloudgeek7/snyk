FROM node:19.7-bullseye-slim

COPY ./smoke/ /snyk/smoke/
COPY ./fixtures/ /snyk/fixtures/

RUN apt-get update && apt-get install -y curl jq
RUN /snyk/smoke/install-shellspec.sh --yes
ENV PATH="/root/.local/bin:${PATH}"

WORKDIR /snyk/smoke/

ENTRYPOINT [ "./docker-root/entrypoint.sh" ]
