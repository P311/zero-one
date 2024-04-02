build: 
	npm install
	npm run build

format:
	npx prettier . --write

check_format:
	npx prettier . --check