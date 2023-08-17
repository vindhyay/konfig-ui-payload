# # Stage-1 to Build the Application
# # base image
# FROM node:14-alpine AS builder-admin
# #Install Git and ssh tools
# RUN apk update && apk upgrade && \
#     apk add --no-cache bash git openssh
# # Working directory
# WORKDIR /app

# #Copy the required package.json and lib directory
# COPY . /app
# #COPY lib /app/lib

# #Remove the Package-lock.json file
# #RUN rm -rf /app/package-lock.json

# #Install all the required dependencies in the container and Compile Prod build
# RUN npm install && npm install @angular/cli@13.1.2 && npm install typescript@4.5.4 && \
#     node --max_old_space_size=12288
# RUN npm run build    
# #RUN npm install @angular/cli@8.3.19
# #RUN npm install -g typescript@3.5.3

FROM nginx:alpine

# Install necessary package and create a non-root user
RUN apk add --no-cache libx11=1.8.4-r1 && \
    adduser -D -u 1001 konfig

# Change ownership and permissions
RUN chown -R konfig:konfig /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html && \
    chmod -R g+rwx /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html

# Copy the nginx configuration file
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Add all the artifacts from the builder image
COPY ./dist/finlevit-payload/ /usr/share/nginx/html

# Expose the Application on specified port
EXPOSE 8081

# Change the user for nginx processes to non-root user
RUN sed -i.bak 's/^user.*/user konfig;/' /etc/nginx/nginx.conf

# Switch to the non-root user
USER konfig

CMD ["nginx", "-g", "daemon off;"]
