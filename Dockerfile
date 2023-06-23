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

#Stage-2 to Run the application in Nginx Container
FROM nginx:alpine

#Modify the permissions in the Nginx official Image to run it in the Openshift without any loopback errors
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html
#Modify the listening port to something else other than 80 as it supposed to be run by super user and to avoid any permission issues.
#RUN sed -i.bak 's/listen\(.*\)80;/listen 8081;/' /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

#Add all the artifacts from builder image
COPY ./dist/finlevit-admin/ /usr/share/nginx/html

#Expose the Application on specified port
EXPOSE 8081
RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

#Start the Application
CMD ["nginx", "-g", "daemon off;"]
#npm start

