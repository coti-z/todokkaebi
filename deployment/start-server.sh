echo "--------------- start deployment server ---------------"
docker stop todogebi-server || true
docker rm todogebi-server || true
docker pull 992382665657.dkr.ecr.ap-northeast-2.amazonaws.com/todogebi-server:latest
docker run -d \
  --name todogebi-server \
  --network app-network \
  -p 5000:5000 \
  992382665657.dkr.ecr.ap-northeast-2.amazonaws.com/todogebi-server:latest
docker image prune -f
echo "--------------- complete deployment server ---------------"



