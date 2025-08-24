FROM mcr.microsoft.com/playwright:v1.55.0-jammy

ARG USER=pwuser
ARG NODE_ARCHIVE=node-v20.19.4-linux-x64.tgz
ARG YARN_ARCHIVE=yarn-corepack-v4.9.3.tgz

# Remove pre-installed Node.js and Yarn
RUN npm uninstall -g yarn && \
    apt-get remove -y nodejs

# Switch to non-root user
USER ${USER}
ENV HOME=/home/${USER}

# Copy and configure Node.js
COPY --chown=${USER}:${USER} ${NODE_ARCHIVE} /tmp
RUN mkdir -p $HOME/.node && \
    tar -xzf /tmp/${NODE_ARCHIVE} -C $HOME/.node --strip-components=1 && \
    rm -rf /tmp/${NODE_ARCHIVE}
ENV PATH=$HOME/.node/bin:$PATH

# Install and configure Yarn via Corepack
COPY --chown=${USER}:${USER} ${YARN_ARCHIVE} /tmp
ENV COREPACK_ENABLE_NETWORK=0
RUN corepack install -g --cache-only /tmp/${YARN_ARCHIVE} && \
    corepack prepare yarn@$(ls ~/.cache/node/corepack/v1/yarn) --activate && \
    corepack enable && \
    rm -rf /tmp/${YARN_ARCHIVE} /tmp/v8-compile-cache-1000