# Dockerfile for html-to-pdf

FROM amazonlinux

RUN yum -y install shadow-utils \
tar \
gzip

RUN /usr/sbin/groupadd node
RUN /usr/sbin/useradd node -g node

RUN chgrp -R node /opt
RUN chmod 775 /opt
USER node:node

WORKDIR /opt

RUN curl -O https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm
USER root:node
RUN yum -y localinstall google-chrome-stable_current_x86_64.rpm
USER node:node
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
RUN . ~/.nvm/nvm.sh && nvm install 12


WORKDIR html-to-pdf

COPY --chown=node:node *.js ./
COPY --chown=node:node *.json ./
COPY --chown=node:node node_modules ./node_modules
COPY --chown=node:node runit.sh ./

EXPOSE 8080

USER node
ENTRYPOINT ./runit.sh
