install:
	npm install

build: install
	rm -rf dist
	npm run build

format: install
	npx prettier . --write
	npx eslint . --fix

check_format: install
	npx prettier . --check
	npx eslint .

test: install
	npm run test -- --watch=false

api: install
	openapi-generator-cli generate -i api/swagger.json -g typescript-angular -o api/api

