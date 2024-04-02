install:
	npm ci

build: install
	rm -rf dist
	npm run build

format:
	npx prettier . --write
	npx eslint . --fix

check_format:
	npx prettier . --check
	npx eslint .

test: install
	ng test --watch=false