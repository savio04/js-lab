#!/bin/bash
if [ -z "$1" ]; then
  echo "Error: Missing number of requests. Example: ./requests.sh 2"
  exit 1
fi

for ((i = 1; i <= $1; i++))
do
  curl -Z -H "Content-Type: application/json" -d "{ \"product_id\": 1, \"user_id\": $((i)) }" -X POST http://localhost:8080/purchases &
done

wait
