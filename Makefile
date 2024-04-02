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
	ng test --watch=false