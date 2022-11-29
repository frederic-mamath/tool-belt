frontend-build:
	yarn build

frontend-push:
	scp -i pokpok.pem -rp build/* ubuntu@35.181.156.153:~/tool-belt/build
# with sudo cp -r tool-belt/build/* /var/www/tool-belt/html/

codegen-api:
	orval --config ./orval.config.js
