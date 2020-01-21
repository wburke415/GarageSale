#! /bin/sh
set -eu


export TAG=${CI_COMMIT_TAG:-}

if [ "$#" -ne 1 ]; then
  if [[ -z "${CI_COMMIT_TAG}" ]] ; then
    # Fails if production image is being created and the tag isn't what is building it
    echo "ERROR: There is no tag associated to last commit for building prod"
    exit 1
  fi

  export REGISTRY_CONTAINER_IMG=$CI_REGISTRY_IMAGE
  export DOCKERFILE=Dockerfile
  # Add version that sl_application will read from for /version page
  echo "production: ${CI_COMMIT_TAG}" >> config/version.yml
else
  if [[ -z "${TAG}" ]] ; then
    export TAG=`git describe --tags`
  fi
  export REGISTRY_CONTAINER_IMG=$CI_REGISTRY_IMAGE/$1
  export DOCKERFILE=Dockerfile-$1
fi

echo "Building image for $REGISTRY_CONTAINER_IMG:$TAG"

export CACHE_TAG=$TAG
if ! docker pull $REGISTRY_CONTAINER_IMG:$TAG ; then
  echo "No previous container image for $REGISTRY_CONTAINER_IMG:$TAG"
  export CACHE_TAG=latest
  if ! docker pull $REGISTRY_CONTAINER_IMG:latest ; then
    echo "No previous container image for $REGISTRY_CONTAINER_IMG:latest"
    export CACHE_TAG=""
  fi
fi

if [[ -z "${CACHE_TAG}" ]] ; then
  echo "Building container from scratch"
  docker build\
    --tag $REGISTRY_CONTAINER_IMG:$TAG\
    --tag $REGISTRY_CONTAINER_IMG:latest\
    -f $DOCKERFILE\
    .
else
  echo "Building container with cache from $REGISTRY_CONTAINER_IMG:$CACHE_TAG"
  docker build\
    --cache-from $REGISTRY_CONTAINER_IMG:$CACHE_TAG\
    --tag $REGISTRY_CONTAINER_IMG:$TAG\
    --tag $REGISTRY_CONTAINER_IMG:latest\
    -f $DOCKERFILE\
    .
fi

docker push $REGISTRY_CONTAINER_IMG:$TAG
docker push $REGISTRY_CONTAINER_IMG:latest
