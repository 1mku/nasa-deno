# NASA Mission Control Deno Project

## Local Development

```
deno task dev
```

## How to build a docker image and push to Docker Hub

```
docker build -t repo-name/nasa-deno:tag --platform linux/amd64 .
```

```
docker push repo-name/nasa-deno:tag
```

### Deploying to Amazon EC2

1. Update packages: `sudo yum update -y`
2. Install Docker: `sudo yum install docker`
3. Start a docker service: `sudo service docker start`

   To run docker without sudo command, add ec2-user to the docker permission
   group:

   ```
   sudo usermod -a -G docker ec2-user
   ```
   Restart the SSH connection.

4. Login to the Docker Hub: `docker login...`
5. Run a docker image:

   ```
   docker run --restart=always -p 80:8000 repo-name/nasa-deno:tag
   ```
