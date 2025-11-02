FROM mcr.microsoft.com/playwright:v1.55.0-jammy

ARG NODEJS_ARCHIVE=node-v22.20.0-linux-x64.tgz
ARG YARN_ARCHIVE=yarn-corepack-v4.9.3.tgz
ARG OMZ_ARCHIVE=oh-my-zsh-763aab32.tgz

# Upgrade system packages and remove pre-installed Node.js and Yarn
RUN npm uninstall -g yarn && \
    apt-get update && \
    apt-get remove -y nodejs && \
    apt-get install -y --no-install-recommends git git-lfs vim zsh && \
    rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/*

# Unzip and configure Oh My Zsh  

COPY ${OMZ_ARCHIVE} /tmp

ENV ZSH=/oh-my-zsh
ENV ZSH_CUSTOM=${ZSH}/.custom
ENV GITSTATUS_CACHE_DIR=${ZSH}/.gitstatus-cache

RUN mkdir -p ${ZSH} && \
    tar -xzf /tmp/${OMZ_ARCHIVE} -C ${ZSH} --strip-components=1 && \
    rm -rf /tmp/${OMZ_ARCHIVE}

# Copy and configure Node.js with Corepack and Yarn

COPY ${NODEJS_ARCHIVE} /tmp
COPY ${YARN_ARCHIVE} /tmp

ENV NODEJS_PATH=/nodejs
ENV COREPACK_HOME=${NODEJS_PATH}/.corepack-cache
ENV COREPACK_ENABLE_NETWORK=0
ENV PATH=${NODEJS_PATH}/bin:$PATH

RUN mkdir -p ${NODEJS_PATH} ${COREPACK_HOME} && \
    tar -xzf /tmp/${NODEJS_ARCHIVE} -C ${NODEJS_PATH} --strip-components=1 && \
    corepack install -g --cache-only /tmp/${YARN_ARCHIVE} && \
    corepack prepare yarn@$(ls ${COREPACK_HOME}/v1/yarn) --activate && \
    corepack enable && \
    chmod -R 755 ${NODEJS_PATH} && \
    rm -rf /tmp/${NODEJS_ARCHIVE} /tmp/${YARN_ARCHIVE}