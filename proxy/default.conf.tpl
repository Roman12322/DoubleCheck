server {
    listen ${LISTEN_PORT};

    location /static {
        alias /doublecheck/static;
    }

    location /media {
        alias /doublecheck/media;
    }

    location / {
        proxy_pass http://${APP_HOST}:${APP_PORT};
        include    /etc/nginx/proxy_params;
    }
}