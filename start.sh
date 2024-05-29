#!/bin/bash
# Inicia tu aplicación de Node.js
npm run dev  &

mv logstash.config logstash-8.13.4/

# Inicia Logstash
logstash-8.13.4/bin/logstash -f logstash.config