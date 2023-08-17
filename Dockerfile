FROM nginx:alpine

# Install necessary package and create a non-root user
RUN apk add --no-cache libx11=1.8.4-r1 && \
    adduser -D -u 1001 konfig

# Change ownership and permissions for directories
RUN chown -R konfig:konfig /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html && \
    chmod -R g+rwx /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html

# Change ownership and permissions for nginx configuration
RUN chown konfig:konfig /etc/nginx/conf.d/default.conf && \
    chmod g+r /etc/nginx/conf.d/default.conf

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
