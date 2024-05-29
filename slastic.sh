# https://stackoverflow.com/questions/51445846/elasticsearch-max-virtual-memory-areas-vm-max-map-count-65530-is-too-low-inc/68253775
docker pull elasticsearch:8.7.0
docker pull kibana:8.7.0
# docker pull grafana/grafana

# docker run --name grafana --net elastic-network -p 3000:3000 -d grafana/grafana
docker run --name kibana --network=host -p 5601:5601 -e xpack.security.enabled=false -e discovery.type=single-node -d kibana:8.7.0

# Elastic esta en la red local de docker, hay que inspecionar la red para saber la IP de elastic

docker run --name elastic --network=host -p 9200:9200 -e discovery.type=single-node -e ES_JAVA_OPTS="-Xms1g -Xmx1g" -e xpack.security.enabled=false -d elasticsearch:8.7.0



# Checar elastic 
# http://localhost:9200/