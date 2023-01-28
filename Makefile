frontend-build:
	yarn build

frontend-push:
	scp -rp build/* ec2:~/tool-belt/build
# with sudo cp -r tool-belt/build/* /var/www/tool-belt/html/

codegen-api:
	npx orval --config ./orval.config.js
