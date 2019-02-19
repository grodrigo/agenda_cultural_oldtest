# mongodb, Loopback api backend and REACT frontend sample app

## How to run it
Requirements:  
docker and docker-compose  

just clone the repo, and do:  
```
docker-compose up -d
```
There are some useful commands:
```
docker ps
docker exec -it {name_running_container} sh
docker run -it {name_image} sh
```

-------------------------------------------
## What will you find here
As introduction, this was my first approach with React and loopback, and many, really too many things more, so, apologies in advance.  
  
There are two incomplete branches:  
- Master. This one is without authentication, but using materialize ui. I was testing something diferent than the classic bootstrap, there are some things that I couldn't do better, there was more important things to do, but it looks nice and functional.  
  
- auth0 with auth0 authentication. Here I change to bootstrap, don't ask. Auth0 have great documentation, but it wasn't enought. In this branch is functional the authentication in the frontend and it looks like in the loopback backend too, but there are some issues with the authentication in loopback that I couldn't resolve related to give acl permissions to the model.  
  
- The dev branch was an intermediate test and it is really dispossable.  


## Run a disposable container to startup a project
To make an empty project, like the first commit you can start without installing nothing more than docker in your system.  

Run a disposable container, then run custom commands and persist the files and folder wanted.  
What's the porpouse? For example in some cases you need to pass an answer to a promt (loopback api is a case), well, you can't do it with an entrypoint. So, let's do this way:

### REACT APP FRONTEND
> we set port 3000 to frontend and 3001 to backend
```
docker run -it --rm -v $(pwd):/home -w /home -p 3000:3000 node:alpine /bin/sh
```
and then inside the container do:  
```
apk update && apk upgrade
yarn global add create-react-app
create-react-app front
chown node:node -R .
cd front
yarn start
```
> look at localhost:3000

-------------------------------------------
### LOOPBACK BACKEND API
```
docker run -it --rm -v $(pwd):/home -w /home -p 3000:3001 node:alpine /bin/sh
```

and then inside the container do:  
```
apk add --no-cache make g++ build-base linux-headers python
yarn global add loopback-cli  

## create the API, choose an application name and a folder
lb {app_name}

cd {folder_name}

# mongodb connector instead of db memory
yarn add loopback-connector-mongodb

# create a model
# Remember that you canâ€™t modify an existing model with the model generator, but you can customize the model by using the command-line tool with property generator, relation generator and ACL generator
lb model

# give edit/create permissions to host user
chown node:node -R .
yarn start
```

> look at localhost:3001

Here is another good approach, with a clean node image too, but with an entrypoint to startup  
https://github.com/lopezator/hello-docker-react.git

************
### side notes:
> npm way to install loopback (but give me some errors...)
```
npm install --silent --unsafe-perm -g loopback-cli
npm install loopback-connector-mongodb --save
```


> docker errors when deleting images, "dangling" images.

```
$ docker image rm d3ae3465db8d
Error response from daemon: conflict: unable to delete d3ae3465db8d (cannot be forced) - image has dependent child images

$ docker rmi $(sudo docker images --filter "dangling=true" -q --no-trunc)

--------------
# B plan, find child images:
$ docker inspect --format='{{.Id}} {{.Parent}}' $(docker images --filter since=d3ae3465db8d -q)

$ docker rmi {sub_image_id}
```

