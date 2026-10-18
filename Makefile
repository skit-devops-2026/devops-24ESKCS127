# DevOps CSUL511 - E-Commerce Platform
# Pipeline targets for local and CI/CD execution

.PHONY: install test build run docker-build docker-up clean

install:
	npm install

test:
	npm test

build:
	npm run build

run:
	npm start

docker-build:
	docker build -t ghcr.io/skit-devops-2026/devops-24eskcs127:latest .

docker-up:
	docker compose up --build

clean:
	rm -rf dist node_modules
