# mongodb, Loopback api backend and REACT frontend sample app

- First section is just to remember how to startup an empty project with docker
- 
- Last part are side notes

## Run a disposable container to startup a project
To make an empty project, like the first commit you can start without installing nothing more than docker in your system.  

Here is another approach, with an clean node image too, but with an entrypoint to startup  
https://github.com/lopezator/hello-docker-react.git

But with the following way you can run a disposable container, and then run custom commands and persist the files and folder wanted.  
For example there are cases you need to pass an answer to a promt (loopback api is a case), well, you can't do it with an entrypoint. So, let's do this way:

### REACT APP FRONTEND
> we set port 3500 to frontend and 3000 to backend
```
docker run -it --rm -v $(pwd):/home -w /home -p 3000:3500 node:alpine /bin/sh
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
> look at localhost:3500

-------------------------------------------
### LOOPBACK BACKEND API
```
docker run -it --rm -v $(pwd):/home -w /home -p 3000:3000 node:alpine /bin/sh
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

> look at localhost:3000


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

