frontend-build:
	yarn build

frontend-push:
	scp -rp build/* ec2:~/tool-belt/build
# with sudo cp -r tool-belt/build/* /var/www/tool-belt/html/

deploy:
	npm install && cp -r build/* ~/tool-belt.mamath.fr/

codegen-api:
	npx orval --config ./orval.config.js
